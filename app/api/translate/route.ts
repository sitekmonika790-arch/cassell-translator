import { NextResponse } from "next/server"
import { detectLanguage } from "@/lib/translate"

export async function POST(request: Request) {
  try {
    const { text } = await request.json()

    if (!text || typeof text !== "string" || text.trim().length === 0) {
      return NextResponse.json(
        { error: "请输入需要翻译的文本" },
        { status: 400 }
      )
    }

    if (text.length > 5000) {
      return NextResponse.json(
        { error: "文本过长，请限制在5000字符以内" },
        { status: 400 }
      )
    }

    const from = detectLanguage(text)
    const to = from === "zh" ? "en" : "zh"

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.trim())}&langpair=${from}|${to}`

    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

    if (!res.ok) {
      return NextResponse.json(
        { error: "翻译服务暂时不可用，请稍后重试" },
        { status: 502 }
      )
    }

    const data = await res.json()

    return NextResponse.json({
      translation: data.responseData.translatedText,
      from,
      to,
    })
  } catch (err) {
    if (err instanceof DOMException && err.name === "TimeoutError") {
      return NextResponse.json(
        { error: "翻译请求超时，请稍后重试" },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: "翻译失败，请稍后重试" },
      { status: 500 }
    )
  }
}
