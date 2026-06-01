export default function Portraits() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden" aria-hidden="true">
      {/* Left portrait - Lu Mingfei (路明非) */}
      <div className="portrait-left">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-r from-transparent to-[#f0e6d2] z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMinYMid slice"
        >
          <defs>
            <linearGradient id="mf-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7a4f2a" />
              <stop offset="55%" stopColor="#5a3a1a" />
              <stop offset="100%" stopColor="#3a2510" />
            </linearGradient>
            <linearGradient id="mf-hoodie" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f8f2e6" />
              <stop offset="55%" stopColor="#e8ddc8" />
              <stop offset="100%" stopColor="#bfae8e" />
            </linearGradient>
            <linearGradient id="mf-jacket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a5a45" />
              <stop offset="100%" stopColor="#1a3025" />
            </linearGradient>
            <linearGradient id="mf-pants" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2a2a3a" />
              <stop offset="100%" stopColor="#15151f" />
            </linearGradient>
            <linearGradient id="mf-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5d8b0" />
              <stop offset="100%" stopColor="#d4b890" />
            </linearGradient>
            <linearGradient id="mf-hoodie-shine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          <g transform="translate(200, 100)">
            {/* Subtle backlight glow */}
            <ellipse cx="0" cy="350" rx="170" ry="380" fill="#5a3a1a" opacity="0.05" />

            {/* Shadow at feet */}
            <ellipse cx="0" cy="785" rx="75" ry="9" fill="#000" opacity="0.45" />

            {/* Pants - left leg */}
            <path
              d="M-24 540 L-30 720 Q-30 745 -20 748 L-8 748 Q-5 745 -5 720 L-5 540 Z"
              fill="url(#mf-pants)"
            />
            {/* Pants - right leg */}
            <path
              d="M5 540 L5 720 Q5 745 8 748 L20 748 Q30 745 30 720 L24 540 Z"
              fill="url(#mf-pants)"
            />

            {/* Pants highlights / folds */}
            <path d="M-16 560 Q-18 640 -15 720" stroke="#4a4a5a" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M16 560 Q18 640 15 720" stroke="#4a4a5a" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M-22 620 Q-25 680 -22 730" stroke="#4a4a5a" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M22 620 Q25 680 22 730" stroke="#4a4a5a" strokeWidth="0.5" fill="none" opacity="0.3" />

            {/* Belt line */}
            <path d="M-30 540 L30 540" stroke="#0a0a14" strokeWidth="2" opacity="0.6" />

            {/* Left sneaker */}
            <path
              d="M-32 748 Q-34 762 -24 765 L-5 765 Q-5 755 -5 748 L-5 743 Z"
              fill="#f0e8d8"
            />
            <path d="M-30 760 Q-20 762 -5 762" stroke="#8a7a5a" strokeWidth="0.6" fill="none" />
            <ellipse cx="-25" cy="765" rx="8" ry="1.2" fill="#3a3a3a" opacity="0.5" />

            {/* Right sneaker */}
            <path
              d="M5 743 L5 748 Q5 755 5 765 L24 765 Q34 762 32 748 Z"
              fill="#f0e8d8"
            />
            <path d="M5 762 Q20 762 30 760" stroke="#8a7a5a" strokeWidth="0.6" fill="none" />
            <ellipse cx="25" cy="765" rx="8" ry="1.2" fill="#3a3a3a" opacity="0.5" />

            {/* Hoodie body */}
            <path
              d="M-46 290 Q-52 360 -50 430 L-44 540 L44 540 L50 430 Q52 360 46 290 Z"
              fill="url(#mf-hoodie)"
            />

            {/* Hoodie shine on the left side */}
            <path
              d="M-42 300 Q-44 400 -42 530 L-32 530 Q-30 400 -30 300 Z"
              fill="url(#mf-hoodie-shine)"
            />

            {/* Hoodie folds */}
            <path d="M-32 320 Q-34 400 -32 510" stroke="#b8a888" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M32 320 Q34 400 32 510" stroke="#b8a888" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M-18 380 Q-15 460 -10 530" stroke="#b8a888" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M18 380 Q15 460 10 530" stroke="#b8a888" strokeWidth="0.5" fill="none" opacity="0.3" />
            <path d="M-26 460 Q-22 500 -18 535" stroke="#8a7a5a" strokeWidth="0.5" fill="none" opacity="0.4" />
            <path d="M26 460 Q22 500 18 535" stroke="#8a7a5a" strokeWidth="0.5" fill="none" opacity="0.4" />

            {/* Front pocket (kangaroo pouch) */}
            <path
              d="M-26 400 L-30 470 L30 470 L26 400 Q15 405 0 405 Q-15 405 -26 400 Z"
              fill="none"
              stroke="#a89878"
              strokeWidth="0.8"
              opacity="0.6"
            />

            {/* Hoodie neckline */}
            <path
              d="M-15 290 Q-10 308 0 312 Q10 308 15 290"
              fill="#b8a888"
              opacity="0.7"
            />
            <path
              d="M-15 290 Q-10 308 0 312 Q10 308 15 290"
              fill="none"
              stroke="#8a7a5a"
              strokeWidth="1"
            />

            {/* Hoodie drawstrings */}
            <path d="M-5 295 L-6 335" stroke="#c8b890" strokeWidth="0.9" fill="none" />
            <path d="M5 295 L6 335" stroke="#c8b890" strokeWidth="0.9" fill="none" />
            <circle cx="-6" cy="335" r="1.3" fill="#8a7a5a" />
            <circle cx="6" cy="335" r="1.3" fill="#8a7a5a" />

            {/* Green jacket tied at waist - left tail */}
            <path
              d="M-44 455 L-58 510 L-52 545 L-38 540 L-32 480 Z"
              fill="url(#mf-jacket)"
            />
            {/* Green jacket tied at waist - right tail */}
            <path
              d="M44 455 L58 510 L52 545 L38 540 L32 480 Z"
              fill="url(#mf-jacket)"
            />

            {/* Jacket knot/bow at center waist */}
            <ellipse cx="0" cy="475" rx="20" ry="9" fill="url(#mf-jacket)" />
            <path d="M-18 470 L-28 478 L-22 488 Z" fill="url(#mf-jacket)" />
            <path d="M18 470 L28 478 L22 488 Z" fill="url(#mf-jacket)" />
            <ellipse cx="0" cy="475" rx="6" ry="4" fill="#0a1a12" opacity="0.6" />

            {/* Jacket folds */}
            <path d="M-50 495 L-44 535" stroke="#0a1a12" strokeWidth="0.6" fill="none" opacity="0.6" />
            <path d="M50 495 L44 535" stroke="#0a1a12" strokeWidth="0.6" fill="none" opacity="0.6" />
            <path d="M-54 510 L-50 535" stroke="#5a8a6a" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M54 510 L50 535" stroke="#5a8a6a" strokeWidth="0.4" fill="none" opacity="0.5" />

            {/* Left arm (in hoodie sleeve) */}
            <path
              d="M-46 305 Q-66 360 -68 420 Q-65 460 -55 480 L-46 470 Q-50 430 -52 400 Q-50 360 -42 320 Z"
              fill="url(#mf-hoodie)"
            />
            {/* Right arm */}
            <path
              d="M46 305 Q66 360 68 420 Q65 460 55 480 L46 470 Q50 430 52 400 Q50 360 42 320 Z"
              fill="url(#mf-hoodie)"
            />

            {/* Sleeve cuff details */}
            <ellipse cx="-58" cy="468" rx="14" ry="5" fill="#a89878" opacity="0.5" />
            <ellipse cx="58" cy="468" rx="14" ry="5" fill="#a89878" opacity="0.5" />

            {/* Hands */}
            <ellipse cx="-58" cy="480" rx="6" ry="8" fill="url(#mf-skin)" />
            <ellipse cx="58" cy="480" rx="6" ry="8" fill="url(#mf-skin)" />
            <path d="M-62 478 Q-60 484 -56 484" stroke="#a08868" strokeWidth="0.4" fill="none" />
            <path d="M62 478 Q60 484 56 484" stroke="#a08868" strokeWidth="0.4" fill="none" />

            {/* Neck */}
            <path
              d="M-11 258 L-13 298 L13 298 L11 258 Z"
              fill="url(#mf-skin)"
            />
            <path d="M-11 260 Q0 264 11 260" stroke="#a08868" strokeWidth="0.5" fill="none" opacity="0.6" />

            {/* Head */}
            <path
              d="M-32 175 Q-35 218 -32 248 Q-25 268 0 270 Q25 268 32 248 Q35 218 32 175 Q25 155 0 152 Q-25 155 -32 175 Z"
              fill="url(#mf-skin)"
            />

            {/* Hair - main mass (messy/tousled) */}
            <path
              d="M-36 200
                 Q-40 168 -28 145
                 Q-15 125 0 128
                 Q15 125 28 145
                 Q40 168 36 200
                 Q33 178 22 168
                 Q5 165 -5 165
                 Q-22 168 -33 178
                 Q-36 188 -36 200 Z"
              fill="url(#mf-hair)"
            />

            {/* Hair - top messy spikes */}
            <path
              d="M-18 130 Q-10 118 0 122 Q10 116 22 130"
              stroke="#3a2510"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M-25 145 Q-15 135 -5 140 Q8 135 25 145"
              stroke="#5a3a1a"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              opacity="0.7"
            />

            {/* Hair - bangs sweeping over forehead */}
            <path
              d="M-30 178
                 Q-25 162 -15 168
                 Q-5 162 5 166
                 Q15 162 25 168
                 Q30 175 32 185
                 Q22 175 12 180
                 Q2 175 -8 180
                 Q-18 175 -30 178 Z"
              fill="url(#mf-hair)"
            />

            {/* Hair - side strands falling down */}
            <path
              d="M-32 200 Q-36 225 -32 248 L-28 228 Q-26 208 -28 195 Z"
              fill="url(#mf-hair)"
            />
            <path
              d="M32 200 Q36 225 32 248 L28 228 Q26 208 28 195 Z"
              fill="url(#mf-hair)"
            />

            {/* Hair highlight */}
            <path
              d="M-20 148 Q-5 142 15 148"
              stroke="#a8703a"
              strokeWidth="1.4"
              fill="none"
              opacity="0.6"
              strokeLinecap="round"
            />
            <path
              d="M-12 138 Q0 134 12 138"
              stroke="#c89060"
              strokeWidth="0.8"
              fill="none"
              opacity="0.4"
            />

            {/* Eyebrows - relaxed */}
            <path d="M-22 200 Q-15 196 -8 200" stroke="#3a2515" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            <path d="M22 200 Q15 196 8 200" stroke="#3a2515" strokeWidth="1.5" fill="none" strokeLinecap="round" />

            {/* Eyes */}
            <path
              d="M-20 215 Q-15 212 -10 215 Q-15 218 -20 215 Z"
              fill="#1a0a0a"
            />
            <circle cx="-15" cy="214" r="1.6" fill="#5a3a2a" />
            <circle cx="-13" cy="213" r="0.6" fill="#fff" opacity="0.95" />
            <path
              d="M10 215 Q15 212 20 215 Q15 218 10 215 Z"
              fill="#1a0a0a"
            />
            <circle cx="15" cy="214" r="1.6" fill="#5a3a2a" />
            <circle cx="17" cy="213" r="0.6" fill="#fff" opacity="0.95" />

            {/* Under-eye line */}
            <path d="M-19 218 Q-15 220 -11 218" stroke="#a08868" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M11 218 Q15 220 19 218" stroke="#a08868" strokeWidth="0.4" fill="none" opacity="0.5" />

            {/* Nose hint */}
            <path
              d="M-2 228 Q0 236 2 228"
              stroke="#a08868"
              strokeWidth="0.6"
              fill="none"
            />
            <path d="M-1 232 Q0 234 1 232" stroke="#8a6850" strokeWidth="0.4" fill="none" opacity="0.5" />

            {/* Mouth - slight smile */}
            <path
              d="M-8 248 Q0 252 8 248"
              stroke="#7a4a3a"
              strokeWidth="1.3"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M-6 248 Q0 250 6 248"
              fill="#c89080"
              opacity="0.5"
            />

            {/* Cheek blush */}
            <ellipse cx="-23" cy="234" rx="5" ry="3" fill="#d8a090" opacity="0.3" />
            <ellipse cx="23" cy="234" rx="5" ry="3" fill="#d8a090" opacity="0.3" />

            {/* Ear hint */}
            <ellipse cx="-32" cy="218" rx="2.5" ry="7" fill="url(#mf-skin)" />
            <ellipse cx="32" cy="218" rx="2.5" ry="7" fill="url(#mf-skin)" />
            <path d="M-32 215 Q-33 218 -32 222" stroke="#a08868" strokeWidth="0.4" fill="none" />
            <path d="M32 215 Q33 218 32 222" stroke="#a08868" strokeWidth="0.4" fill="none" />
          </g>

          {/* Name label */}
          <text x="200" y="870" textAnchor="middle" fill="#5a4530" fontSize="13" fontFamily="serif" letterSpacing="4" opacity="0.85">
            路明非 · LUMINGFEI
          </text>
        </svg>
      </div>

      {/* Right portrait - Chen Motong / Nono (陈墨瞳) */}
      <div className="portrait-right">
        {/* Fade to transparent toward center */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-l from-transparent to-[#f0e6d2] z-10" />

        <svg
          viewBox="0 0 400 900"
          className="h-full w-auto"
          preserveAspectRatio="xMaxYMid slice"
        >
          <defs>
            <linearGradient id="nn-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e84a3a" />
              <stop offset="45%" stopColor="#b82828" />
              <stop offset="100%" stopColor="#5a1010" />
            </linearGradient>
            <linearGradient id="nn-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#d83838" />
              <stop offset="45%" stopColor="#a82020" />
              <stop offset="100%" stopColor="#3a0808" />
            </linearGradient>
            <linearGradient id="nn-dress-shine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ff6868" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#ff6868" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nn-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fae0c0" />
              <stop offset="100%" stopColor="#d4b890" />
            </linearGradient>
            <radialGradient id="nn-aura" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0%" stopColor="#d83838" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#d83838" stopOpacity="0" />
            </radialGradient>
          </defs>

          <g transform="translate(200, 100)">
            {/* Red aura behind */}
            <ellipse cx="0" cy="350" rx="210" ry="460" fill="url(#nn-aura)" />

            {/* Shadow at feet */}
            <ellipse cx="0" cy="785" rx="68" ry="9" fill="#000" opacity="0.45" />

            {/* Legs - long and elegant */}
            <path
              d="M-16 540 Q-20 620 -22 700 L-14 745 L-3 745 Q-2 700 -2 620 L-2 540 Z"
              fill="url(#nn-skin)"
            />
            <path
              d="M2 540 L2 620 Q2 700 3 745 L14 745 L22 700 Q20 620 16 540 Z"
              fill="url(#nn-skin)"
            />

            {/* Leg highlights */}
            <path d="M-10 560 Q-12 640 -10 720" stroke="#f5d8b0" strokeWidth="1.2" fill="none" opacity="0.6" />
            <path d="M10 560 Q12 640 10 720" stroke="#fae0c0" strokeWidth="1.2" fill="none" opacity="0.6" />

            {/* High heel shoes */}
            <path d="M-18 745 L-22 760 L-14 762 L-3 762 L-3 745 Z" fill="#1a0808" />
            <path d="M3 745 L3 762 L14 762 L22 760 L18 745 Z" fill="#1a0808" />
            {/* Heel */}
            <path d="M-20 760 L-23 778 L-19 778 L-18 762 Z" fill="#1a0808" />
            <path d="M20 760 L18 778 L23 778 L20 762 Z" fill="#1a0808" />
            {/* Shoe shine */}
            <path d="M-15 750 L-5 750" stroke="#5a1010" strokeWidth="0.6" />
            <path d="M5 750 L15 750" stroke="#5a1010" strokeWidth="0.6" />

            {/* Long dress - upper body */}
            <path
              d="M-32 290 Q-38 360 -34 440 L-32 540 L32 540 L34 440 Q38 360 32 290 Z"
              fill="url(#nn-dress)"
            />

            {/* Dress shine on the left side */}
            <path
              d="M-28 300 Q-26 400 -22 530 L-16 530 Q-12 400 -10 300 Z"
              fill="url(#nn-dress-shine)"
            />

            {/* Dress neckline - elegant V */}
            <path
              d="M-13 290 L-2 322 L2 322 L13 290 Z"
              fill="url(#nn-skin)"
            />
            <path d="M-13 290 L-2 322 L2 322 L13 290" fill="none" stroke="#5a1010" strokeWidth="0.8" />

            {/* Dress upper folds */}
            <path d="M-22 320 Q-26 400 -26 520" stroke="#5a1010" strokeWidth="0.6" fill="none" opacity="0.5" />
            <path d="M22 320 Q26 400 26 520" stroke="#5a1010" strokeWidth="0.6" fill="none" opacity="0.5" />
            <path d="M-12 340 Q-10 440 -8 530" stroke="#ff4040" strokeWidth="0.4" fill="none" opacity="0.4" />
            <path d="M12 340 Q10 440 8 530" stroke="#ff4040" strokeWidth="0.4" fill="none" opacity="0.4" />

            {/* Decorative red gem on chest */}
            <path
              d="M0 360 L-6 370 L0 380 L6 370 Z"
              fill="#c92828"
              stroke="#5a1010"
              strokeWidth="0.6"
            />
            <path d="M-2 367 L0 370 L2 367" fill="#ff6868" opacity="0.7" />

            {/* Dress flowing skirt - left */}
            <path
              d="M-32 540
                 Q-42 605 -52 700
                 Q-58 740 -48 760
                 L-26 760
                 Q-22 720 -20 680
                 L-16 540 Z"
              fill="url(#nn-dress)"
            />

            {/* Dress flowing skirt - right */}
            <path
              d="M32 540
                 Q42 605 52 700
                 Q58 740 48 760
                 L26 760
                 Q22 720 20 680
                 L16 540 Z"
              fill="url(#nn-dress)"
            />

            {/* Dress center front */}
            <path
              d="M-16 540 L-16 700 L-6 760 L6 760 L16 700 L16 540 Z"
              fill="url(#nn-dress)"
            />

            {/* Dress slit reveal - left leg shows through */}
            <path
              d="M-10 600 L-13 700 L-6 745 L-2 700 L-3 600 Z"
              fill="url(#nn-skin)"
              opacity="0.95"
            />

            {/* Dress folds on skirt */}
            <path d="M-22 560 Q-30 640 -38 740" stroke="#3a0808" strokeWidth="0.8" fill="none" opacity="0.7" />
            <path d="M22 560 Q30 640 38 740" stroke="#3a0808" strokeWidth="0.8" fill="none" opacity="0.7" />
            <path d="M0 555 L0 750" stroke="#3a0808" strokeWidth="0.6" fill="none" opacity="0.5" />
            <path d="M-8 580 Q-12 660 -15 730" stroke="#ff3030" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M8 580 Q12 660 15 730" stroke="#ff3030" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M-30 600 Q-38 680 -45 750" stroke="#ff3030" strokeWidth="0.3" fill="none" opacity="0.4" />
            <path d="M30 600 Q38 680 45 750" stroke="#ff3030" strokeWidth="0.3" fill="none" opacity="0.4" />

            {/* Dress hem - ruffled edge */}
            <path
              d="M-48 755 Q-42 762 -36 755 Q-30 762 -24 755 Q-18 762 -12 755 Q-6 762 0 755 Q6 762 12 755 Q18 762 24 755 Q30 762 36 755 Q42 762 48 755"
              stroke="#3a0808"
              strokeWidth="1.1"
              fill="none"
            />
            <path
              d="M-46 760 Q-40 766 -34 760 Q-28 766 -22 760 Q-16 766 -10 760 Q-4 766 2 760 Q8 766 14 760 Q20 766 26 760 Q32 766 38 760 Q44 766 46 760"
              stroke="#5a1010"
              strokeWidth="0.6"
              fill="none"
              opacity="0.7"
            />

            {/* Left arm */}
            <path
              d="M-32 295 Q-50 360 -56 420 Q-54 460 -44 480 L-34 470 Q-40 430 -42 400 Q-40 360 -30 310 Z"
              fill="url(#nn-skin)"
            />
            {/* Right arm */}
            <path
              d="M32 295 Q50 360 56 420 Q54 460 44 480 L34 470 Q40 430 42 400 Q40 360 30 310 Z"
              fill="url(#nn-skin)"
            />

            {/* Arm highlights */}
            <path d="M-38 320 Q-46 380 -48 440" stroke="#fae0c0" strokeWidth="0.8" fill="none" opacity="0.5" />
            <path d="M38 320 Q46 380 48 440" stroke="#fae0c0" strokeWidth="0.8" fill="none" opacity="0.5" />

            {/* Hands */}
            <ellipse cx="-44" cy="478" rx="5.5" ry="7.5" fill="url(#nn-skin)" />
            <ellipse cx="44" cy="478" rx="5.5" ry="7.5" fill="url(#nn-skin)" />
            <path d="M-48 476 Q-46 482 -42 482" stroke="#a08868" strokeWidth="0.4" fill="none" />
            <path d="M48 476 Q46 482 42 482" stroke="#a08868" strokeWidth="0.4" fill="none" />

            {/* Neck */}
            <path
              d="M-9 250 L-11 295 L11 295 L9 250 Z"
              fill="url(#nn-skin)"
            />
            <path d="M-9 252 Q0 256 9 252" stroke="#a08868" strokeWidth="0.4" fill="none" opacity="0.5" />

            {/* Hair back - flowing down */}
            <path
              d="M-30 175
                 Q-40 220 -44 280
                 Q-50 360 -54 440
                 Q-58 520 -60 600
                 Q-62 680 -56 740
                 L-40 740
                 Q-38 680 -36 600
                 Q-32 520 -30 440
                 Q-26 360 -22 280
                 Q-20 220 -22 180
                 Z"
              fill="url(#nn-hair)"
            />
            <path
              d="M30 175
                 Q40 220 44 280
                 Q50 360 54 440
                 Q58 520 60 600
                 Q62 680 56 740
                 L40 740
                 Q38 680 36 600
                 Q32 520 30 440
                 Q26 360 22 280
                 Q20 220 22 180
                 Z"
              fill="url(#nn-hair)"
            />

            {/* Hair back flow strands */}
            <path d="M-50 350 Q-55 460 -56 600" stroke="#3a0808" strokeWidth="0.6" fill="none" opacity="0.6" />
            <path d="M-44 280 Q-48 380 -50 500" stroke="#5a1010" strokeWidth="0.5" fill="none" opacity="0.5" />
            <path d="M50 350 Q55 460 56 600" stroke="#3a0808" strokeWidth="0.6" fill="none" opacity="0.6" />
            <path d="M44 280 Q48 380 50 500" stroke="#5a1010" strokeWidth="0.5" fill="none" opacity="0.5" />
            <path d="M-52 480 Q-56 580 -54 680" stroke="#ff4040" strokeWidth="0.3" fill="none" opacity="0.4" />
            <path d="M52 480 Q56 580 54 680" stroke="#ff4040" strokeWidth="0.3" fill="none" opacity="0.4" />

            {/* Head */}
            <path
              d="M-28 175
                 Q-30 220 -26 250
                 Q-18 268 0 270
                 Q18 268 26 250
                 Q30 220 28 175
                 Q22 158 0 155
                 Q-22 158 -28 175 Z"
              fill="url(#nn-skin)"
            />

            {/* Hair top - voluminous */}
            <path
              d="M-32 178
                 Q-34 145 -22 130
                 Q-10 116 0 120
                 Q10 116 22 130
                 Q34 145 32 178
                 Q28 160 18 152
                 Q5 148 -5 148
                 Q-18 152 -28 160
                 Q-32 168 -32 178 Z"
              fill="url(#nn-hair)"
            />

            {/* Hair bangs - side swept over forehead */}
            <path
              d="M-28 175
                 Q-25 158 -15 165
                 Q-5 158 5 162
                 Q15 158 25 165
                 Q30 168 30 178
                 Q22 175 12 178
                 Q2 175 -8 178
                 Q-18 175 -28 175 Z"
              fill="url(#nn-hair)"
            />

            {/* Front face-framing hair strand */}
            <path
              d="M-22 152 Q-15 145 -8 150 Q-3 145 2 148"
              stroke="#7a1818"
              strokeWidth="1.5"
              fill="none"
              opacity="0.8"
              strokeLinecap="round"
            />

            {/* Hair highlights */}
            <path
              d="M-15 142 Q-5 138 12 142"
              stroke="#ff6b4a"
              strokeWidth="1.2"
              fill="none"
              opacity="0.5"
              strokeLinecap="round"
            />
            <path
              d="M-25 165 Q-10 160 5 165"
              stroke="#ff8868"
              strokeWidth="0.9"
              fill="none"
              opacity="0.4"
            />
            <path
              d="M5 200 Q15 250 12 300"
              stroke="#ff6b4a"
              strokeWidth="0.5"
              fill="none"
              opacity="0.3"
            />

            {/* Eyebrows - confident arch */}
            <path d="M-20 198 Q-12 192 -4 196" stroke="#3a0808" strokeWidth="1.9" fill="none" strokeLinecap="round" />
            <path d="M20 198 Q12 192 4 196" stroke="#3a0808" strokeWidth="1.9" fill="none" strokeLinecap="round" />

            {/* Eyes - larger, more expressive */}
            <path
              d="M-20 215 Q-15 209 -10 215 Q-15 221 -20 215 Z"
              fill="#1a0808"
            />
            <circle cx="-15" cy="214" r="2.2" fill="#5a1010" />
            <circle cx="-13" cy="213" r="0.8" fill="#fff" opacity="0.95" />
            <path
              d="M10 215 Q15 209 20 215 Q15 221 10 215 Z"
              fill="#1a0808"
            />
            <circle cx="15" cy="214" r="2.2" fill="#5a1010" />
            <circle cx="17" cy="213" r="0.8" fill="#fff" opacity="0.95" />

            {/* Eyelashes - top */}
            <path d="M-19 211 Q-15 208 -11 211" stroke="#1a0808" strokeWidth="0.9" fill="none" strokeLinecap="round" />
            <path d="M11 211 Q15 208 19 211" stroke="#1a0808" strokeWidth="0.9" fill="none" strokeLinecap="round" />

            {/* Under-eye line */}
            <path d="M-19 219 Q-15 222 -11 219" stroke="#a08868" strokeWidth="0.4" fill="none" opacity="0.5" />
            <path d="M11 219 Q15 222 19 219" stroke="#a08868" strokeWidth="0.4" fill="none" opacity="0.5" />

            {/* Nose hint */}
            <path
              d="M-1 225 Q0 234 1 225"
              stroke="#a08868"
              strokeWidth="0.6"
              fill="none"
            />

            {/* Lips */}
            <path
              d="M-8 243 Q0 240 8 243"
              fill="#a82020"
              opacity="0.85"
            />
            <path
              d="M-7 244 Q0 247 7 244"
              fill="#e84040"
            />
            <path
              d="M-7 244 Q0 252 7 244"
              stroke="#7a1010"
              strokeWidth="0.7"
              fill="none"
            />
            {/* Lip highlight */}
            <path d="M-4 242 Q0 241 4 242" stroke="#ff6b6b" strokeWidth="0.4" fill="none" opacity="0.7" />

            {/* Cheek blush */}
            <ellipse cx="-23" cy="232" rx="5" ry="3" fill="#e89090" opacity="0.35" />
            <ellipse cx="23" cy="232" rx="5" ry="3" fill="#e89090" opacity="0.35" />

            {/* Earrings - red gem */}
            <circle cx="-31" cy="226" r="2.2" fill="#c92828" />
            <circle cx="31" cy="226" r="2.2" fill="#c92828" />
            <circle cx="-30" cy="225" r="0.7" fill="#ff6b4a" />
            <circle cx="32" cy="225" r="0.7" fill="#ff6b4a" />
            <circle cx="-31" cy="228" r="0.5" fill="#5a1010" opacity="0.6" />
            <circle cx="31" cy="228" r="0.5" fill="#5a1010" opacity="0.6" />
          </g>

          {/* Name label */}
          <text x="200" y="870" textAnchor="middle" fill="#5a4530" fontSize="13" fontFamily="serif" letterSpacing="4" opacity="0.85">
            陈墨瞳 · NONO
          </text>
        </svg>
      </div>
    </div>
  )
}
