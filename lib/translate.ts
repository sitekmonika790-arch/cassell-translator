const CHINESE_CHAR_REGEX = /[一-鿿㐀-䶿]/

export function detectLanguage(text: string): "zh" | "en" {
  return CHINESE_CHAR_REGEX.test(text) ? "zh" : "en"
}

export type TranslationResult = {
  translation: string
  from: string
  to: string
}

export async function translateText(text: string): Promise<TranslationResult> {
  const from = detectLanguage(text)
  const to = from === "zh" ? "en" : "zh"

  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`

  const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

  if (!res.ok) {
    throw new Error(`Translation service returned ${res.status}`)
  }

  const data = await res.json()

  if (data.responseStatus !== 200 && data.responseStatus !== 403) {
    throw new Error(data.responseDetails || "Translation failed")
  }

  return {
    translation: data.responseData.translatedText,
    from,
    to,
  }
}
