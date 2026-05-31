export default function Portraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Left portrait - Lu Mingfei (路明非) */}
      <div className="portrait-left">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-[#1a0a0a] z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMinYMid slice"
        >
          <g transform="translate(200, 120)">
            {/* Shadow/base */}
            <ellipse cx="0" cy="720" rx="80" ry="12" fill="#4a2f2f" opacity="0.5" />

            {/* Legs */}
            <path d="M-15 560 L-20 710 L-5 710 L-5 560 Z" fill="#4a2f2f" />
            <path d="M5 560 L5 710 L20 710 L15 560 Z" fill="#4a2f2f" />

            {/* Shoes */}
            <path d="M-22 710 Q-25 725 -15 725 L-3 725 Q-5 715 -5 710 Z" fill="#3a1f1f" />
            <path d="M7 710 Q5 715 3 725 L15 725 Q25 725 22 710 Z" fill="#3a1f1f" />

            {/* Body / blazer */}
            <path
              d="M-30 300 Q-35 380 -30 460 L-25 560 L25 560 L30 460 Q35 380 30 300 Z"
              fill="#4a2f2f"
            />
            {/* Blazer lapels */}
            <path d="M-5 300 L0 400 L5 300" fill="none" stroke="#4a2a2a" strokeWidth="1.5" />
            {/* Blazer bottom */}
            <path d="M-30 500 Q0 520 30 500" fill="none" stroke="#4a2a2a" strokeWidth="0.8" />

            {/* Arms */}
            {/* Left arm - holding a book */}
            <path d="M-30 330 Q-55 400 -45 460 Q-40 480 -30 470 L-30 460 Z" fill="#4a2f2f" />
            {/* Right arm */}
            <path d="M30 330 Q50 400 42 450 Q38 465 30 460 L30 460 Z" fill="#4a2f2f" />

            {/* Book in left hand */}
            <rect x="-55" y="460" width="25" height="18" rx="1" fill="#5a3f3f" transform="rotate(-10, -42, 469)" />

            {/* Collar / shirt */}
            <path d="M-12 300 L0 320 L12 300 L8 280 L-8 280 Z" fill="#5a3f3f" />

            {/* Tie */}
            <path d="M-3 320 L-2 380 L2 380 L3 320 Z" fill="#3a1f1f" />

            {/* Neck */}
            <rect x="-8" y="260" width="16" height="20" rx="4" fill="#4a2f2f" />

            {/* Head */}
            <ellipse cx="0" cy="232" rx="28" ry="35" fill="#4a2f2f" />

            {/* Hair */}
            <path
              d="M-28 232 Q-30 192 -20 177 Q-10 162 0 167 Q10 162 20 177 Q30 192 28 232 Q25 212 15 207 Q0 202 -15 207 Q-25 212 -28 232 Z"
              fill="#3a1f1f"
            />
            {/* Hair bangs */}
            <path d="M-22 192 Q-15 177 0 180 Q15 177 22 192 Q15 197 0 194 Q-15 197 -22 192 Z" fill="#3a1f1f" />

            {/* Eyes */}
            <ellipse cx="-10" cy="232" rx="3.5" ry="2" fill="#6a4f4f" />
            <ellipse cx="10" cy="232" rx="3.5" ry="2" fill="#6a4f4f" />

            {/* Eyebrows */}
            <path d="M-15 224 Q-10 220 -6 224" fill="none" stroke="#4a2a2a" strokeWidth="0.8" />
            <path d="M6 224 Q10 220 15 224" fill="none" stroke="#4a2a2a" strokeWidth="0.8" />

            {/* Mouth - slight nervous smile */}
            <path d="M-6 247 Q0 250 6 247" fill="none" stroke="#5a3a3a" strokeWidth="0.6" />

            {/* Glasses hint (Lu Mingfei sometimes wears glasses) */}
            <circle cx="-10" cy="232" r="8" fill="none" stroke="#5a3a3a" strokeWidth="0.5" opacity="0.5" />
            <circle cx="10" cy="232" r="8" fill="none" stroke="#5a3a3a" strokeWidth="0.5" opacity="0.5" />
            <line x1="-2" y1="232" x2="2" y2="232" stroke="#5a3a3a" strokeWidth="0.5" opacity="0.5" />
          </g>

          {/* Name label */}
          <text x="200" y="870" textAnchor="middle" fill="#8b6b5a" fontSize="13" fontFamily="serif" letterSpacing="4" opacity="0.8">
            路明非 · LUMINGFEI
          </text>
        </svg>
      </div>

      {/* Right portrait - Chen Motong / Nono (陈墨瞳) */}
      <div className="portrait-right">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-l from-transparent to-[#1a0a0a] z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid slice"
        >
          <g transform="translate(200, 120)">
            {/* Shadow/base */}
            <ellipse cx="0" cy="720" rx="75" ry="10" fill="#4a2f2f" opacity="0.5" />

            {/* Legs */}
            <path d="M-12 540 L-15 710 L-2 710 L-2 540 Z" fill="#4a2f2f" />
            <path d="M2 540 L2 710 L15 710 L12 540 Z" fill="#4a2f2f" />

            {/* Shoes - slight heel */}
            <path d="M-17 710 Q-20 723 -12 723 L0 723 Q-3 713 -2 710 Z" fill="#3a1f1f" />
            <path d="M2 710 Q3 713 0 723 L12 723 Q20 723 17 710 Z" fill="#3a1f1f" />

            {/* Skirt */}
            <path d="M-28 500 Q-32 525 -30 550 L30 550 Q32 525 28 500 Z" fill="#4a2f2f" />

            {/* Upper body / blazer */}
            <path
              d="M-25 300 Q-30 380 -28 460 L-25 500 L25 500 L28 460 Q30 380 25 300 Z"
              fill="#4a2f2f"
            />
            {/* Blazer waist */}
            <path d="M-28 470 Q0 480 28 470" fill="none" stroke="#4a2a2a" strokeWidth="0.8" />

            {/* Chest line */}
            <path d="M-18 340 Q0 360 18 340" fill="none" stroke="#4a2a2a" strokeWidth="0.8" />

            {/* Arms */}
            <path d="M-25 330 Q-45 400 -38 460 Q-34 475 -25 470 L-25 460 Z" fill="#4a2f2f" />
            <path d="M25 330 Q45 390 40 440 Q37 455 25 450 L25 440 Z" fill="#4a2f2f" />

            {/* Collar */}
            <path d="M-10 300 L0 318 L10 300 L6 285 L-6 285 Z" fill="#5a3f3f" />
            {/* Ribbon/bow tie */}
            <path d="M-8 310 Q0 316 8 310 Q0 322 -8 310 Z" fill="#3a1f1f" />

            {/* Neck */}
            <rect x="-6" y="265" width="12" height="20" rx="3" fill="#4a2f2f" />

            {/* Head */}
            <ellipse cx="0" cy="238" rx="24" ry="30" fill="#4a2f2f" />

            {/* Flowing long hair - signature red hair */}
            <path
              d="M-24 238 Q-26 210 -22 190 Q-18 175 -10 168 Q0 162 10 168 Q22 175 26 195 Q30 215 28 240
                 Q26 215 20 200 Q10 190 0 188 Q-10 190 -20 200 Q-26 215 -24 238 Z"
              fill="#3a1f1f"
            />
            {/* Hair flowing down left side */}
            <path
              d="M-24 238 Q-32 280 -38 330 Q-42 360 -48 390 Q-40 378 -32 355 Q-26 325 -22 280 Z"
              fill="#3a1f1f"
            />
            {/* Hair flowing down right side */}
            <path
              d="M28 238 Q34 270 38 310 Q42 340 44 370 Q38 358 32 335 Q28 305 24 270 Z"
              fill="#3a1f1f"
            />
            {/* Hair strand details */}
            <path d="M-34 320 Q-38 355 -46 385" fill="none" stroke="#3a2020" strokeWidth="0.4" />
            <path d="M36 300 Q40 335 44 365" fill="none" stroke="#3a2020" strokeWidth="0.4" />
            <path d="M-28 260 Q-32 300 -38 340" fill="none" stroke="#3a2020" strokeWidth="0.4" />
            <path d="M30 265 Q34 295 38 325" fill="none" stroke="#3a2020" strokeWidth="0.4" />

            {/* Eyes - slightly larger, confident */}
            <ellipse cx="-8" cy="235" rx="3.5" ry="2.5" fill="#6a4f4f" />
            <ellipse cx="8" cy="235" rx="3.5" ry="2.5" fill="#6a4f4f" />
            {/* Eyelashes */}
            <path d="M-13 232 Q-8 229 -4 233" fill="none" stroke="#4a2a2a" strokeWidth="0.5" />
            <path d="M4 233 Q8 229 13 232" fill="none" stroke="#4a2a2a" strokeWidth="0.5" />

            {/* Eyebrows - confident arch */}
            <path d="M-14 226 Q-8 222 -4 225" fill="none" stroke="#4a2a2a" strokeWidth="0.7" />
            <path d="M4 225 Q8 222 14 226" fill="none" stroke="#4a2a2a" strokeWidth="0.7" />

            {/* Mouth - confident slight smile */}
            <path d="M-5 250 Q0 254 5 250" fill="none" stroke="#5a3a3a" strokeWidth="0.7" />
          </g>

          {/* Name label */}
          <text x="200" y="870" textAnchor="middle" fill="#8b6b5a" fontSize="13" fontFamily="serif" letterSpacing="4" opacity="0.8">
            陈墨瞳 · NONO
          </text>
        </svg>
      </div>
    </div>
  )
}
