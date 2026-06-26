'use client'

import { motion, useScroll, useTransform } from 'framer-motion'

interface PlanetHeroProps {
  image: string
  exhibitLabel: string
  name: string
  subtitle: string
  description?: string
  stats: { label: string; value: string }[]
  accentColor?: string
  overlayColor?: string
  imageOpacity?: number
}

export function PlanetHero({
  image,
  exhibitLabel,
  name,
  subtitle,
  description,
  stats,
  accentColor = 'rgba(255,255,255,0.6)',
  overlayColor = '#060606',
  imageOpacity = 0.78,
}: PlanetHeroProps) {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 600], [0, 80])
  const textY = useTransform(scrollY, [0, 500], [0, -40])
  const opacity = useTransform(scrollY, [0, 350], [1, 0])

  return (
    <section
      style={{
        height: '100svh',
        minHeight: '620px',
        background: overlayColor,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Hero photography — full bleed */}
      <motion.div
        style={{ y: imageY, position: 'absolute', inset: 0 }}
      >
        <img
          src={image}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '110%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: imageOpacity,
          }}
        />
      </motion.div>

      {/* Left gradient — protect text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, ${overlayColor} 28%, rgba(0,0,0,0.55) 52%, rgba(0,0,0,0.1) 72%, transparent 88%)`,
        }}
      />

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: '40%', background: `linear-gradient(to top, ${overlayColor}, transparent)` }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.38) 100%)' }}
      />

      {/* Editorial text — left column, 38% max width */}
      <motion.div
        style={{
          y: textY,
          opacity,
          position: 'relative',
          zIndex: 10,
          paddingInline: 'clamp(2rem, 7vw, 7rem)',
          paddingBlock: '2rem',
          maxWidth: 'min(42%, 580px)',
        }}
      >
        {/* Exhibit label */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.55rem',
            fontWeight: 400,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.32)',
            marginBottom: '1.4rem',
          }}
        >
          {exhibitLabel}
        </motion.p>

        {/* Planet name */}
        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(4rem, 10vw, 9rem)',
            fontWeight: 300,
            color: '#ffffff',
            letterSpacing: '0.04em',
            lineHeight: 0.92,
            marginBottom: '1rem',
          }}
        >
          {name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.65 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(0.7rem, 1.3vw, 0.85rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            color: accentColor,
            letterSpacing: '0.06em',
            marginBottom: description ? '1.2rem' : '2rem',
            opacity: 0.75,
          }}
        >
          {subtitle}
        </motion.p>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.8 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.78rem, 1.2vw, 0.88rem)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.42)',
              lineHeight: 1.75,
              maxWidth: '380px',
              marginBottom: '2rem',
              letterSpacing: '0.02em',
            }}
          >
            {description}
          </motion.p>
        )}

        {/* Thin divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: '1px',
            width: 'clamp(40px, 8vw, 80px)',
            background: accentColor,
            marginBottom: '1.8rem',
            transformOrigin: 'left',
            opacity: 0.4,
          }}
        />

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(1.2rem, 3vw, 2.5rem)' }}
        >
          {stats.map((s, i) => (
            <div key={i}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                fontWeight: 400,
                color: '#ffffff',
                letterSpacing: '0.04em',
                lineHeight: 1,
                marginBottom: '4px',
              }}>
                {s.value}
              </p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.5rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
              }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '36px', background: `linear-gradient(to bottom, ${accentColor}, transparent)`, opacity: 0.35 }}
        />
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.38rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
