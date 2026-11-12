interface EagleLogoProps {
  size?: number;
  className?: string;
  fill?: 'gradient' | 'gold' | 'cyan' | 'white' | string;
}

export default function EagleLogo({
  size = 32,
  className = '',
  fill = 'gradient'
}: EagleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        flexShrink: 0,
        filter: 'drop-shadow(0 2px 8px rgba(56, 189, 248, 0.45))'
      }}
    >
      <defs>
        {/* Luminous Sky Electric Gradient (Cyan -> Sky Blue -> Mint) */}
        <linearGradient id="skyEaglePrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="45%" stopColor="#60a5fa" />
          <stop offset="80%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#34d399" />
        </linearGradient>

        {/* Imperial Gold Gradient Option */}
        <linearGradient id="skyEagleGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fde047" />
          <stop offset="50%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Head/Crest Highlight Gradient */}
        <linearGradient id="skyEagleHeadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Subtle Wing Glow Filter */}
        <linearGradient id="skyEagleChestGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>

      <g
        fill={
          fill === 'gradient'
            ? 'url(#skyEaglePrimaryGrad)'
            : fill === 'gold'
            ? 'url(#skyEagleGoldGrad)'
            : fill === 'cyan'
            ? '#38bdf8'
            : fill === 'white'
            ? '#ffffff'
            : fill
        }
      >
        {/* === EAGLE HEAD & SHARP BEAK === */}
        <path
          d="M32 6C28.8 6 25.8 8.8 24.5 12C20.5 13.2 17.5 16 16.8 19.2C21 19.8 24 18.5 26.2 21.5L30.5 28.5H33.5L37.8 21.5C40 18.5 43 19.8 47.2 19.2C46.5 16 43.5 13.2 39.5 12C38.2 8.8 35.2 6 32 6Z"
          fill={fill === 'gradient' ? 'url(#skyEagleHeadGrad)' : undefined}
        />

        {/* === LEFT WING (PRIMARY UPPER SWEEP) === */}
        <path d="M28 20C21.5 15.5 11 9 1.5 4.5C6.5 13 14 20.5 24 24.8C16.8 25.5 8.5 22.2 2.5 18C7 25 15 29.8 25 31.5C18.2 32 10.5 30 5.2 27.2C10.2 34.5 20.5 37.5 27.5 38.5L29 31C24.2 27.8 25.5 23 28 20Z" />

        {/* === RIGHT WING (PRIMARY UPPER SWEEP) === */}
        <path d="M36 20C42.5 15.5 53 9 62.5 4.5C57.5 13 50 20.5 40 24.8C47.2 25.5 55.5 22.2 61.5 18C57 25 49 29.8 39 31.5C45.8 32 53.5 30 58.8 27.2C53.8 34.5 43.5 37.5 36.5 38.5L35 31C39.8 27.8 38.5 23 36 20Z" />

        {/* === LOWER LEFT WING FEATHER TIER === */}
        <path d="M26 40C19.5 39 12 36 7.5 32C11 39 19.5 44 28 46.5L28.8 40.8C27.8 40.5 26.8 40.2 26 40Z" />

        {/* === LOWER RIGHT WING FEATHER TIER === */}
        <path d="M38 40C44.5 39 52 36 56.5 32C53 39 44.5 44 36 46.5L35.2 40.8C36.2 40.5 37.2 40.2 38 40Z" />

        {/* === CHEVRON ARMOR TORSO DETAILS === */}
        <path
          d="M32 30L26 36.5H38L32 30Z"
          fill={fill === 'gradient' ? 'url(#skyEagleChestGrad)' : undefined}
          fillOpacity={0.9}
        />
        <path
          d="M32 38L25 45.5H39L32 38Z"
          fill={fill === 'gradient' ? 'url(#skyEagleChestGrad)' : undefined}
          fillOpacity={0.78}
        />

        {/* === FAN TAIL FEATHERS === */}
        <path d="M31 48H33L33.5 60H30.5L31 48Z" />
        <path d="M28.5 47.5L26 57.5L28.8 58.5L30 47.5H28.5Z" />
        <path d="M35.5 47.5L38 57.5L35.2 58.5L34 47.5H35.5Z" />
        <path d="M25.5 47L22 54.5L24.5 55.5L27 47H25.5Z" />
        <path d="M38.5 47L42 54.5L39.5 55.5L37 47H38.5Z" />
      </g>
    </svg>
  );
}
