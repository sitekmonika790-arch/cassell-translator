# Edge Floating Translator Extension Design

Date: 2026-06-05
Project: Cassell Translator
Scope: Local Microsoft Edge extension for personal use

## Summary

Build a lightweight Microsoft Edge browser extension that makes Cassell Translator available from any webpage without switching tabs. The first version injects a Cassell-styled floating button in the bottom-right corner of every webpage. Clicking the button opens a compact translation panel. The user types or pastes text into the panel, and the extension automatically translates after a 500 ms pause by calling the existing deployed Cassell Translator API.

This first version is intentionally small: no text-selection popup, no keyboard shortcut, no settings page, no history, and no store publication flow.

## Goals

- Provide quick translation while browsing other websites.
- Keep the existing Cassell gothic visual identity in the mini panel.
- Reuse the current deployed translation backend instead of duplicating translation logic inside the extension.
- Make installation simple through Edge developer-mode loading.
- Keep extension permissions minimal.

## Non-Goals

- No selected-text translation popup in v1.
- No desktop floating app outside the browser.
- No Chrome Web Store or Edge Add-ons publication workflow.
- No user accounts, persistence, translation history, or settings page.
- No multi-provider translation configuration.

## Architecture

Add a new `extension/` directory at the repository root:

```text
cassell-translator/
  extension/
    manifest.json
    content.js
    content.css
    icons/
      icon-16.png
      icon-48.png
      icon-128.png
```

### `manifest.json`

Defines a Manifest V3 extension for Microsoft Edge. It declares one content script and one stylesheet injected into all normal webpages. The extension requests no broad browser permissions. It declares host access only for the deployed Cassell Translator domain so the content script can call the `/api/translate` endpoint.

### `content.js`

Runs inside webpages and owns all runtime behavior:

- Create the bottom-right floating launcher button.
- Create the hidden translation panel.
- Toggle the panel when the launcher is clicked.
- Listen to textarea input.
- Debounce translation requests by 500 ms.
- POST `{ text }` to the deployed `/api/translate` endpoint.
- Render loading, idle, success, and error states.
- Render alternative translations when the API returns them.
- Copy the current translation when the user clicks the copy button.
- Avoid injecting duplicate UI if the content script runs more than once.

### `content.css`

Styles only extension-owned elements. All selectors use a unique prefix such as `cassell-extension-` to avoid affecting host webpages. The panel uses the existing Cassell visual language: dark translucent background, gold border, serif title, warm text, and subtle shadow.

### `icons/`

Use simple generated local icons for v1: dark background, gold border or glyph, and a Cassell-style `C`. The icon quality can be improved later without changing extension behavior.

## User Experience

### Default State

Every webpage shows a small circular button fixed to the bottom-right corner. The button is visually distinct but not large enough to block normal browsing.

### Open Panel

Clicking the button opens a compact panel above the button.

Panel contents:

- Header: `CASSELL TRANSLATOR`
- Close button: `×`
- Textarea placeholder: `输入文本...`
- Output area placeholder: `翻译结果将在此显示`
- Copy button shown only after a successful translation

### Translation Behavior

- Empty input keeps the output in the idle state.
- Non-empty input starts a 500 ms timer.
- If the user keeps typing, the previous timer is cancelled.
- When the timer fires, the extension sends a translation request.
- During the request, the output shows a loading state.
- On success, the output shows `translation` and optional `alternatives`.
- On failure, the output shows a concise Chinese error message.

### Copy Behavior

- The copy button appears after a successful translation.
- Clicking it writes the translation to the clipboard.
- The button label changes to `已复制` briefly, then returns to `复制译文`.

## Data Flow

```text
User types or pastes text
  -> content.js stores input
  -> 500 ms debounce
  -> POST https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/api/translate
  -> existing Next.js API detects zh/en and calls Google Translate endpoint
  -> response contains translation, from, to, optional alternatives
  -> extension renders result
```

The extension depends on the deployed Vercel site being available. If the site is unavailable, the panel should display an error instead of silently failing.

## API Contract

Request:

```json
{
  "text": "hello"
}
```

Response on success:

```json
{
  "translation": "你好",
  "from": "en",
  "to": "zh",
  "alternatives": ["您好"]
}
```

Response on error:

```json
{
  "error": "翻译失败，请稍后重试"
}
```

The extension should treat `alternatives` as optional.

## Permissions

Minimal target permissions:

```json
{
  "permissions": [],
  "host_permissions": [
    "https://cassell-translator-jcyv25abj-sitekmonika790-archs-projects.vercel.app/*"
  ]
}
```

Content scripts match normal webpages through `<all_urls>`. No permission is requested for reading browsing history, tabs, storage, or clipboard reading. Clipboard writing is triggered only by the user's copy-button click.

## Error Handling

- Empty text: clear output and show idle placeholder.
- API returns non-2xx: show `翻译失败，请稍后重试` or the returned `error` field.
- Network failure: show `网络连接失败，请稍后重试`.
- Timeout is handled by the existing backend; extension should still handle failed fetches gracefully.
- Repeated input changes should not leave stale loading states; only the latest request should update the panel.

## Implementation Notes

- Use plain JavaScript and CSS for v1, not React, to keep the extension simple and dependency-free.
- Use one content script rather than a popup page because the user wants an in-page floating panel.
- Prefix all DOM ids/classes with `cassell-extension-`.
- Do not use `eval`, inline remote scripts, or broad extension permissions.
- Do not change the existing website UI or API unless a CORS issue requires a small backend header adjustment.

## Testing Plan

- Load the extension unpacked in Microsoft Edge developer mode.
- Confirm the floating button appears on several normal websites.
- Confirm clicking the button opens and closes the panel.
- Confirm Chinese input translates to English.
- Confirm English input translates to Chinese.
- Confirm clearing input resets the output area.
- Confirm copy button writes the translated text.
- Confirm network/API errors display visibly.
- Confirm the existing Next.js production build still passes.

## Future Enhancements

- Selected-text quick translation.
- Keyboard shortcut to open/close the panel.
- Translation history.
- User-configurable panel position.
- Shared styling with the website.
- Chrome support instructions.
