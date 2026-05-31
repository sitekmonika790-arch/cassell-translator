export default function Header() {
  return (
    <header className="relative text-center pt-10 pb-4 px-6 animate-fade-in corner-mark">
      {/* Emblem circle */}
      <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-[rgba(201,168,76,0.25)] flex items-center justify-center emblem-glow">
        <span className="text-2xl text-[#c9a84c] select-none">⚜</span>
      </div>

      {/* Title */}
      <h1 className="text-[#d4b896] text-xl sm:text-2xl tracking-[0.3em] font-bold font-[serif] select-none">
        CASSELL COLLEGE
      </h1>
      <p className="text-[#8b6b5a] text-[10px] sm:text-xs tracking-[0.35em] mt-1 font-[serif] select-none">
        TRANSLATION HALL
      </p>

      {/* Divider */}
      <div className="gold-divider mx-auto mt-4" />

      {/* Motto */}
      <p className="text-[#5a3a3a] text-[10px] tracking-[0.2em] mt-3 italic font-[serif] select-none">
        &ldquo;语言是灵魂的桥梁&rdquo;
      </p>
    </header>
  )
}
