'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Gallery image catalogue ──────────────────────────────────────────────────

type Category = 'all' | 'planets' | 'sun' | 'exploration' | 'earth'

interface GalleryImage {
  src: string
  title: string
  caption: string
  category: Category[]
  /** grid column span 1-3 */
  cols?: 1 | 2 | 3
  /** grid row span 1-2 */
  rows?: 1 | 2
  position?: string
}

const IMAGES: GalleryImage[] = [
  // — Featured / hero row —
  { src: '/images/sun-hero.png',            title: 'The Sun',               caption: 'Our star, 1.4 million km in diameter',               category: ['sun'],         cols: 2, rows: 2, position: '60% center' },
  { src: '/images/earth-hero.png',          title: 'Earth',                 caption: 'The only oasis of life in the known universe',       category: ['planets', 'earth'], cols: 1, rows: 1 },
  { src: '/images/mars-hero.png',           title: 'Mars',                  caption: 'Humanity\'s next destination',                      category: ['planets'],     cols: 1, rows: 1, position: 'center' },

  // — Planets —
  { src: '/images/jupiter-hero.png',        title: 'Jupiter',               caption: 'King of the planets',                               category: ['planets'],     cols: 1, rows: 2, position: 'center' },
  { src: '/images/saturn-rings.png',        title: 'Saturn',                caption: 'Ring system, 282,000 km wide',                      category: ['planets'],     cols: 2, rows: 1, position: 'center' },
  { src: '/images/venus-hero.png',          title: 'Venus',                 caption: 'The veiled inferno',                                category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/mercury-sphere.png',      title: 'Mercury',               caption: 'Closest to the Sun',                                category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/neptune-sphere.png',      title: 'Neptune',               caption: 'The dark sovereign',                                category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/uranus-hero.png',         title: 'Uranus',                caption: 'Tilted 98°, an anomaly at the edge of reason',      category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/pluto-sphere.png',        title: 'Pluto',                 caption: 'The dwarf world at the edge of the solar system',   category: ['planets'],     cols: 1, rows: 1 },

  // — Sun & Solar System —
  { src: '/images/solar-system-overview.png', title: 'The Solar System',    caption: 'Eight worlds in perfect gravitational balance',      category: ['sun'],         cols: 2, rows: 1, position: 'center' },
  { src: '/images/planetary-transit.png',   title: 'Planetary Transit',     caption: 'A rare alignment across the face of the Sun',       category: ['sun'],         cols: 1, rows: 1 },

  // — Earth views —
  { src: '/images/earth-at-night.png',      title: 'Earth at Night',        caption: 'City lights from low Earth orbit',                  category: ['earth'],       cols: 2, rows: 2, position: 'center' },
  { src: '/images/earth-atmosphere.png',    title: 'Atmosphere',            caption: 'The thin blue line that makes life possible',       category: ['earth'],       cols: 1, rows: 1 },
  { src: '/images/earth-sunrise.png',       title: 'Earth Sunrise',         caption: 'Sunrise over the Indian Ocean, seen from orbit',    category: ['earth'],       cols: 1, rows: 1 },
  { src: '/images/aurora-borealis.png',     title: 'Aurora Borealis',       caption: 'Northern lights over Iceland',                      category: ['earth'],       cols: 1, rows: 1 },

  // — Surface details —
  { src: '/images/jupiter-great-red-spot.png', title: 'Great Red Spot',    caption: 'Jupiter\'s centuries-old storm',                    category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/mars-terrain.png',        title: 'Martian Plains',        caption: 'Ancient cratered plains of Mars',                   category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/mars-polar-cap.png',      title: 'Mars Polar Cap',        caption: 'Ice cap spiral at the Martian north pole',          category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/mercury-surface.png',     title: 'Mercury Surface',       caption: 'Billions of years of asteroid impacts',             category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/venus-clouds.png',        title: 'Venus Clouds',          caption: 'Sulfuric acid clouds at 460°C below',               category: ['planets'],     cols: 1, rows: 1 },
  { src: '/images/saturn-hero.png',         title: 'Saturn Close-up',       caption: 'The ringed jewel at 1.4 billion km',                category: ['planets'],     cols: 1, rows: 1 },

  // — Exploration —
  { src: '/images/iss.png',                 title: 'Space Station',         caption: 'Humanity\'s outpost, 408 km above Earth',           category: ['exploration'], cols: 2, rows: 1 },
  { src: '/images/perseverance-rover.png',  title: 'Perseverance',          caption: 'Searching for life in Jezero Crater, Mars',         category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/hubble-telescope.png',    title: 'Hubble',                caption: '30+ years of transforming our view of the cosmos',  category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/voyager-1.png',           title: 'Voyager 1',             caption: 'The most distant human-made object, in interstellar space',  category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/lunar-module.png',        title: 'Lunar Module',          caption: 'Apollo 11. The first crewed lunar landing, 1969',   category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/rocket-launch.png',       title: 'Launch',                caption: 'The moment escape velocity is achieved',            category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/starship-launch.png',     title: 'Starship',              caption: 'The most powerful rocket ever built',               category: ['exploration'], cols: 1, rows: 1 },
  { src: '/images/space-shuttle.png',       title: 'Space Shuttle',         caption: '135 missions. The workhorse of the space age.',     category: ['exploration'], cols: 1, rows: 1 },
]

const TABS: { id: Category; label: string }[] = [
  { id: 'all',         label: 'All' },
  { id: 'planets',     label: 'Planets' },
  { id: 'sun',         label: 'The Sun' },
  { id: 'earth',       label: 'Earth' },
  { id: 'exploration', label: 'Exploration' },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<Category>('all')
  const [hovered, setHovered] = useState<number | null>(null)
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null)

  const filtered = activeTab === 'all'
    ? IMAGES
    : IMAGES.filter((img) => img.category.includes(activeTab))

  return (
    <main style={{ background: '#F7F3EB', minHeight: '100vh' }}>
      {/* ── Hero header ── */}
      <section style={{
        background: '#0a0a0a',
        paddingTop: 'clamp(7rem, 14vw, 11rem)',
        paddingBottom: 'clamp(4rem, 8vw, 6rem)',
        paddingInline: 'clamp(2rem, 6vw, 7rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background: solar system overview */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/images/solar-system-overview.png"
            alt=""
            aria-hidden="true"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.2 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.7) 50%, #0a0a0a 100%)' }} />
        </div>

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.55rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(201,160,80,0.7)', marginBottom: '1.2rem' }}
          >
            SOLARIS Collection
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3rem, 7vw, 6.5rem)', fontWeight: 300, color: '#fff', letterSpacing: '-0.02em', lineHeight: 0.92, marginBottom: '1.5rem' }}
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.78rem, 1.2vw, 0.9rem)', color: 'rgba(255,255,255,0.32)', maxWidth: '420px', lineHeight: 1.85, fontWeight: 300 }}
          >
            A curated collection of the solar system's most extraordinary vistas, from the surface of Mars to the edge of interstellar space.
          </motion.p>
        </div>
      </section>

      {/* ── Filter tabs ── */}
      <div style={{
        background: '#F7F3EB',
        borderBottom: '1px solid rgba(18,14,9,0.08)',
        position: 'sticky',
        top: '68px',
        zIndex: 50,
        backdropFilter: 'blur(20px)',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          paddingInline: 'clamp(2rem, 6vw, 7rem)',
          display: 'flex',
          gap: '2.5rem',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {TABS.map((tab) => {
            const active = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  fontWeight: active ? 500 : 300,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: active ? '#120E09' : 'rgba(18,14,9,0.38)',
                  padding: '1.2rem 0',
                  borderBottom: active ? '1px solid #120E09' : '1px solid transparent',
                  transition: 'all 0.25s',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Uniform grid ── */}
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(3rem, 6vw, 5rem) clamp(2rem, 6vw, 7rem)',
      }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}
        >
          <AnimatePresence>
            {filtered.map((img, i) => (
              <motion.div
                key={img.src + img.title}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                style={{
                  position: 'relative',
                  aspectRatio: '4 / 3',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: '#1a1a1a',
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => setLightbox(img)}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    objectFit: 'cover',
                    objectPosition: img.position ?? 'center',
                    transform: hovered === i ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.6s ease',
                  }}
                />

                {/* Overlay */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.08) 45%, transparent 100%)',
                }} />

                {/* Hover tint */}
                <motion.div
                  style={{ position: 'absolute', inset: 0, background: 'rgba(201,160,80,0.06)' }}
                  animate={{ opacity: hovered === i ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Caption */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1rem 1.2rem' }}>
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.p
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        style={{
                          fontFamily: 'var(--font-inter)',
                          fontSize: '0.52rem',
                          letterSpacing: '0.1em',
                          color: 'rgba(255,255,255,0.5)',
                          marginBottom: '3px',
                        }}
                      >
                        {img.caption}
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(0.95rem, 1.8vw, 1.35rem)',
                    fontWeight: 400,
                    color: '#fff',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.15,
                  }}>
                    {img.title}
                  </p>
                </div>

                {/* Expand icon */}
                <AnimatePresence>
                  {hovered === i && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        width: 28, height: 28,
                        border: '1px solid rgba(255,255,255,0.35)',
                        borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'rgba(0,0,0,0.25)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      <span style={{ color: '#fff', fontSize: '0.65rem' }}>↗</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9000,
              background: 'rgba(0,0,0,0.92)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(8px)',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', maxWidth: '1200px', width: '100%', cursor: 'default' }}
            >
              <img
                src={lightbox.src}
                alt={lightbox.title}
                style={{ width: '100%', maxHeight: '80vh', objectFit: 'contain', borderRadius: '8px', display: 'block' }}
              />
              <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'baseline', gap: '1rem' }}>
                <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.6rem', fontWeight: 300, color: '#fff', letterSpacing: '-0.01em' }}>
                  {lightbox.title}
                </p>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7 }}>
                  {lightbox.caption}
                </p>
              </div>
              <button
                onClick={() => setLightbox(null)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: 36, height: 36,
                  border: '1px solid rgba(255,255,255,0.3)',
                  borderRadius: '50%',
                  background: 'rgba(0,0,0,0.4)',
                  color: '#fff',
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
