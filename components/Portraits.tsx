export default function Portraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Left portrait - Lu Mingfei (路明非) */}
      <div className="portrait-left">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-r from-transparent to-[#1a0a0a] z-10" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-r from-transparent via-transparent to-[#1a0a0a]/80 z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMinYMid slice"
        >
          {/* Lu Mingfei silhouette */}
          <g transform="translate(180, 100)">
            {/* Shadow/base */}
            <ellipse cx="0" cy="740" rx="80" ry="12" fill="#0d0505" opacity="0.5" />

            {/* Legs */}
            <path d="M-15 580 L-20 730 L-5 730 L-5 580 Z" fill="#0d0505" />
            <path d="M5 580 L5 730 L20 730 L15 580 Z" fill="#0d0505" />

            {/* Shoes */}
            <path d="M-22 730 Q-25 745 -15 745 L-3 745 Q-5 735 -5 730 Z" fill="#0a0303" />
            <path d="M7 730 Q5 735 3 745 L15 745 Q25 745 22 730 Z" fill="#0a0303" />

            {/* Body / blazer */}
            <path
              d="M-30 320 Q-35 400 -30 480 L-25 580 L25 580 L30 480 Q35 400 30 320 Z"
              fill="#0d0505"
            />
            {/* Blazer lapels */}
            <path d="M-5 320 L0 420 L5 320" fill="none" stroke="#1a0a0a" strokeWidth="1" />
            {/* Blazer bottom */}
            <path d="M-30 520 Q0 540 30 520" fill="none" stroke="#1a0a0a" strokeWidth="0.5" />

            {/* Arms */}
            {/* Left arm - holding a book */}
            <path d="M-30 350 Q-55 420 -45 480 Q-40 500 -30 490 L-30 480 Z" fill="#0d0505" />
            {/* Right arm - slightly forward */}
            <path d="M30 350 Q50 420 42 470 Q38 485 30 480 L30 480 Z" fill="#0d0505" />

            {/* Book in left hand */}
            <rect x="-55" y="480" width="25" height="18" rx="1" fill="#1a0a0a" transform="rotate(-10, -42, 489)" />

            {/* Collar / shirt */}
            <path d="M-12 320 L0 340 L12 320 L8 300 L-8 300 Z" fill="#1a0a0a" />

            {/* Tie */}
            <path d="M-3 340 L-2 400 L2 400 L3 340 Z" fill="#0a0303" />

            {/* Neck */}
            <rect x="-8" y="280" width="16" height="20" rx="4" fill="#0d0505" />

            {/* Head */}
            <ellipse cx="0" cy="250" rx="28" ry="35" fill="#0d0505" />

            {/* Hair */}
            <path
              d="M-28 250 Q-30 210 -20 195 Q-10 180 0 185 Q10 180 20 195 Q30 210 28 250 Q25 230 15 225 Q0 220 -15 225 Q-25 230 -28 250 Z"
              fill="#080202"
            />
            {/* Hair bangs */}
            <path d="M-22 210 Q-15 195 0 198 Q15 195 22 210 Q15 215 0 212 Q-15 215 -22 210 Z" fill="#080202" />

            {/* Eyes (subtle) */}
            <ellipse cx="-10" cy="250" rx="3" ry="2" fill="#1a0a0a" />
            <ellipse cx="10" cy="250" rx="3" ry="2" fill="#1a0a0a" />

            {/* Mouth */}
            <path d="M-5 265 Q0 268 5 265" fill="none" stroke="#1a0a0a" strokeWidth="0.5" />
          </g>

          {/* Name label */}
          <text x="180" y="870" textAnchor="middle" fill="#5a3a3a" fontSize="14" fontFamily="serif" letterSpacing="4" opacity="0.6">
            路明非 · LUMINGFEI
          </text>
        </svg>
      </div>

      {/* Right portrait - Chen Motong / Nono (陈墨瞳) */}
      <div className="portrait-right">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-l from-transparent to-[#1a0a0a] z-10" />
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-l from-transparent via-transparent to-[#1a0a0a]/80 z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid slice"
        >
          {/* Chen Motong silhouette */}
          <g transform="translate(200, 100)">
            {/* Shadow/base */}
            <ellipse cx="0" cy="740" rx="75" ry="10" fill="#0d0505" opacity="0.5" />

            {/* Legs */}
            <path d="M-12 560 L-15 730 L-2 730 L-2 560 Z" fill="#0d0505" />
            <path d="M2 560 L2 730 L15 730 L12 560 Z" fill="#0d0505" />

            {/* Shoes - slight heel */}
            <path d="M-17 730 Q-20 743 -12 743 L0 743 Q-3 733 -2 730 Z" fill="#0a0303" />
            <path d="M2 730 Q3 733 0 743 L12 743 Q20 743 17 730 Z" fill="#0a0303" />

            {/* Skirt */}
            <path d="M-28 520 Q-32 545 -30 570 L30 570 Q32 545 28 520 Z" fill="#0d0505" />

            {/* Upper body / blazer */}
            <path
              d="M-25 320 Q-30 400 -28 480 L-25 520 L25 520 L28 480 Q30 400 25 320 Z"
              fill="#0d0505"
            />
            {/* Blazer waist */}
            <path d="M-28 490 Q0 500 28 490" fill="none" stroke="#1a0a0a" strokeWidth="0.5" />

            {/* Chest line */}
            <path d="M-18 360 Q0 380 18 360" fill="none" stroke="#1a0a0a" strokeWidth="0.5" />

            {/* Arms */}
            <path d="M-25 350 Q-45 420 -38 480 Q-34 495 -25 490 L-25 480 Z" fill="#0d0505" />
            <path d="M25 350 Q45 410 40 460 Q37 475 25 470 L25 460 Z" fill="#0d0505" />

            {/* Collar */}
            <path d="M-10 320 L0 338 L10 320 L6 305 L-6 305 Z" fill="#1a0a0a" />
            {/* Ribbon/bow tie */}
            <path d="M-8 330 Q0 336 8 330 Q0 342 -8 330 Z" fill="#0a0303" />

            {/* Neck */}
            <rect x="-6" y="285" width="12" height="20" rx="3" fill="#0d0505" />

            {/* Head */}
            <ellipse cx="0" cy="258" rx="24" ry="30" fill="#0d0505" />

            {/* Flowing long hair - Chen Motong's signature */}
            <path
              d="M-24 258 Q-26 230 -22 210 Q-18 195 -10 188 Q0 182 10 188 Q22 195 26 215 Q30 235 28 260
                 Q26 235 20 220 Q10 210 0 208 Q-10 210 -20 220 Q-26 235 -24 258 Z"
              fill="#080202"
            />
            {/* Hair flowing down left side */}
            <path
              d="M-24 258 Q-30 300 -35 350 Q-38 380 -42 400 Q-35 390 -28 370 Q-22 340 -20 300 Z"
              fill="#080202"
            />
            {/* Hair flowing down right side */}
            <path
              d="M28 258 Q34 300 38 340 Q40 365 42 385 Q36 375 30 355 Q26 330 22 290 Z"
              fill="#080202"
            />
            {/* Hair strands detail */}
            <path d="M-30 350 Q-32 380 -38 400" fill="none" stroke="#1a0a0a" strokeWidth="0.3" />
            <path d="M34 340 Q36 370 40 385" fill="none" stroke="#1a0a0a" strokeWidth="0.3" />
            <path d="M-26 300 Q-28 330 -34 360" fill="none" stroke="#1a0a0a" strokeWidth="0.3" />

            {/* Eyes */}
            <ellipse cx="-8" cy="255" rx="3" ry="2.5" fill="#1a0a0a" />
            <ellipse cx="8" cy="255" rx="3" ry="2.5" fill="#1a0a0a" />
            {/* Eyelashes hint */}
            <path d="M-12 252 Q-8 250 -5 253" fill="none" stroke="#1a0a0a" strokeWidth="0.4" />
            <path d="M5 253 Q8 250 12 252" fill="none" stroke="#1a0a0a" strokeWidth="0.4" />

            {/* Mouth - slight smile */}
            <path d="M-4 270 Q0 273 4 270" fill="none" stroke="#1a0a0a" strokeWidth="0.5" />
          </g>

          {/* Name label */}
          <text x="200" y="870" textAnchor="middle" fill="#5a3a3a" fontSize="14" fontFamily="serif" letterSpacing="4" opacity="0.6">
            陈墨瞳 · NONO
          </text>
        </svg>
      </div>
    </div>
  )
}
