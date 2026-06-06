(() => {
  const CASSELL_EXTENSION_ROOT_ID = "cassell-extension-root"
  const CASSELL_TRANSLATE_API_URL = "https://cassell-translator.vercel.app/api/translate"
  const CASSELL_DEBOUNCE_MS = 500

  if (document.getElementById(CASSELL_EXTENSION_ROOT_ID)) {
    return
  }

  let debounceTimer = null
  let latestRequestId = 0
  let currentTranslation = ""
  let copyResetTimer = null

  const root = document.createElement("div")
  root.id = CASSELL_EXTENSION_ROOT_ID

  const panel = document.createElement("section")
  panel.className = "cassell-extension-panel"
  panel.hidden = true
  panel.setAttribute("aria-label", "Cassell Translator panel")

  const header = document.createElement("div")
  header.className = "cassell-extension-header"

  const title = document.createElement("div")
  title.textContent = "CASSELL TRANSLATOR"

  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.className = "cassell-extension-close"
  closeButton.setAttribute("aria-label", "关闭 Cassell Translator")
  closeButton.textContent = "×"

  header.append(title, closeButton)

  const body = document.createElement("div")
  body.className = "cassell-extension-body"

  const input = document.createElement("textarea")
  input.className = "cassell-extension-input"
  input.placeholder = "输入文本..."
  input.setAttribute("aria-label", "需要翻译的文本")

  const output = document.createElement("div")
  output.className = "cassell-extension-output cassell-extension-output-idle"
  output.textContent = "翻译结果将在此显示"

  const actions = document.createElement("div")
  actions.className = "cassell-extension-actions"

  const copyButton = document.createElement("button")
  copyButton.type = "button"
  copyButton.className = "cassell-extension-copy"
  copyButton.textContent = "复制译文"
  copyButton.hidden = true

  actions.append(copyButton)
  body.append(input, output, actions)
  panel.append(header, body)

  const launcher = document.createElement("button")
  launcher.type = "button"
  launcher.className = "cassell-extension-launcher"
  launcher.setAttribute("aria-label", "打开 Cassell Translator")
  launcher.textContent = "C"

  root.append(panel, launcher)

  function ensureMounted() {
    const target = document.body || document.documentElement

    if (root.parentNode !== target) {
      target.append(root)
    }
  }

  ensureMounted()

  const remountObserver = new MutationObserver(() => {
    if (!root.isConnected) {
      ensureMounted()
    }
  })

  remountObserver.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  function setIdle() {
    currentTranslation = ""
    output.className = "cassell-extension-output cassell-extension-output-idle"
    output.textContent = "翻译结果将在此显示"
    copyButton.hidden = true
  }

  function setLoading() {
    currentTranslation = ""
    output.className = "cassell-extension-output cassell-extension-output-idle"
    output.textContent = "翻译中..."
    copyButton.hidden = true
  }

  function setError(message) {
    currentTranslation = ""
    output.className = "cassell-extension-output cassell-extension-output-error"
    output.textContent = message
    copyButton.hidden = true
  }

  function setResult(translation, alternatives) {
    currentTranslation = translation
    output.className = "cassell-extension-output"
    output.textContent = ""

    const translationNode = document.createElement("div")
    translationNode.textContent = translation
    output.append(translationNode)

    if (Array.isArray(alternatives) && alternatives.length > 0) {
      const alternativesNode = document.createElement("div")
      alternativesNode.className = "cassell-extension-alternatives"
      alternativesNode.textContent = `也作：${alternatives.join("  ·  ")}`
      output.append(alternativesNode)
    }

    copyButton.hidden = false
  }

  async function translateText(text, requestId) {
    setLoading()

    try {
      const response = await fetch(CASSELL_TRANSLATE_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      if (requestId !== latestRequestId) {
        return
      }

      let data = null
      try {
        data = await response.json()
      } catch (error) {
        if (requestId !== latestRequestId) {
          return
        }

        setError("翻译失败，请稍后重试")
        return
      }

      if (!response.ok) {
        setError(data && data.error ? data.error : "翻译失败，请稍后重试")
        return
      }

      if (!data || !data.translation || typeof data.translation !== "string") {
        setError("翻译失败，请稍后重试")
        return
      }

      setResult(data.translation, data.alternatives)
    } catch (error) {
      if (requestId !== latestRequestId) {
        return
      }

      setError("网络连接失败，请稍后重试")
    }
  }

  function scheduleTranslation() {
    const text = input.value.trim()

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }

    if (!text) {
      latestRequestId += 1
      setIdle()
      return
    }

    debounceTimer = setTimeout(() => {
      latestRequestId += 1
      translateText(text, latestRequestId)
    }, CASSELL_DEBOUNCE_MS)
  }

  // --- Drag logic for launcher ---
  const DRAG_THRESHOLD = 5
  const POSITION_STORAGE_KEY = "cassell-launcher-position"
  let isDragging = false
  let dragStartX = 0
  let dragStartY = 0
  let dragOffsetX = 0
  let dragOffsetY = 0
  let didDrag = false

  function clampPosition(x, y) {
    const size = 56
    const maxX = window.innerWidth - size
    const maxY = window.innerHeight - size
    return {
      x: Math.max(0, Math.min(x, maxX)),
      y: Math.max(0, Math.min(y, maxY)),
    }
  }

  function applyPosition(x, y) {
    const clamped = clampPosition(x, y)
    root.style.left = clamped.x + "px"
    root.style.top = clamped.y + "px"
    return clamped
  }

  function savePosition(x, y) {
    try {
      localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify({ x, y }))
    } catch (e) {
      // storage unavailable — ignore
    }
  }

  function loadPosition() {
    try {
      const raw = localStorage.getItem(POSITION_STORAGE_KEY)
      if (raw) {
        const pos = JSON.parse(raw)
        if (typeof pos.x === "number" && typeof pos.y === "number") {
          return pos
        }
      }
    } catch (e) {
      // storage unavailable — ignore
    }
    return null
  }

  // Restore saved position or default to bottom-right
  const savedPos = loadPosition()
  if (savedPos) {
    applyPosition(savedPos.x, savedPos.y)
  } else {
    applyPosition(window.innerWidth - 56 - 24, window.innerHeight - 56 - 24)
  }

  // Re-clamp on resize
  window.addEventListener("resize", () => {
    const rect = root.getBoundingClientRect()
    applyPosition(rect.left, rect.top)
  })

  function onPointerDown(e) {
    // Only primary button
    if (e.button !== 0) return
    isDragging = true
    didDrag = false
    dragStartX = e.clientX
    dragStartY = e.clientY
    const rect = root.getBoundingClientRect()
    dragOffsetX = e.clientX - rect.left
    dragOffsetY = e.clientY - rect.top
    launcher.setPointerCapture(e.pointerId)
    e.preventDefault()
  }

  function onPointerMove(e) {
    if (!isDragging) return
    const dx = e.clientX - dragStartX
    const dy = e.clientY - dragStartY
    if (!didDrag && Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) {
      return
    }
    didDrag = true
    root.classList.add("cassell-dragging")
    applyPosition(e.clientX - dragOffsetX, e.clientY - dragOffsetY)
  }

  function onPointerUp(e) {
    if (!isDragging) return
    isDragging = false
    root.classList.remove("cassell-dragging")

    if (didDrag) {
      // Save final position
      const rect = root.getBoundingClientRect()
      savePosition(rect.left, rect.top)
    } else {
      // It was a click, not a drag — toggle panel
      panel.hidden = !panel.hidden
      if (!panel.hidden) {
        input.focus()
      }
    }
  }

  launcher.addEventListener("pointerdown", onPointerDown)
  document.addEventListener("pointermove", onPointerMove)
  document.addEventListener("pointerup", onPointerUp)

  closeButton.addEventListener("click", () => {
    panel.hidden = true
  })

  input.addEventListener("input", scheduleTranslation)

  copyButton.addEventListener("click", async () => {
    if (!currentTranslation) {
      return
    }

    try {
      await navigator.clipboard.writeText(currentTranslation)
      copyButton.textContent = "已复制"
    } catch (error) {
      copyButton.textContent = "复制失败"
    }

    if (copyResetTimer) {
      clearTimeout(copyResetTimer)
    }

    copyResetTimer = setTimeout(() => {
      copyButton.textContent = "复制译文"
    }, 1800)
  })
})()
