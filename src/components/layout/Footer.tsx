'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { SolarisLogo } from '@/components/shared/SolarisLogo'

const EXPLORE = [
  { label: 'The Exhibition', href: '/#exhibits' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Mission Archive', href: '/missions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Beyond', href: '/beyond' },
]

const PLANETS = [
  { label: 'Mercury', href: '/mercury' },
  { label: 'Venus',   href: '/venus' },
  { label: 'Earth',   href: '/earth' },
  { label: 'Mars',    href: '/mars' },
  { label: 'Jupiter', href: '/jupiter' },
  { label: 'Saturn',  href: '/saturn' },
  { label: 'Uranus',  href: '/uranus' },
  { label: 'Neptune', href: '/neptune' },
]

const SOCIAL = [
  {
    label: 'GitHub',
    href: 'https://github.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:hello@solaris.museum',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
]

function FooterLink({ label, href, onClick }: { label: string; href: string; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '2px 0',
        fontFamily: 'var(--font-inter)',
        fontSize: '0.72rem',
        fontWeight: 300,
        letterSpacing: '0.06em',
        color: hovered ? '#C9A050' : 'rgba(255,255,255,0.32)',
        transition: 'color 0.25s',
        textAlign: 'left',
        display: 'block',
      }}
    >
      {label}
    </button>
  )
}

export function Footer() {
  const { navigateTo } = useTransition()
  const [email, setEmail] = useState('')

  return (
    <footer style={{ position: 'relative', background: '#080808', overflow: 'hidden' }}>
      {/* Subtle star noise texture */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `
          radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.12) 0%, transparent 100%),
          radial-gradient(1px 1px at 35% 72%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 67% 14%, rgba(255,255,255,0.1) 0%, transparent 100%),
          radial-gradient(1px 1px at 82% 55%, rgba(255,255,255,0.07) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 88%, rgba(255,255,255,0.08) 0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 8% 62%, rgba(255,255,255,0.06) 0%, transparent 100%),
          radial-gradient(1px 1px at 92% 28%, rgba(255,255,255,0.09) 0%, transparent 100%)
        `,
      }} />

      {/* Gold horizon accent */}
      <div style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,160,80,0.35) 30%, rgba(201,160,80,0.35) 70%, transparent)' }} />

      {/* Main footer grid */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: 'clamp(4rem, 8vw, 7rem) clamp(2rem, 6vw, 6rem)',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1.2fr',
          gap: 'clamp(2rem, 5vw, 5rem)',
        }}
        className="max-md:grid-cols-2 max-sm:grid-cols-1"
      >
        {/* ── Col 1: Brand ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <SolarisLogo size={40} variant="gold" showWordmark wordmarkSize="0.85rem" />
          </div>

          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.75rem',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.28)',
            lineHeight: 1.85,
            maxWidth: '260px',
            letterSpacing: '0.02em',
          }}>
            A cinematic digital museum exploring the eight worlds of our solar system. Built for curiosity. Designed for wonder.
          </p>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.5rem' }}>
            {SOCIAL.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '36px', height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.35)',
                  transition: 'color 0.25s, border-color 0.25s, background 0.25s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = '#C9A050'
                  el.style.borderColor = 'rgba(201,160,80,0.5)'
                  el.style.background = 'rgba(201,160,80,0.08)'
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement
                  el.style.color = 'rgba(255,255,255,0.35)'
                  el.style.borderColor = 'rgba(255,255,255,0.1)'
                  el.style.background = 'transparent'
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Col 2: Explore ── */}
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,160,80,0.7)',
            marginBottom: '1.4rem',
          }}>
            Explore
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {EXPLORE.map((l) => (
              <FooterLink key={l.href} label={l.label} href={l.href} onClick={() => navigateTo(l.href)} />
            ))}
          </nav>
        </div>

        {/* ── Col 3: Planets ── */}
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,160,80,0.7)',
            marginBottom: '1.4rem',
          }}>
            The Planets
          </p>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {PLANETS.map((l) => (
              <FooterLink key={l.href} label={l.label} href={l.href} onClick={() => navigateTo(l.href)} />
            ))}
          </nav>
        </div>

        {/* ── Col 4: Newsletter ── */}
        <div>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.5rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,160,80,0.7)',
            marginBottom: '1.4rem',
          }}>
            Stay Curious
          </p>
          <p style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.28)',
            lineHeight: 1.75,
            marginBottom: '1.2rem',
            fontWeight: 300,
          }}>
            Get the latest updates from the museum.
          </p>

          {/* Email input */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '8px', gap: '0.5rem' }}>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.72rem',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.65)',
                letterSpacing: '0.04em',
              }}
            />
            <button
              onClick={() => setEmail('')}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'rgba(201,160,80,0.7)',
                fontSize: '1rem',
                lineHeight: 1,
                padding: '0 4px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#C9A050')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(201,160,80,0.7)')}
            >
              →
            </button>
          </div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: '0.95rem',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.12)',
              lineHeight: 1.6,
              marginTop: '2.5rem',
              maxWidth: '240px',
            }}
          >
            "We are made of star stuff."
            <span style={{ display: 'block', fontFamily: 'var(--font-inter)', fontSize: '0.5rem', fontStyle: 'normal', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '6px', color: 'rgba(255,255,255,0.1)' }}>
              — Carl Sagan
            </span>
          </motion.p>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '1.6rem clamp(2rem, 6vw, 6rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.58rem',
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.14)',
        }}>
          © {new Date().getFullYear()} SOLARIS — A Digital Museum of the Solar System. All rights reserved.
        </p>

        <div style={{ display: 'flex', gap: '2rem' }}>
          {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((l) => (
            <button
              key={l}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.55rem',
                letterSpacing: '0.1em',
                color: 'rgba(255,255,255,0.14)',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.38)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.14)')}
            >
              {l}
            </button>
          ))}
        </div>

        {/* Gold pulse dot */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{ width: 5, height: 5, borderRadius: '50%', background: '#C9A050' }}
        />
      </div>
    </footer>
  )
}
