'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp } from '@/lib/animations'

const voyagerData = [
  { label: 'Launched', value: 'Sept 5, 1977' },
  { label: 'Current distance', value: '23.6 billion km' },
  { label: 'Signal travel time', value: '21+ hours' },
  { label: 'Speed', value: '61,000 km/h' },
  { label: 'Status', value: 'Operational in interstellar space' },
  { label: 'Power remaining', value: 'Enough until ~2025–2030' },
]

const beyondStops = [
  {
    name: 'Pluto',
    distance: '5.9 billion km',
    note: 'Heart-shaped nitrogen glacier. Mountains of water ice. Thin nitrogen atmosphere. Visited once — New Horizons, 2015.',
    color: '#B5A895',
  },
  {
    name: 'Kuiper Belt',
    distance: '4.5–7.5 billion km',
    note: 'A vast disc of icy bodies and dwarf planets beyond Neptune\'s orbit. The source of short-period comets.',
    color: '#8899BB',
  },
  {
    name: 'Heliosphere boundary',
    distance: '~18 billion km',
    note: 'The heliopause — where the Sun\'s solar wind meets interstellar space. Voyager 1 crossed it in 2012.',
    color: '#AABBCC',
  },
  {
    name: 'Oort Cloud',
    distance: '~15 trillion km',
    note: 'A vast spherical shell of icy bodies extending to 1–2 light-years from the Sun. The source of long-period comets.',
    color: '#667788',
  },
  {
    name: 'Interstellar space',
    distance: '4.37 light-years to α Centauri',
    note: 'Beyond our solar system lies the deep void between stars — an incomprehensible emptiness scattered with ancient light.',
    color: '#445566',
  },
]

export default function BeyondPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const starsParallax = useTransform(scrollY, [0, 1000], [0, 80])

  return (
    <div style={{ background: '#000000', minHeight: '100vh', color: '#ffffff' }}>

      {/* ── HERO — pure black, meditative ─────────────────────── */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden"
        style={{ height: '100svh', minHeight: '620px' }}
      >
        {/* Stars field */}
        <motion.div
          style={{ y: starsParallax }}
          className="absolute inset-0 pointer-events-none"
        >
          {Array.from({ length: 200 }, (_, i) => {
            const x = Math.sin(i * 7.1 + 1) * 10000; const rx = x - Math.floor(x)
            const y = Math.sin(i * 7.1 + 2) * 10000; const ry = y - Math.floor(y)
            const s = Math.sin(i * 7.1 + 3) * 10000; const rs = (s - Math.floor(s)) > 0.9 ? 2 : 1
            const o = Math.sin(i * 7.1 + 4) * 10000; const ro = (o - Math.floor(o)) * 0.55 + 0.05
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{ width: rs, height: rs, left: `${rx * 100}%`, top: `${ry * 100}%`, background: '#ffffff', opacity: ro }}
              />
            )
          })}
        </motion.div>

        {/* Central content */}
        <div className="relative z-10" style={{ paddingInline: 'clamp(2rem, 10vw, 8rem)', maxWidth: '900px' }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.55rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(255,180,0,0.4)',
              marginBottom: '2.5rem',
            }}
          >
            Beyond the Eight Worlds
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              lineHeight: 1.0,
              marginBottom: '2rem',
            }}
          >
            The universe is under no obligation to make sense to you.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.1 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.18)',
            }}
          >
            — Neil deGrasse Tyson
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            style={{ marginTop: '4rem' }}
          >
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              style={{
                width: 1,
                height: 48,
                background: 'rgba(255,180,0,0.4)',
                margin: '0 auto',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── WHAT LIES BEYOND ──────────────────────────────────── */}
      <section style={{
        background: '#000000',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <SectionReveal className="mb-20">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,180,0,0.3)',
              marginBottom: '1rem',
            }}>The Journey Continues</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4.5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.8)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
            }}>
              What waits at the edge of everything
            </h2>
          </motion.div>
        </SectionReveal>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: '860px' }}>
          {beyondStops.map((stop, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <motion.div
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr',
                  paddingBlock: '3rem',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  position: 'relative',
                }}
              >
                {/* Distance marker */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  marginBottom: '1.25rem',
                }}>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.75rem, 4vw, 3rem)',
                    fontWeight: 200,
                    fontStyle: 'italic',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>{stop.name}</h3>

                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.6rem',
                    color: 'rgba(255,180,0,0.35)',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    textAlign: 'right',
                    paddingTop: '4px',
                  }}>{stop.distance}</p>
                </div>

                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.78rem',
                  color: 'rgba(255,255,255,0.28)',
                  lineHeight: 1.8,
                  maxWidth: '600px',
                }}>{stop.note}</p>

                {/* Index number */}
                <p style={{
                  position: 'absolute',
                  left: '-2rem',
                  top: '3rem',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.5rem',
                  color: 'rgba(255,180,0,0.15)',
                  letterSpacing: '0.1em',
                }}>0{i + 1}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── VOYAGER 1 ─────────────────────────────────────────── */}
      <section style={{
        background: '#050505',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(255,255,255,0.03)',
      }}>
        <SectionReveal className="mb-14">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(255,180,0,0.3)',
              marginBottom: '1rem',
            }}>Furthest Human Object</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '-0.03em',
              lineHeight: 0.95,
            }}>Voyager 1</h2>
          </motion.div>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.03)', maxWidth: '860px' }}>
          {voyagerData.map((item, i) => (
            <SectionReveal key={i} delay={i * 0.05}>
              <motion.div
                variants={fadeUp}
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2rem)',
                  background: '#050505',
                }}
              >
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.52rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.18)',
                  marginBottom: '0.75rem',
                }}>{item.label}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  color: 'rgba(255,180,0,0.55)',
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}>{item.value}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── PALE BLUE DOT ─────────────────────────────────────── */}
      <section style={{
        background: '#000000',
        paddingInline: 'clamp(1.5rem, 8vw, 12rem)',
        paddingBlock: 'clamp(6rem, 14vw, 12rem)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            {/* Gold dot — the pale blue dot */}
            <motion.div
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.3, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#FFB400',
                margin: '0 auto 3rem',
              }}
            />

            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.45,
              letterSpacing: '-0.02em',
              marginBottom: '2.5rem',
            }}>
              &ldquo;We are a way for the cosmos to know itself.&rdquo;
            </p>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.15)',
              marginBottom: '4rem',
            }}>— Carl Sagan</p>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
              color: 'rgba(255,255,255,0.2)',
              lineHeight: 1.9,
            }}>
              You have now journeyed through all eight worlds of our solar system — from the scorched rocks
              of Mercury to the frozen winds of Neptune. From the ancient impact craters of the Moon to
              the methane lakes of Titan. Each world is a story. Each world is a mirror. Eight billion
              kilometres of wonder, compressed into a single museum. We hope it changed how you see
              the night sky.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ── RETURN TO MUSEUM ──────────────────────────────────── */}
      <section style={{
        background: '#000000',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.12)',
              marginBottom: '0.75rem',
            }}>The Exhibition is complete</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Return to<br/>
              <span style={{ color: '#FFB400' }}>SOLARIS</span>
            </motion.h3>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/')}
            whileHover={{ x: 6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>Back to the beginning</span>
            <span style={{ color: '#FFB400', fontSize: '1.25rem', lineHeight: 1 }}>→</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
