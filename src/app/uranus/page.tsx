'use client'

import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { getPlanetBySlug } from '@/lib/planets'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { PlanetHero } from '@/components/shared/PlanetHero'

const planet = getPlanetBySlug('uranus')!

const uranusData = [
  ['Orbital period', '84.01 years', '30,589 Earth days'],
  ['Rotation period', '17h 14m', 'Retrograde spin'],
  ['Axial tilt', '97.77°', 'Rolls on its side'],
  ['Diameter', '50,724 km', '4.01× Earth'],
  ['Mass', '8.68 × 10²⁵ kg', '14.54× Earth'],
  ['Gravity', '8.69 m/s²', '0.886g'],
  ['Mean temperature', '−224°C', 'Coldest atmosphere'],
  ['Rings', '13 known', 'Vertical orientation'],
  ['Moons', '28 known', 'Named after Shakespeare'],
  ['Distance from Sun', '2,871M km', '19.2 AU'],
]

export default function UranusPage() {
  const { navigateTo } = useTransition()

  return (
    <div style={{ background: '#f8fafa', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/uranus-hero.png"
        exhibitLabel="Exhibit VII — The Solar Museum"
        name="Uranus"
        subtitle="The Tilted Giant"
        description="Rolling through space at a 98° tilt — an anomaly at the edge of reason, with a system of rings and 27 moons."
        stats={[
          { label: 'Axial Tilt', value: '97.8°' },
          { label: 'Moons', value: '27' },
          { label: 'Distance', value: '2.87B km' },
          { label: 'Rotation', value: '17h 14m' },
        ]}
        accentColor="#82D8D8"
        overlayColor="#030a0a"
        imageOpacity={0.72}
      />

      {/* ── THE TILT ANOMALY ──────────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
        borderBottom: '1px solid rgba(130,216,216,0.12)',
      }}>
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="mb-16">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: 'rgba(130,216,216,0.5)',
                marginBottom: '0.75rem',
              }}>Defining Anomaly</p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                color: '#0a3a3a',
                letterSpacing: '-0.02em',
              }}>Rolling through the solar system at 97.77°</h2>
            </motion.div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                value: '97.77°',
                label: 'Axial Tilt',
                desc: 'Uranus orbits the Sun essentially on its side, likely the result of a massive ancient collision with an Earth-sized body.',
              },
              {
                value: '42 yrs',
                label: 'Season Length',
                desc: 'Each pole experiences 42 years of continuous sunlight followed by 42 years of complete darkness — the longest seasons in the solar system.',
              },
              {
                value: '−224°C',
                label: 'Min Temperature',
                desc: 'The coldest planetary atmosphere in the solar system — colder even than Neptune, despite Neptune being further from the Sun.',
              },
            ].map((item, i) => (
              <SectionReveal key={i} delay={i * 0.1}>
                <motion.div variants={fadeUp}>
                  <p style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                    fontWeight: 300,
                    color: '#82D8D8',
                    letterSpacing: '-0.03em',
                    lineHeight: 0.9,
                    marginBottom: '0.6rem',
                  }}>{item.value}</p>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(0,100,100,0.35)',
                    marginBottom: '0.75rem',
                  }}>{item.label}</p>
                  <div style={{ width: 20, height: '1.5px', background: '#82D8D8', opacity: 0.4, marginBottom: '0.75rem' }} />
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.72rem',
                    color: 'rgba(0,60,60,0.45)',
                    lineHeight: 1.75,
                  }}>{item.desc}</p>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SCIENTIFIC DATA TABLE ─────────────────────────────── */}
      <section style={{
        background: '#f0f8f8',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-14">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(130,216,216,0.5)',
              marginBottom: '0.75rem',
            }}>Physical Data — Uranus</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 300,
              color: '#0a3a3a',
              letterSpacing: '-0.02em',
            }}>Complete planetary record</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: '780px' }}
        >
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            paddingBlock: '0.75rem',
            borderBottom: '2px solid rgba(130,216,216,0.2)',
            marginBottom: '0.25rem',
          }}>
            {['Parameter', 'Value', 'Reference'].map((h, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(0,100,100,0.35)',
              }}>{h}</p>
            ))}
          </div>

          {uranusData.map((row, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                paddingBlock: '1rem',
                borderBottom: '1px solid rgba(130,216,216,0.08)',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                color: 'rgba(0,80,80,0.45)',
              }}>{row[0]}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                fontWeight: 600,
                color: '#0a3a3a',
              }}>{row[1]}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                color: 'rgba(130,216,216,0.6)',
              }}>{row[2]}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── DESCRIPTION ───────────────────────────────────────── */}
      <section style={{
        background: '#ffffff',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
        borderTop: '1px solid rgba(130,216,216,0.1)',
      }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <SectionReveal className="md:col-span-4">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(130,216,216,0.5)',
                marginBottom: '2.5rem',
              }}>About Uranus</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#0a3a3a',
                marginBottom: '1.5rem',
              }}>An anomaly at the edge of reason</h2>

              <div style={{ width: 28, height: '1.5px', background: '#82D8D8', opacity: 0.6 }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-8" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#2a5a5a',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>{planet.description}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#4a7a7a',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* ── ONLY ONE VISIT ────────────────────────────────────── */}
      <section style={{
        background: '#0a2a2a',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '700px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(130,216,216,0.3)',
              marginBottom: '1.5rem',
            }}>The Lonely Record</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#82D8D8',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              Only one spacecraft has ever visited Uranus.
            </h2>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'rgba(130,216,216,0.35)',
              lineHeight: 1.85,
            }}>
              Voyager 2 flew past Uranus on 24 January 1986, spending just 6 hours in close proximity
              to the planet before continuing to Neptune. All our detailed knowledge of Uranus&apos;s rings,
              atmosphere, and moons comes from those six hours. No mission is currently planned to return.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ── NEXT EXHIBIT CTA ──────────────────────────────────── */}
      <section style={{
        background: '#f0f8f8',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(130,216,216,0.12)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(130,216,216,0.35)',
              marginBottom: '0.75rem',
            }}>Final Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#0a3a3a',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit VIII<br/>
              <span style={{ color: '#4B70DD' }}>Neptune</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(0,80,80,0.3)',
              marginTop: '0.75rem',
            }}>The Dark Sovereign</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/neptune')}
            whileHover={{ x: 6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(0,80,80,0.35)',
            }}>Enter Exhibit VIII</span>
            <span style={{ color: '#4B70DD', fontSize: '1.25rem', lineHeight: 1 }}>→</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
