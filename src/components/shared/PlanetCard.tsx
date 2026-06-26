'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import type { Planet } from '@/lib/planets'
import { fadeUp } from '@/lib/animations'

export function PlanetCard({ planet, index }: { planet: Planet; index: number }) {
  const { navigateTo } = useTransition()
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="group cursor-pointer"
      onClick={() => navigateTo(planet.href)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          background: '#080808',
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px ${planet.color}44`
            : '0 4px 24px rgba(0,0,0,0.3)',
          transition: 'box-shadow 0.4s ease',
        }}
      >
        {/* Hero image area */}
        <div className="relative overflow-hidden" style={{ height: '220px' }}>
          {(planet.cardImage ?? planet.heroImage) ? (
            <img
              src={planet.cardImage ?? planet.heroImage}
              alt={planet.name}
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                opacity: hovered ? 0.9 : 0.75,
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                transition: 'opacity 0.5s ease, transform 0.6s ease',
              }}
            />
          ) : (
            /* Fallback gradient for planets without an image (Neptune) */
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 60% 40%, ${planet.color}40 0%, ${planet.color}15 50%, #060606 100%)`,
              }}
            />
          )}

          {/* Dark overlay — stronger at bottom for text bleed */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.6) 100%)`,
            }}
          />

          {/* Accent color tint on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `${planet.color}18`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />

          {/* Exhibit label — top left */}
          <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.52rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: hovered ? planet.color : 'rgba(255,255,255,0.5)',
                fontWeight: 500,
                transition: 'color 0.3s',
              }}
            >
              Exhibit {planet.exhibit}
            </span>
          </div>

          {/* Planet name overlay — bottom left of image */}
          <div style={{ position: 'absolute', bottom: '1rem', left: '1.25rem' }}>
            <h3
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: '#ffffff',
                marginBottom: '2px',
              }}
            >
              {planet.name}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.62rem',
                color: hovered ? planet.color : 'rgba(255,255,255,0.45)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.3s',
              }}
            >
              {planet.subtitle}
            </p>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1.1rem 1.25rem 1.25rem' }}>
          {/* Quick stats row */}
          <div className="flex gap-4" style={{ borderTop: `1px solid rgba(255,255,255,0.07)`, paddingTop: '0.9rem' }}>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.15rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                {planet.moons}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '3px',
                }}
              >
                Moons
              </p>
            </div>
            <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.15rem',
                  fontWeight: 400,
                  color: '#ffffff',
                  lineHeight: 1,
                }}
              >
                {planet.diameter.toLocaleString()}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)',
                  marginTop: '3px',
                }}
              >
                km diameter
              </p>
            </div>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
              <motion.span
                animate={{ x: hovered ? 4 : 0, color: hovered ? planet.color : 'rgba(255,255,255,0.35)' }}
                transition={{ duration: 0.2 }}
                style={{ fontSize: '1rem' }}
              >
                →
              </motion.span>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5"
          style={{ background: `linear-gradient(to right, ${planet.color}, ${planet.glowColor || planet.color})` }}
          animate={{ width: hovered ? '100%' : '0%' }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  )
}
