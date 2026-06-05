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
      return json(
        { error: "请输入需要翻译的文本" },
        { status: 400 }
      )
    }

    if (text.length > 5000) {
      return json(
        { error: "文本过长，请限制在5000字符以内" },
        { status: 400 }
      )
    }

    const from = detectLanguage(text)
    const to = from === "zh" ? "en" : "zh"

    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${from}&tl=${to}&dt=t&dt=at&q=${encodeURIComponent(text.trim())}`

    const res = await fetch(url, { signal: AbortSignal.timeout(10000) })

    if (!res.ok) {
      return json(
        { error: "翻译服务暂时不可用，请稍后重试" },
        { status: 502 }
      )
    }

    const data = await res.json()

    const translation = data[0]
      .filter((item: unknown[]) => item[0])
      .map((item: string[]) => item[0])
      .join("")

    // Parse alternative translations from dt=at response
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
      return json(
        { error: "翻译请求超时，请稍后重试" },
        { status: 504 }
      )
    }

    return json(
      { error: "翻译失败，请稍后重试" },
      { status: 500 }
    )
  }
}
