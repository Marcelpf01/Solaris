'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useTransition } from '@/providers/TransitionProvider'
import { planets } from '@/lib/planets'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { SolarisLogo } from '@/components/shared/SolarisLogo'

const NAV_LINKS = [
  { label: 'Exhibits', href: '/#exhibits' },
  { label: 'Timeline', href: '/#timeline' },
  { label: 'Missions', href: '/missions' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/beyond' },
]

const extras = [
  { label: 'Mission Archive', href: '/missions', sub: 'Apollo · Voyager · Hubble · Webb · Perseverance' },
  { label: 'Beyond the Solar System', href: '/beyond', sub: 'Pluto · Kuiper Belt · Interstellar Space' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const { navigateTo } = useTransition()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const isHome = pathname === '/'

  const handleNav = (href: string) => {
    setOpen(false)
    setTimeout(() => navigateTo(href), 300)
  }

  // Homepage hero is now warm white — use dark text on home, white on dark planet pages
  const textColor = open
    ? 'rgba(255,255,255,0.9)'
    : scrolled
      ? 'rgba(12,9,6,0.88)'
      : isHome
        ? 'rgba(12,9,6,0.88)'
        : 'rgba(255,255,255,0.88)'

  const mutedColor = open
    ? 'rgba(255,255,255,0.35)'
    : scrolled
      ? 'rgba(12,9,6,0.38)'
      : isHome
        ? 'rgba(12,9,6,0.42)'
        : 'rgba(255,255,255,0.42)'

  return (
    <>
      {/* ── Header bar ──────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-[200] transition-all duration-700"
        style={{
          height: '68px',
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          paddingInline: 'clamp(1.5rem, 4vw, 4rem)',
          background: open
            ? 'transparent'
            : scrolled
              ? 'rgba(248,244,238,0.88)'
              : isHome
                ? 'rgba(248,244,238,0.0)'
                : 'transparent',
          backdropFilter: scrolled && !open ? 'blur(28px) saturate(1.8)' : 'none',
          borderBottom: scrolled && !open
            ? '1px solid rgba(12,9,6,0.07)'
            : isHome && !open
              ? '1px solid rgba(12,9,6,0.08)'
              : '1px solid transparent',
        }}
      >
        {/* LEFT: Logo */}
        <button
          onClick={() => handleNav('/')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '0.6rem', transition: 'opacity 0.3s' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.75')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
        >
          <SolarisLogo
            size={28}
            variant={open ? 'gold' : (!scrolled && !isHome) ? 'gold' : 'dark'}
          />
          <span style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: textColor,
            transition: 'color 0.4s',
          }}>
            Solaris
          </span>
        </button>

        {/* CENTER: Nav links — desktop only */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.62rem',
                fontWeight: 400,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: mutedColor,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                transition: 'color 0.25s',
                padding: '4px 0',
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = open
                  ? 'rgba(255,255,255,0.95)'
                  : (!scrolled && !isHome)
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(12,9,6,0.88)'
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.color = mutedColor
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* RIGHT: Museum progress + Hamburger */}
        <div className="flex items-center justify-end gap-5">
          <span
            className="hidden md:block"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: mutedColor,
              transition: 'color 0.4s',
            }}
          >
            Museum Progress
          </span>

          {/* Hamburger / Close */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px', width: '24px', alignItems: 'flex-end' }}
          >
            <motion.span
              style={{ display: 'block', height: '1px', background: textColor, borderRadius: '1px', transformOrigin: 'center' }}
              animate={{ width: open ? 20 : 20, rotate: open ? 45 : 0, y: open ? 6 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              style={{ display: 'block', height: '1px', background: textColor, borderRadius: '1px' }}
              animate={{ width: open ? 0 : 12, opacity: open ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              style={{ display: 'block', height: '1px', background: textColor, borderRadius: '1px', transformOrigin: 'center' }}
              animate={{ width: open ? 20 : 20, rotate: open ? -45 : 0, y: open ? -6 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </header>

      {/* ── Full-screen overlay ──────────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="nav-overlay"
            className="fixed inset-0 z-[199] flex flex-col"
            style={{ background: '#050505' }}
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.87, 0, 0.13, 1] }}
          >
            {/* Subtle noise texture */}
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage:
                  'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
              }}
            />

            {/* Thin horizontal rule */}
            <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', marginInline: 'clamp(1.5rem, 8vw, 8rem)', marginTop: '68px' }} />

            <div
              className="flex-1 flex flex-col justify-center overflow-y-auto"
              style={{ paddingInline: 'clamp(1.5rem, 8vw, 8rem)', paddingBlock: '5rem' }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.32em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.2)',
                  marginBottom: '2.5rem',
                }}
              >
                The Exhibition
              </motion.p>

              <motion.nav
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                style={{ marginBottom: '3rem' }}
              >
                {planets.map((planet, i) => (
                  <motion.div
                    key={planet.id}
                    variants={fadeUp}
                    custom={i}
                    className="group"
                    style={{
                      borderTop: i === 0 ? '1px solid rgba(255,255,255,0.05)' : undefined,
                      borderBottom: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <button
                      onClick={() => handleNav(planet.href)}
                      className="w-full flex items-baseline gap-6 text-left"
                      style={{ padding: '1.1rem 0', background: 'none', border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                    >
                      <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.18)', textTransform: 'uppercase', minWidth: '72px', transition: 'color 0.3s' }} className="group-hover:text-white/30">
                        Exhibit {planet.romanNumeral}
                      </span>
                      <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.75rem, 4.5vw, 3.5rem)', fontWeight: 300, color: 'rgba(255,255,255,0.7)', letterSpacing: '-0.01em', lineHeight: 1, flex: 1, transition: 'color 0.3s' }} className="group-hover:text-white">
                        {planet.name}
                      </span>
                      <span className="hidden md:block group-hover:!text-white/25" style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.18)', letterSpacing: '0.04em', transition: 'color 0.3s', maxWidth: '200px', textAlign: 'right' }}>
                        {planet.subtitle}
                      </span>
                      <div className="flex-shrink-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ width: 7, height: 7, background: planet.color, boxShadow: `0 0 8px ${planet.glowColor}` }} />
                    </button>
                  </motion.div>
                ))}
              </motion.nav>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="flex flex-col gap-4 pt-6"
                style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
              >
                {extras.map((item) => (
                  <button key={item.href} onClick={() => handleNav(item.href)} className="group flex flex-col gap-0.5 text-left" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.72rem', fontWeight: 400, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.38)', transition: 'color 0.3s' }} className="group-hover:!text-[#FFB400]">
                      {item.label}
                    </span>
                    <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.63rem', color: 'rgba(255,255,255,0.14)', letterSpacing: '0.05em' }}>
                      {item.sub}
                    </span>
                  </button>
                ))}
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              style={{ paddingInline: 'clamp(1.5rem, 8vw, 8rem)', paddingBottom: '2.5rem' }}
            >
              <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(0.85rem, 1.8vw, 1rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.14)' }}>
                "We are made of star stuff." — Carl Sagan
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
