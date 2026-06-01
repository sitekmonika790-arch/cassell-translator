export default function Portraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Left portrait - Lu Mingfei (路明非) */}
      <div className="portrait-left">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-[#f0e6d2] z-10" />

        <img
          src="/lu-mingfei.jpg"
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />

        {/* Name label */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-20">
          <span className="text-[#5a4530] text-[11px] tracking-[4px] font-[serif] opacity-85 select-none">
            路明非 · LUMINGFEI
          </span>
        </div>
      </div>

      {/* Right portrait - Chen Motong / Nono (陈墨瞳) */}
      <div className="portrait-right">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-l from-transparent to-[#f0e6d2] z-10" />

        <img
          src="/nono.jpeg"
          alt=""
          className="h-full w-full object-cover object-center"
          draggable={false}
        />

        {/* Name label */}
        <div className="absolute bottom-8 left-0 right-0 text-center z-20">
          <span className="text-[#5a4530] text-[11px] tracking-[4px] font-[serif] opacity-85 select-none">
            陈墨瞳 · NONO
          </span>
        </div>
      </div>
    </div>
  )
}
