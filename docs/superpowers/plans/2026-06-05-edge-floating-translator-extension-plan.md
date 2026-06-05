# Edge Floating Translator Extension Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a local Microsoft Edge extension that injects a Cassell-styled floating translation panel into any webpage and calls the existing Cassell Translator API after 500 ms of input inactivity.

**Architecture:** Add a dependency-free `extension/` directory containing a Manifest V3 config, one content script, one CSS file, and generated local icons. The content script owns DOM injection, state transitions, debounced API calls, stale-request protection, and copy behavior. The existing Next.js site remains unchanged unless manual testing later proves a CORS header adjustment is required.

**Tech Stack:** Microsoft Edge Manifest V3, plain JavaScript, CSS, existing Vercel API endpoint `https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate`, existing Next.js build for regression verification.

---

## File Structure

- Create: `extension/manifest.json` — Manifest V3 extension definition, content script registration, minimal host permissions.
- Create: `extension/content.js` — Injects launcher and panel, debounces input, calls the API, renders states, copies results.
- Create: `extension/content.css` — Cassell visual styling scoped to `cassell-extension-` selectors.
- Create: `extension/icons/icon.svg` — Source icon for generated PNGs.
- Create: `extension/icons/icon-16.png` — 16 px extension icon.
- Create: `extension/icons/icon-48.png` — 48 px extension icon.
- Create: `extension/icons/icon-128.png` — 128 px extension icon.
- Create: `extension/README.md` — Edge developer-mode installation and usage instructions.
- Modify only if required by verification: `app/api/translate/route.ts` — Add CORS response headers if Edge content-script fetch cannot reach the deployed API.

## Constants

Use these exact runtime constants in `extension/content.js`:

```js
const CASSELL_EXTENSION_ROOT_ID = "cassell-extension-root"
const CASSELL_TRANSLATE_API_URL = "https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate"
const CASSELL_DEBOUNCE_MS = 500
```

---

### Task 1: Add Manifest V3 Extension Shell

**Files:**
- Create: `extension/manifest.json`
- Create: `extension/README.md`

- [ ] **Step 1: Create `extension/manifest.json`**

Create the file with exactly this structure:

```json
{
  "manifest_version": 3,
  "name": "Cassell Translator",
  "description": "卡塞尔学院风格的网页悬浮翻译面板。",
  "version": "0.1.0",
  "icons": {
    "16": "icons/icon-16.png",
    "48": "icons/icon-48.png",
    "128": "icons/icon-128.png"
  },
  "permissions": [],
  "host_permissions": [
    "https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/*"
  ],
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["content.css"],
      "run_at": "document_idle"
    }
  ]
}
```

- [ ] **Step 2: Create `extension/README.md`**

Create the file with this content:

```markdown
# Cassell Translator Edge Extension

本目录是 Cassell Translator 的本地 Microsoft Edge 插件版本。

## 安装方式

1. 打开 Microsoft Edge。
2. 进入 `edge://extensions/`。
3. 打开左侧或页面上的“开发人员模式”。
4. 点击“加载解压缩的扩展”。
5. 选择本项目的 `extension/` 目录。
6. 打开任意网页，右下角会出现 Cassell 翻译按钮。

## 使用方式

1. 点击右下角的 Cassell 按钮。
2. 在小面板里输入或粘贴文本。
3. 停顿约 0.5 秒后自动翻译。
4. 翻译成功后点击“复制译文”可复制结果。

## 依赖

插件调用线上接口：

`https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate`

如果 Vercel 部署不可用，插件会显示错误提示。
```

- [ ] **Step 3: Verify manifest JSON parses**

Run:

```powershell
node -e "JSON.parse(require('fs').readFileSync('extension/manifest.json','utf8')); console.log('manifest ok')"
```

Expected output:

```text
manifest ok
```

- [ ] **Step 4: Commit shell files**

Run:

```powershell
git add extension/manifest.json extension/README.md
git commit -m "Add Edge extension shell"
```

---

### Task 2: Add Scoped Cassell Extension Styles

**Files:**
- Create: `extension/content.css`

- [ ] **Step 1: Create `extension/content.css`**

Create the file with this content:

```css
#cassell-extension-root,
#cassell-extension-root * {
  box-sizing: border-box;
  font-family: Georgia, "Times New Roman", "Noto Serif SC", serif;
}

