'use client'

interface LogoProps {
  size?: number
  /** 'gold' = warm gold on dark bg  |  'dark' = dark ink on light bg  |  'white' = white on dark bg */
  variant?: 'gold' | 'dark' | 'white'
  showWordmark?: boolean
  wordmarkSize?: string
  className?: string
}

export function SolarisLogo({
  size = 36,
  variant = 'gold',
  showWordmark = false,
  wordmarkSize = '0.75rem',
  className,
}: LogoProps) {
  const color =
    variant === 'gold'  ? '#C9A050' :
    variant === 'dark'  ? '#120E09' :
                          '#FFFFFF'

  const faint = variant === 'dark' ? 'rgba(18,14,9,0.28)' : 'rgba(255,255,255,0.25)'

  return (
    <div
      className={className}
      style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
    >
      {/* ── Symbol ── */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 60 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Thin full orbital ring */}
        <circle cx="30" cy="30" r="22" stroke={faint} strokeWidth="0.9" />

        {/* Bold left-hemisphere arc (top → bottom, counterclockwise) */}
        <path
          d="M30 8 A22 22 0 0 0 30 52"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
        />

        {/* Crosshair axis lines */}
        <line x1="30" y1="1"  x2="30" y2="59" stroke={color} strokeWidth="0.7" opacity="0.45" />
        <line x1="12" y1="30" x2="48" y2="30" stroke={color} strokeWidth="0.7" opacity="0.45" />

        {/* Vertical elongated diamond (long star spike — top & bottom) */}
        <polygon
          points="30,5 33,29 30,55 27,29"
          fill={color}
        />

        {/* Horizontal diamond (shorter side spikes) */}
        <polygon
          points="13,30 29,27.2 47,30 29,32.8"
          fill={color}
          opacity="0.72"
        />

        {/* Bright center nucleus */}
        <circle cx="30" cy="30" r="2.8" fill={color} />

        {/* Planet orbit dot — 3 o'clock */}
        <circle cx="52" cy="30" r="2.1" fill={color} />

        {/* Planet orbit dot — lower right */}
        <circle cx="41" cy="50.5" r="1.6" fill={color} opacity="0.65" />
      </svg>

      {/* ── Wordmark (optional) ── */}
      {showWordmark && (
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: wordmarkSize,
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color,
            lineHeight: 1,
          }}>
            Solaris
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: `calc(${wordmarkSize} * 0.62)`,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: faint,
            lineHeight: 1,
            marginTop: '3px',
          }}>
            A Digital Museum
          </p>
        </div>
      )}
    </div>
  )
}
