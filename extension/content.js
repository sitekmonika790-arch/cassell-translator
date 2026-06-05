(() => {
  const CASSELL_EXTENSION_ROOT_ID = "cassell-extension-root"
  const CASSELL_TRANSLATE_API_URL = "https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate"
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
  document.documentElement.append(root)

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

      const data = await response.json()

      if (requestId !== latestRequestId) {
        return
      }

      if (!response.ok) {
        setError(data.error || "翻译失败，请稍后重试")
        return
      }

      if (!data.translation || typeof data.translation !== "string") {
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

  launcher.addEventListener("click", () => {
    panel.hidden = !panel.hidden

    if (!panel.hidden) {
      input.focus()
    }
  })

  closeButton.addEventListener("click", () => {
    panel.hidden = true
  })

  input.addEventListener("input", scheduleTranslation)

  copyButton.addEventListener("click", async () => {
    if (!currentTranslation) {
      return
    }

    await navigator.clipboard.writeText(currentTranslation)
    copyButton.textContent = "已复制"

    if (copyResetTimer) {
      clearTimeout(copyResetTimer)
    }

    copyResetTimer = setTimeout(() => {
      copyButton.textContent = "复制译文"
    }, 1800)
  })
})()