#cassell-extension-root {
  position: fixed;
  right: 24px;
  bottom: 24px;
  z-index: 2147483647;
  color: #e8d4af;
  font-size: 14px;
  line-height: 1.5;
}

.cassell-extension-launcher {
  width: 56px;
  height: 56px;
  border-radius: 999px;
  border: 1px solid rgba(212, 175, 86, 0.72);
  background:
    radial-gradient(circle at 35% 25%, rgba(212, 175, 86, 0.2), transparent 34%),
    linear-gradient(145deg, rgba(40, 9, 15, 0.96), rgba(8, 4, 6, 0.96));
  color: #d4af56;
  box-shadow: 0 12px 34px rgba(0, 0, 0, 0.55), 0 0 24px rgba(212, 175, 86, 0.18);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.04em;
  user-select: none;
}

.cassell-extension-launcher:hover {
  transform: translateY(-1px);
  box-shadow: 0 16px 42px rgba(0, 0, 0, 0.62), 0 0 30px rgba(212, 175, 86, 0.26);
}

.cassell-extension-panel {
  width: min(360px, calc(100vw - 48px));
  margin-bottom: 14px;
  border: 1px solid rgba(212, 175, 86, 0.42);
  border-radius: 12px;
  background: rgba(12, 6, 8, 0.94);
  box-shadow: 0 18px 56px rgba(0, 0, 0, 0.64), inset 0 1px 0 rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  overflow: hidden;
}

.cassell-extension-panel[hidden] {
  display: none;
}

.cassell-extension-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 14px;
  border-bottom: 1px solid rgba(212, 175, 86, 0.25);
  color: #d4af56;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 700;
}

.cassell-extension-close {
  border: 0;
  background: transparent;
  color: #b89a6a;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 2px 4px;
}

.cassell-extension-body {
  padding: 14px;
}

.cassell-extension-input {
  width: 100%;
  min-height: 108px;
  resize: vertical;
  border: 1px solid rgba(212, 175, 86, 0.34);
  border-radius: 8px;
  background: rgba(25, 10, 13, 0.86);
  color: #e8d4af;
  outline: none;
  padding: 10px 11px;
  font-size: 14px;
}

.cassell-extension-input::placeholder {
  color: #8a6a4a;
}

.cassell-extension-output {
  min-height: 88px;
  margin-top: 12px;
  border: 1px solid rgba(212, 175, 86, 0.24);
  border-radius: 8px;
  background: rgba(15, 7, 9, 0.82);
  color: #e8d4af;
  padding: 10px 11px;
  white-space: pre-wrap;
  word-break: break-word;
}

.cassell-extension-output-idle {
  color: #8a6a4a;
  text-align: center;
}

.cassell-extension-output-error {
  color: #f3a6a6;
}

.cassell-extension-alternatives {
  margin-top: 8px;
  color: #b89a6a;
  font-size: 12px;
  font-style: italic;
}

.cassell-extension-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}

.cassell-extension-copy {
  border: 1px solid rgba(212, 175, 86, 0.35);
  border-radius: 7px;
  background: rgba(22, 9, 12, 0.82);
  color: #b89a6a;
  cursor: pointer;
  font-size: 12px;
  letter-spacing: 0.08em;
  padding: 6px 10px;
}

.cassell-extension-copy[hidden] {
  display: none;
}
```

- [ ] **Step 2: Commit styles**

Run:

```powershell
git add extension/content.css
git commit -m "Add Cassell extension styles"
```

---

### Task 3: Implement Floating Translator Content Script

**Files:**
- Create: `extension/content.js`

- [ ] **Step 1: Create `extension/content.js`**

Create the file with this content:

```js
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
```

- [ ] **Step 2: Run JavaScript syntax check**

Run:

```powershell
node --check extension/content.js
```

Expected output:

```text
```

The command exits with code 0 and prints no syntax errors.

- [ ] **Step 3: Commit content script**

Run:

```powershell
git add extension/content.js
git commit -m "Add floating translator content script"
```

---

### Task 4: Add Extension Icons

**Files:**
- Create: `extension/icons/icon.svg`
- Create: `extension/icons/icon-16.png`
- Create: `extension/icons/icon-48.png`
- Create: `extension/icons/icon-128.png`

- [ ] **Step 1: Create `extension/icons/icon.svg`**

Create the SVG source icon:

```xml
<svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="128" height="128" rx="28" fill="#0A0507"/>
  <rect x="8" y="8" width="112" height="112" rx="23" stroke="#D4AF56" stroke-width="4"/>
  <circle cx="64" cy="64" r="42" fill="#22080E" stroke="#8A6A2A" stroke-width="2"/>
  <text x="64" y="81" text-anchor="middle" font-family="Georgia, serif" font-size="58" font-weight="700" fill="#D4AF56">C</text>
