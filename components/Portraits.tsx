export default function Portraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Two characters filling the full screen, split down the middle */}
      <div className="absolute inset-0 flex">
        {/* Left half - Lu Mingfei (路明非) */}
        <img
          src="/lu-mingfei.jpg"
          alt=""
          className="w-1/2 h-full object-cover object-top"
          draggable={false}
        />
        {/* Right half - Nono (诺诺 / 陈墨瞳) */}
        <img
          src="/nono.jpeg"
          alt=""
          className="w-1/2 h-full object-cover object-top"
          draggable={false}
        />
      </div>

      {/* Center scrim - keeps the translation UI readable over the images */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 42% 92% at 50% 50%, rgba(10,5,7,0.8) 0%, rgba(10,5,7,0.52) 36%, rgba(10,5,7,0.16) 60%, transparent 78%)",
        }}
      />

      {/* Soft edge vignette to frame the characters */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,5,7,0.45) 0%, transparent 16%, transparent 84%, rgba(10,5,7,0.6) 100%)",
        }}
      />
    </div>
  )
}
