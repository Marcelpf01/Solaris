'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Earth at Night',
    caption: 'City lights from low Earth orbit',
    image: '/images/earth-at-night.png',
    cols: 2, rows: 2,
    accent: '#4B9CD3',
    position: 'center',
  },
  {
    id: 2,
    title: 'Great Red Spot',
    caption: "Jupiter's centuries-old storm",
    image: '/images/jupiter-great-red-spot.png',
    cols: 1, rows: 1,
    accent: '#C88B3A',
    position: 'center',
  },
  {
    id: 3,
    title: "Saturn's Rings",
    caption: 'Ring panorama, 282,000 km wide',
    image: '/images/saturn-rings.png',
    cols: 1, rows: 1,
    accent: '#E8C878',
    position: 'center left',
  },
  {
    id: 4,
    title: 'Mars Terrain',
    caption: 'Ancient cratered plains of Mars',
    image: '/images/mars-terrain.png',
    cols: 1, rows: 2,
    accent: '#C1440E',
    position: 'center',
  },
  {
    id: 5,
    title: 'Mars Polar Cap',
    caption: 'Ice cap spiral at the Martian north pole',
    image: '/images/mars-polar-cap.png',
    cols: 1, rows: 1,
    accent: '#E07850',
    position: 'center',
  },
  {
    id: 6,
    title: 'Aurora Borealis',
    caption: 'Northern lights over Iceland',
    image: '/images/aurora-borealis.png',
    cols: 1, rows: 1,
    accent: '#50D890',
    position: 'center',
  },
  {
    id: 7,
    title: 'Hubble Telescope',
    caption: '30 years transforming our view of the cosmos',
    image: '/images/hubble-telescope.png',
    cols: 1, rows: 1,
    accent: '#9090D8',
    position: 'center',
  },
  {
    id: 8,
    title: 'Earth Sunrise',
    caption: 'Sunrise over the Indian Ocean, seen from orbit',
    image: '/images/earth-sunrise.png',
    cols: 1, rows: 1,
    accent: '#E89050',
    position: 'center',
  },
]

export function GalleryPreview() {
  const [hovered, setHovered] = useState<number | null>(null)
  const { navigateTo } = useTransition()

  return (
    <section
      style={{
        background: '#F8F6F2',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '10px' }}>
              Gallery
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}>
              Visions of
              <br /><em>Space</em>
            </motion.h2>
          </div>
          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/gallery')}
            whileHover={{ scale: 1.02, borderColor: '#0a0a0a', color: '#0a0a0a' }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(0,0,0,0.15)',
              padding: '10px 22px',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.4)',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s',
            }}
          >
            View Full Gallery →
          </motion.button>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridAutoRows: '200px',
            gap: '6px',
          }}
        >
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, scale: 0.97 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
              }}
              style={{
                gridColumn: `span ${item.cols}`,
                gridRow: `span ${item.rows}`,
                position: 'relative',
                borderRadius: '8px',
                overflow: 'hidden',
                cursor: 'pointer',
                background: '#111',
              }}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: item.position,
                  transform: hovered === item.id ? 'scale(1.06)' : 'scale(1)',
                  transition: 'transform 0.6s ease',
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
                zIndex: 1,
              }} />

              {/* Accent tint on hover */}
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `${item.accent}18`,
                  zIndex: 1,
                }}
                animate={{ opacity: hovered === item.id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Content */}
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.25rem', zIndex: 2 }}>
                <AnimatePresence>
                  {hovered === item.id && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.55rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: item.accent,
                        marginBottom: '4px',
                      }}
                    >
                      {item.caption}
                    </motion.p>
                  )}
                </AnimatePresence>
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1rem, 2vw, 1.4rem)',
                  fontWeight: 400,
                  color: '#fff',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}>
                  {item.title}
                </p>
              </div>

              {/* Expand icon */}
              <AnimatePresence>
                {hovered === item.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    style={{
                      position: 'absolute', top: '1rem', right: '1rem',
                      width: 28, height: 28,
                      border: '1px solid rgba(255,255,255,0.4)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      zIndex: 2,
                      background: 'rgba(0,0,0,0.2)',
                    }}
                  >
                    <span style={{ color: '#fff', fontSize: '0.7rem' }}>↗</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
