"use client"

import { useState, useCallback, useRef, useEffect } from "react"

type Status = "idle" | "loading" | "done" | "error"

export default function TranslationPanel() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [alternatives, setAlternatives] = useState<string[]>([])
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const translate = useCallback(async (text: string) => {
    if (!text.trim()) {
      setOutput("")
      setStatus("idle")
      return
    }

    setStatus("loading")
    setError("")

    try {
      const res = await fetch("/api/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || "翻译失败")
      }

      setOutput(data.translation)
      setAlternatives(data.alternatives || [])
      setStatus("done")
    } catch (err) {
      setError(err instanceof Error ? err.message : "翻译失败，请稍后重试")
      setStatus("error")
    }
  }, [])

  const handleInput = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const text = e.target.value
      setInput(text)

      if (timerRef.current) clearTimeout(timerRef.current)

      if (!text.trim()) {
        setOutput("")
        setAlternatives([])
        setStatus("idle")
        return
      }

      timerRef.current = setTimeout(() => translate(text), 500)
    },
    [translate]
  )

  const handleCopy = useCallback(async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  return (
    <div className="w-full max-w-2xl mx-auto px-4 sm:px-6 animate-fade-in-delay-2">
      <div className="flex flex-col sm:flex-row items-stretch gap-3 sm:gap-4">
        {/* Input column */}
        <div className="flex-1 flex flex-col">
          <textarea
            value={input}
            onChange={handleInput}
            placeholder="输入文本..."
            className="flex-1 min-h-[140px] bg-[rgba(20,5,5,0.5)] border border-[rgba(201,168,76,0.2)] rounded-sm
                       text-[#d4b896] text-sm p-4 resize-none
                       placeholder:text-[#5a3a3a]
                       input-glow
                       font-[serif]"
          />
        </div>

        {/* Arrow */}
        <div className="flex sm:flex-col items-center justify-center text-[#c9a84c] text-lg select-none shrink-0">
          <span className="sm:rotate-0 rotate-90">→</span>
        </div>

        {/* Output column */}
        <div className="flex-1 flex flex-col">
          <div className="relative flex-1 min-h-[140px] bg-[rgba(20,5,5,0.5)] border border-[rgba(201,168,76,0.2)] rounded-sm p-4">
            {/* Loading */}
            {status === "loading" && (
              <div className="flex items-center justify-center h-full">
                <div className="loader" />
              </div>
            )}

            {/* Error */}
            {status === "error" && (
              <p className="text-red-400/70 text-sm text-center font-[serif]">
                {error}
              </p>
            )}

            {/* Translation result */}
            {status === "done" && (
              <div>
                <p className="text-[#d4b896] text-sm whitespace-pre-wrap font-[serif]">
                  {output}
                </p>
                {alternatives.length > 0 && (
                  <p className="text-[#8b6b5a] text-xs mt-2 italic font-[serif]">
                    也作：{alternatives.join("  ·  ")}
                  </p>
                )}
              </div>
            )}

            {/* Idle placeholder */}
            {status === "idle" && (
              <p className="text-[#5a3a3a] text-sm text-center font-[serif] select-none">
                翻译结果将在此显示
              </p>
            )}
          </div>

          {/* Copy button */}
          {status === "done" && (
            <button
              onClick={handleCopy}
              className="copy-btn mt-2 self-end text-[10px] tracking-[0.15em] text-[#8b6b5a]
                         border border-[rgba(201,168,76,0.15)] rounded-sm px-3 py-1
                         font-[serif] cursor-pointer"
            >
              {copied ? "已复制" : "复制译文"}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