</svg>
```

- [ ] **Step 2: Generate PNG icons with PowerShell and .NET**

Run this PowerShell command from the repository root:

```powershell
Add-Type -AssemblyName System.Drawing; $sizes = @(16,48,128); foreach ($size in $sizes) { $bitmap = New-Object System.Drawing.Bitmap $size, $size; $graphics = [System.Drawing.Graphics]::FromImage($bitmap); $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias; $graphics.Clear([System.Drawing.Color]::FromArgb(10,5,7)); $gold = [System.Drawing.Color]::FromArgb(212,175,86); $darkRed = [System.Drawing.Color]::FromArgb(34,8,14); $borderPen = New-Object System.Drawing.Pen $gold, ([Math]::Max(1, $size / 32)); $innerBrush = New-Object System.Drawing.SolidBrush $darkRed; $textBrush = New-Object System.Drawing.SolidBrush $gold; $padding = [Math]::Max(1, [int]($size / 16)); $graphics.DrawRectangle($borderPen, $padding, $padding, $size - ($padding * 2) - 1, $size - ($padding * 2) - 1); $ellipsePadding = [int]($size / 5); $graphics.FillEllipse($innerBrush, $ellipsePadding, $ellipsePadding, $size - ($ellipsePadding * 2), $size - ($ellipsePadding * 2)); $font = New-Object System.Drawing.Font "Georgia", ([Math]::Max(8, [int]($size * 0.48))), ([System.Drawing.FontStyle]::Bold), ([System.Drawing.GraphicsUnit]::Pixel); $format = New-Object System.Drawing.StringFormat; $format.Alignment = [System.Drawing.StringAlignment]::Center; $format.LineAlignment = [System.Drawing.StringAlignment]::Center; $graphics.DrawString("C", $font, $textBrush, (New-Object System.Drawing.RectangleF 0, 0, $size, $size), $format); $bitmap.Save("extension/icons/icon-$size.png", [System.Drawing.Imaging.ImageFormat]::Png); $graphics.Dispose(); $bitmap.Dispose() }
```

Expected files:

```text
extension/icons/icon-16.png
extension/icons/icon-48.png
extension/icons/icon-128.png
```

- [ ] **Step 3: Verify icons exist**

Run:

```powershell
Test-Path -LiteralPath "extension/icons/icon-16.png"; Test-Path -LiteralPath "extension/icons/icon-48.png"; Test-Path -LiteralPath "extension/icons/icon-128.png"
```

Expected output:

```text
True
True
True
```

- [ ] **Step 4: Commit icons**

Run:

```powershell
git add extension/icons
git commit -m "Add Cassell extension icons"
```

---

### Task 5: Verify Extension and Existing Site Build

**Files:**
- Read/verify: `extension/manifest.json`
- Read/verify: `extension/content.js`
- Read/verify: `extension/content.css`
- Optional Modify only if CORS fails on deployed API: `app/api/translate/route.ts`

- [ ] **Step 1: Validate manifest and content script**

Run:

```powershell
node -e "JSON.parse(require('fs').readFileSync('extension/manifest.json','utf8')); console.log('manifest ok')"; if ($?) { node --check extension/content.js }
```

Expected output starts with:

```text
manifest ok
```

and has no JavaScript syntax errors.

- [ ] **Step 2: Verify production build still passes**

Run:

```powershell
npm run build
```

Expected output includes:

```text
✓ Compiled successfully
```

- [ ] **Step 3: Manually load in Microsoft Edge**

Manual verification steps:

1. Open `edge://extensions/`.
2. Enable developer mode.
3. Click “加载解压缩的扩展”.
4. Select `C:\Users\粉红骡子\cassell-translator\extension`.
5. Open `https://example.com/`.
6. Confirm a `C` button appears in the bottom-right corner.
7. Click the button and confirm the panel opens.
8. Type `hello` and wait 0.5 seconds.
9. Confirm the panel shows a Chinese translation.
10. Replace input with `你好` and wait 0.5 seconds.
11. Confirm the panel shows an English translation.
12. Click `复制译文` and confirm the label changes to `已复制`.

