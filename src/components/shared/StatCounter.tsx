'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  label: string
  duration?: number
  decimals?: number
}

export function StatCounter({
  value,
  suffix = '',
  prefix = '',
  label,
  duration = 2000,
  decimals = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const [display, setDisplay] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const startTime = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1)
      // ease-out quad
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(eased * value)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value, duration])

  const formatted = display.toFixed(decimals)

  return (
    <div ref={ref} className="text-center">
      <p
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(3.5rem, 8vw, 7rem)',
          fontWeight: 300,
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: '#0a0a0a',
        }}
      >
        {prefix}
        {formatted}
        {suffix}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.6875rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#78716C',
          marginTop: '12px',
        }}
      >
        {label}
      </p>
    </div>
  )
}
