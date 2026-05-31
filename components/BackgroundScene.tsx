export default function BackgroundScene() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dark red atmospheric overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0505] via-[#1a0a0a] to-[#0a0305] opacity-90" />

      {/* Gothic arch window frame */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] blur-[1px]">
        <svg
          viewBox="0 0 1200 900"
          className="w-full h-full max-w-none"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Pointed gothic arch */}
          <path
            d="M300 850 L300 350 Q300 150 400 100 L600 20 L800 100 Q900 150 900 350 L900 850"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="2"
          />
          {/* Inner arch */}
          <path
            d="M340 850 L340 370 Q340 200 420 155 L600 85 L780 155 Q860 200 860 370 L860 850"
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1"
            opacity="0.5"
          />
          {/* Rose window circle */}
          <circle cx="600" cy="180" r="50" fill="none" stroke="#c9a84c" strokeWidth="1" />
          <circle cx="600" cy="180" r="35" fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
          {/* Rose window spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <line
              key={angle}
              x1="600"
              y1="180"
              x2={600 + 48 * Math.cos((angle * Math.PI) / 180)}
              y2={180 + 48 * Math.sin((angle * Math.PI) / 180)}
              stroke="#c9a84c"
              strokeWidth="0.5"
              opacity="0.4"
            />
          ))}

          {/* Dragon silhouette - Nidhogg */}
          <g transform="translate(600, 480)" opacity="0.9">
            {/* Body */}
            <path
              d="M0 80 Q-30 40 -60 0 Q-80 -30 -100 -60 Q-90 -20 -70 10 Q-50 40 -30 60 L0 80 Z"
              fill="#1a0a0a"
              stroke="#3a1a1a"
              strokeWidth="0.5"
            />
            {/* Right wing */}
            <path
              d="M-20 40 Q-80 -20 -180 -100 Q-220 -140 -260 -150 Q-220 -120 -180 -80 Q-120 -20 -80 20 L-20 40 Z"
              fill="#1a0a0a"
              stroke="#3a1a1a"
              strokeWidth="0.5"
            />
            {/* Left wing */}
            <path
              d="M-20 40 Q40 -10 120 -80 Q160 -120 200 -130 Q160 -100 120 -70 Q60 -20 10 30 L-20 40 Z"
              fill="#1a0a0a"
              stroke="#3a1a1a"
              strokeWidth="0.5"
            />
            {/* Tail */}
            <path
              d="M-50 -10 Q-90 -30 -140 -20 Q-180 -10 -210 10 Q-170 0 -130 -5 Q-90 -10 -50 10 Z"
              fill="#1a0a0a"
              stroke="#3a1a1a"
              strokeWidth="0.5"
            />
            {/* Head */}
            <ellipse cx="-85" cy="-55" rx="18" ry="12" fill="#1a0a0a" stroke="#3a1a1a" strokeWidth="0.5" />
            {/* Eye */}
            <circle cx="-90" cy="-58" r="3" fill="#4a1010" />
            {/* Jaw */}
            <path
              d="M-100 -48 Q-105 -40 -95 -38"
              fill="none"
              stroke="#3a1a1a"
              strokeWidth="0.8"
            />
            {/* Neck spines */}
            <path
              d="M-72 -62 L-68 -72 L-62 -65 L-56 -74 L-50 -64"
              fill="none"
              stroke="#3a1a1a"
              strokeWidth="0.6"
            />
          </g>

          {/* Spears pinning the dragon */}
          <g stroke="#8b6b5a" strokeWidth="1.5" opacity="0.7">
            {/* First spear - diagonal */}
            <line x1="420" y1="350" x2="780" y2="600" />
            <line x1="415" y1="355" x2="785" y2="595" strokeWidth="0.5" />
            {/* Spear head 1 */}
            <path d="M420 350 L408 338 L416 345 Z" fill="#8b6b5a" />

            {/* Second spear - opposite diagonal */}
            <line x1="780" y1="380" x2="420" y2="580" />
            <line x1="775" y1="385" x2="425" y2="575" strokeWidth="0.5" />
            {/* Spear head 2 */}
            <path d="M780 380 L792 368 L784 375 Z" fill="#8b6b5a" />

            {/* Third spear - vertical through center */}
            <line x1="560" y1="280" x2="560" y2="650" />
            <line x1="557" y1="285" x2="557" y2="645" strokeWidth="0.5" />
            {/* Spear head 3 */}
            <path d="M560 280 L552 268 L556 276 Z" fill="#8b6b5a" />
          </g>

          {/* Blood drips */}
          <g fill="#3a0a0a" opacity="0.6">
            <circle cx="560" cy="660" r="3" />
            <circle cx="558" cy="670" r="2" />
            <circle cx="563" cy="685" r="1.5" />
            <circle cx="430" cy="590" r="2" />
            <circle cx="770" cy="610" r="2.5" />
          </g>

          {/* Gothic pillars left */}
          <rect x="200" y="400" width="30" height="500" fill="#1a0a0a" stroke="#2a1515" strokeWidth="0.5" />
          <rect x="250" y="450" width="20" height="450" fill="#1a0a0a" stroke="#2a1515" strokeWidth="0.5" opacity="0.6" />

          {/* Gothic pillars right */}
          <rect x="970" y="400" width="30" height="500" fill="#1a0a0a" stroke="#2a1515" strokeWidth="0.5" />
          <rect x="930" y="450" width="20" height="450" fill="#1a0a0a" stroke="#2a1515" strokeWidth="0.5" opacity="0.6" />

          {/* Vignette effect - dark corners */}
          <defs>
            <radialGradient id="vignette">
              <stop offset="60%" stopColor="transparent" />
              <stop offset="100%" stopColor="#000" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          <rect width="1200" height="900" fill="url(#vignette)" />
        </svg>
      </div>
    </div>
  )
}