- [ ] **Step 4: If API fetch fails because of CORS, patch `app/api/translate/route.ts`**

Only do this step if manual verification shows a browser console CORS error while calling the deployed API. Replace `app/api/translate/route.ts` with a version that adds CORS headers to every response and supports `OPTIONS`:

```ts
import { NextResponse } from "next/server"
import { detectLanguage } from "@/lib/translate"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
}

function json(data: unknown, init?: ResponseInit) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      ...corsHeaders,
      ...init?.headers,
    },
  })
}

export function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders,
  })
}

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return json({ error: "请输入需要翻译的文本" }, { status: 400 })
    }

    if (text.length > 5000) {
      return json({ error: "文本过长，请限制在5000字符以内" }, { status: 400 })
    }

    const from = detectLanguage(text)
    const to = from === "zh" ? "en" : "zh"
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&dt=at&q=${encodeURIComponent(text.trim())}`
    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

    if (!res.ok) {
      return json({ error: "翻译服务暂时不可用，请稍后重试" }, { status: 502 })
    }

    const data = await res.json()
    const translation = data[0]
      .filter((item: unknown[]) => item[0])
      .map((item: string[]) => item[0])
      .join("")

    const alternatives: string[] = []
    const altData = data[5]
    if (altData && altData[0] && altData[0][2]) {
      for (const alt of altData[0][2]) {
        const altText = alt[0] as string
        if (altText && altText !== translation && !alternatives.includes(altText)) {
          alternatives.push(altText)
        }
      }
    }

    return json({
      translation,
      from,
      to,
      ...(alternatives.length > 0 && { alternatives }),
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return json({ error: "翻译请求超时，请稍后重试" }, { status: 504 })
    }

    return json({ error: "翻译失败，请稍后重试" }, { status: 500 })
  }
}
```

Then run:

```powershell
npm run build
```

Expected output includes:

```text
✓ Compiled successfully
```

- [ ] **Step 5: Commit final verified extension state**

If no CORS patch was required, run:

```powershell
git status --short
```

Expected output:

```text
```

If a CORS patch was required, run:

```powershell
git add app/api/translate/route.ts
git commit -m "Allow extension requests to translation API"
```

---

### Task 6: Final User Handoff

**Files:**
- Read/verify: `extension/README.md`

- [ ] **Step 1: Confirm working tree state**

Run:

```powershell
git status --short
```

Expected output:

```text
```

- [ ] **Step 2: Report installation path and usage**

Tell the user:

```text
插件目录：C:\Users\粉红骡子\cassell-translator\extension

Edge 安装：
1. 打开 edge://extensions/
2. 打开开发人员模式
3. 点击“加载解压缩的扩展”
4. 选择上面的 extension 目录
5. 打开任意网页，点击右下角 C 按钮使用
```

- [ ] **Step 3: Mention verified commands**

Report the exact verification commands that passed:

```text
node manifest parse: passed
node --check extension/content.js: passed
npm run build: passed
```

Also report whether manual Edge verification was completed or still needs the user to perform it.

---

## Plan Self-Review

Spec coverage:

- Floating button: Task 3 content script, Task 2 styles.
- Compact panel: Task 3 DOM, Task 2 styles.
- 500 ms automatic translation: Task 3 `CASSELL_DEBOUNCE_MS` and `scheduleTranslation`.
- Existing Vercel API reuse: Task 3 endpoint constant and fetch request.
- Minimal permissions: Task 1 manifest.
- Edge developer-mode install: Task 1 README and Task 6 handoff.
- Error handling: Task 3 state renderers and Task 5 optional CORS path.
- Existing build verification: Task 5.

Placeholder scan: The plan contains no unresolved placeholder markers and includes exact file paths, exact commands, and expected results.

Type/name consistency: Constants, file names, ids, and class prefixes match across manifest, content script, CSS, and README.
