export default function Header() {
  return (
    <header className="relative text-center pt-10 pb-4 px-6 animate-fade-in corner-mark">
      {/* Emblem circle */}
      <div className="mx-auto mb-4 w-14 h-14 rounded-full border border-[rgba(212,175,86,0.45)] flex items-center justify-center emblem-glow bg-[rgba(10,5,7,0.4)]">
        <span className="text-2xl text-[#d4af56] select-none">⚜</span>
      </div>

      {/* Title */}
      <h1 className="text-[#e8d4af] text-shadow-soft text-xl sm:text-2xl tracking-[0.3em] font-bold font-[serif] select-none">
        CASSELL COLLEGE
      </h1>
      <p className="text-[#cbb182] text-shadow-soft text-[10px] sm:text-xs tracking-[0.35em] mt-1 font-[serif] select-none">
        TRANSLATION HALL
      </p>

      {/* Divider */}
      <div className="gold-divider mx-auto mt-4" />

      {/* Motto */}
      <p className="text-[#b89a6a] text-shadow-soft text-[10px] tracking-[0.2em] mt-3 italic font-[serif] select-none">
        &ldquo;语言是灵魂的桥梁&rdquo;
      </p>
    </header>
  )
}
