export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Gothic background scene */}
      <div className="absolute inset-0 flex items-center justify-center opacity-35">
        <svg
          viewBox="0 0 1200 900"
          className="w-full h-full max-w-none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Glow for dragon eye */}
            <radialGradient id="eyeGlow">
              <stop offset="0%" stopColor="#8b2020" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8b2020" stopOpacity="0" />
            </radialGradient>
            {/* Dragon body gradient - lighter than background */}
            <linearGradient id="dragonBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a1515" />
              <stop offset="100%" stopColor="#1a0808" />
            </linearGradient>
          </defs>

          {/* Pointed gothic arch - outer */}
          <path
            d="M250 850 L250 350 Q250 130 400 80 L600 0 L800 80 Q950 130 950 350 L950 850"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="3"
            opacity="0.8"
          />
          {/* Inner arch */}
          <path
            d="M300 850 L300 370 Q300 170 420 130 L600 60 L780 130 Q900 170 900 370 L900 850"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1.5"
            opacity="0.5"
          />

          {/* Rose window */}
          <circle cx="600" cy="160" r="55" fill="none" stroke="#c9a84c" strokeWidth="1.5" opacity="0.7" />
          <circle cx="600" cy="160" r="40" fill="none" stroke="#c9a84c" strokeWidth="0.8" opacity="0.4" />
          <circle cx="600" cy="160" r="20" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
            <line
              key={angle}
              x1="600"
              y1="160"
              x2={600 + 50 * Math.cos((angle * Math.PI) / 180)}
              y2={160 + 50 * Math.sin((angle * Math.PI) / 180)}
              stroke="#c9a84c"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Nidhogg Dragon - large, dark but visible */}
          <g transform="translate(600, 500)">
            {/* Body */}
            <path
              d="M0 100 Q-40 50 -70 10 Q-90 -20 -100 -50 Q-85 -15 -60 20 Q-40 50 -20 70
                 L0 100 L0 100 Z"
              fill="url(#dragonBody)"
              stroke="#5a2a2a"
              strokeWidth="1"
            />
            {/* Left wing - massive spread */}
            <path
              d="M-30 50 Q-80 -10 -160 -70 Q-220 -120 -290 -150 Q-250 -100 -200 -60 Q-130 -5 -60 40 L-30 50 Z"
              fill="url(#dragonBody)"
              stroke="#5a2a2a"
              strokeWidth="1"
            />
            {/* Wing membrane lines - left */}
            <path d="M-50 30 Q-120 -30 -200 -80" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            <path d="M-55 40 Q-130 -10 -220 -50" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            <path d="M-50 50 Q-100 10 -180 -20" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            {/* Right wing */}
            <path
              d="M-20 60 Q40 -10 120 -70 Q180 -120 250 -150 Q210 -100 160 -60 Q100 -5 30 50 L-20 60 Z"
              fill="url(#dragonBody)"
              stroke="#5a2a2a"
              strokeWidth="1"
            />
            {/* Wing membrane lines - right */}
            <path d="M0 40 Q70 -30 160 -80" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            <path d="M5 50 Q90 -10 180 -50" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            <path d="M0 60 Q60 10 140 -20" fill="none" stroke="#4a1a1a" strokeWidth="0.5" />
            {/* Tail */}
            <path
              d="M-60 10 Q-120 -10 -180 0 Q-240 10 -280 30 Q-220 15 -160 5 Q-100 -5 -60 20 Z"
              fill="url(#dragonBody)"
              stroke="#5a2a2a"
              strokeWidth="0.8"
            />
            {/* Head */}
            <path
              d="M-95 -45 Q-120 -60 -130 -50 Q-115 -40 -100 -35 Q-90 -48 -95 -45 Z"
              fill="url(#dragonBody)"
              stroke="#5a2a2a"
              strokeWidth="1"
            />
            <ellipse cx="-100" cy="-48" rx="20" ry="14" fill="url(#dragonBody)" stroke="#5a2a2a" strokeWidth="1" />
            {/* Jaw */}
            <path
              d="M-118 -42 Q-125 -32 -110 -28"
              fill="none"
              stroke="#5a2a2a"
              strokeWidth="1"
            />
            {/* Eye */}
            <circle cx="-105" cy="-52" r="4" fill="#8b2020" />
            <circle cx="-105" cy="-52" r="10" fill="url(#eyeGlow)" />
            {/* Teeth */}
            <path d="M-115 -38 L-112 -33 L-109 -37 L-106 -32 L-103 -36" fill="none" stroke="#5a2a2a" strokeWidth="0.6" />
            {/* Neck spines */}
            <path
              d="M-82 -56 L-76 -68 L-70 -58 L-62 -70 L-56 -56 L-48 -65 L-42 -52"
              fill="none"
              stroke="#5a2a2a"
              strokeWidth="0.8"
            />
            {/* Chest scales hint */}
            <path d="M-60 20 Q-70 30 -65 40" fill="none" stroke="#4a1a1a" strokeWidth="0.4" />
            <path d="M-50 25 Q-60 35 -55 45" fill="none" stroke="#4a1a1a" strokeWidth="0.4" />
          </g>

          {/* Three spears piercing the dragon */}
          <g stroke="#c9a84c" strokeWidth="2.5" opacity="0.8">
            {/* Spear 1 - upper left to lower right */}
            <line x1="380" y1="320" x2="750" y2="620" />
            <path d="M380 320 L365 305 L372 315 Z" fill="#c9a84c" />
            {/* Spear 2 - upper right to lower left */}
            <line x1="820" y1="360" x2="450" y2="600" />
            <path d="M820 360 L835 345 L828 355 Z" fill="#c9a84c" />
            {/* Spear 3 - vertical through head */}
            <line x1="530" y1="250" x2="530" y2="680" />
            <path d="M530 250 L520 235 L526 247 Z" fill="#c9a84c" />
          </g>

          {/* Blood from wounds */}
          <g fill="#6b1515" opacity="0.7">
            <circle cx="530" cy="690" r="5" />
            <circle cx="527" cy="705" r="3" />
            <circle cx="534" cy="715" r="2" />
            <circle cx="400" cy="630" r="4" />
            <circle cx="395" cy="645" r="2.5" />
            <circle cx="740" cy="635" r="3.5" />
            <circle cx="745" cy="650" r="2" />
          </g>

          {/* Gothic pillars */}
          <rect x="180" y="350" width="35" height="550" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="1" opacity="0.5" />
          <rect x="240" y="420" width="20" height="480" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
          <rect x="980" y="350" width="35" height="550" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="1" opacity="0.5" />
          <rect x="940" y="420" width="20" height="480" fill="#1a0a0a" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />

          {/* Dark vignette edges */}
          <radialGradient id="vig">
            <stop offset="55%" stopColor="transparent" />
            <stop offset="100%" stopColor="#000" stopOpacity="0.7" />
          </radialGradient>
          <rect width="1200" height="900" fill="url(#vig)" />
        </svg>
      </div>
    </div>
  )
}
