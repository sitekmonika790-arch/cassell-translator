(() => {
  const CASSELL_EXTENSION_ROOT_ID = "cassell-extension-root"
  const CASSELL_TRANSLATE_API_URL = "https://cassell-translator.vercel.app/api/translate"
  const CASSELL_DEBOUNCE_MS = 500

  // Base64 Audio for Norma Terminal
  const soundOpen = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH8=")
  const soundSuccess = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACAf4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH+Af4B/gH8=")
  soundOpen.volume = 0.3
  soundSuccess.volume = 0.3

  if (document.getElementById(CASSELL_EXTENSION_ROOT_ID)) {
    return
  }

  let debounceTimer = null
  let latestRequestId = 0
  let currentTranslation = ""
  let copyResetTimer = null

  // Typewriter effect function
  function typeWriter(element, text, callback) {
    element.innerHTML = ""
    let index = 0
    const cursor = document.createElement("span")
    cursor.className = "cassell-cursor"
    element.appendChild(cursor)

    function typeChar() {
      if (index < text.length) {
        cursor.before(text.charAt(index))
        index++
        setTimeout(typeChar, 30)
      } else {
        if (callback) callback()
      }
    }
    typeChar()
  }

  const root = document.createElement("div")
  root.id = CASSELL_EXTENSION_ROOT_ID

  const panel = document.createElement("section")
  panel.className = "cassell-extension-panel"
  panel.hidden = true
  panel.setAttribute("aria-label", "Cassell Translator panel")

  const header = document.createElement("div")
  header.className = "cassell-extension-header"

  const title = document.createElement("div")
  title.className = "cassell-extension-title"
  title.textContent = "CASSELL TRANSLATOR"

  const greeting = document.createElement("div")
  greeting.className = "cassell-extension-greeting"
  greeting.textContent = "> [System] Norma online."

  const closeButton = document.createElement("button")
  closeButton.type = "button"
  closeButton.className = "cassell-extension-close"
  closeButton.setAttribute("aria-label", "关闭 Cassell Translator")
  closeButton.textContent = "×"

  header.append(title, greeting, closeButton)

  const body = document.createElement("div")
  body.className = "cassell-extension-body"

  const input = document.createElement("textarea")
  input.className = "cassell-extension-input"
  input.placeholder = "输入文本..."
  input.setAttribute("aria-label", "需要翻译的文本")

  const outputWrap = document.createElement("div")
  outputWrap.className = "cassell-extension-output-wrap"

  const output = document.createElement("div")
  output.className = "cassell-extension-output cassell-extension-output-idle"
  output.textContent = "翻译结果将在此显示"

  const ripple = document.createElement("div")
  ripple.className = "cassell-extension-ripple"

  outputWrap.append(output, ripple)

  const actions = document.createElement("div")
  actions.className = "cassell-extension-actions"

  const copyButton = document.createElement("button")
  copyButton.type = "button"
  copyButton.className = "cassell-extension-copy"
  copyButton.textContent = "复制译文"
  copyButton.hidden = true

  actions.append(copyButton)
  body.append(input, outputWrap, actions)
  panel.append(header, body)

  const launcher = document.createElement("button")
  launcher.type = "button"
  launcher.className = "cassell-extension-launcher"
  launcher.setAttribute("aria-label", "打开 Cassell Translator")
  launcher.innerHTML = '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="2"/><path d="M50 10 L50 90 M10 50 L90 50 M20 20 L80 80 M80 20 L20 80" stroke="currentColor" stroke-width="2"/></svg>'

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
    output.innerHTML = ""

    // Play success sound
    try {
      soundSuccess.currentTime = 0
      soundSuccess.play().catch(() => {})
    } catch (e) {}

    // Trigger ripple animation
    ripple.classList.remove("cassell-extension-ripple-active")
    void ripple.offsetWidth
    ripple.classList.add("cassell-extension-ripple-active")

    const translationNode = document.createElement("div")
    typeWriter(translationNode, translation)
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
    const margin = 8
    const size = 56
    const maxX = Math.max(margin, window.innerWidth - size - margin)
    const maxY = Math.max(margin, window.innerHeight - size - margin)

    return {
      x: Math.max(margin, Math.min(x, maxX)),
      y: Math.max(margin, Math.min(y, maxY)),
    }
  }

  function applyPosition(x, y) {
    const clamped = clampPosition(x, y)
    root.style.left = clamped.x + "px"
    root.style.top = clamped.y + "px"
    updatePanelPlacement()
    return clamped
  }

  function updatePanelPlacement() {
    const margin = 8
    const rect = root.getBoundingClientRect()
    const panelWidth = Math.min(360, Math.max(0, window.innerWidth - 48))
    const panelHeight = panel.offsetHeight || 320

    root.classList.toggle("cassell-panel-left", rect.right - panelWidth < margin)
    root.classList.toggle("cassell-panel-below", rect.top - panelHeight - 14 < margin)
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
    const pos = applyPosition(rect.left, rect.top)
    savePosition(pos.x, pos.y)
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
      const wasHidden = panel.hidden
      panel.hidden = !panel.hidden
      if (!panel.hidden) {
        updatePanelPlacement()
        input.focus()
        
        // Play open sound and typewrite greeting
        if (wasHidden) {
          try {
            soundOpen.currentTime = 0
            soundOpen.play().catch(() => {})
          } catch (e) {}
          
          typeWriter(greeting, "> [System] Norma online.")
        }
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
