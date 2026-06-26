'use client'

import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { getPlanetBySlug } from '@/lib/planets'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { PlanetHero } from '@/components/shared/PlanetHero'

const planet = getPlanetBySlug('mars')!

const marsMissions = [
  { year: '1965', name: 'Mariner 4', agency: 'NASA', desc: 'First successful Mars flyby. 22 photographs. No life. No oceans.' },
  { year: '1976', name: 'Viking 1 & 2', agency: 'NASA', desc: 'First successful Mars landers. Searched for life. Results: inconclusive.' },
  { year: '1997', name: 'Mars Pathfinder', agency: 'NASA', desc: 'First rover â€” Sojourner. Proved surface mobility. 85 million km transmissions.' },
  { year: '2004', name: 'Spirit & Opportunity', agency: 'NASA', desc: 'Opportunity roved for 14+ years. Confirmed ancient water activity.' },
  { year: '2012', name: 'Curiosity', agency: 'NASA', desc: 'Nuclear-powered. Still operating. Found organic molecules. Evidence of habitability.' },
  { year: '2021', name: 'Perseverance + Ingenuity', agency: 'NASA/JPL', desc: 'First powered flight on another planet. Oxygen production tested. Samples cached for return.' },
]

const colonySpecs = [
  { label: 'Gravity', value: '38%', note: 'of Earth â€” manageable for humans' },
  { label: 'Day Length', value: '24h 37m', note: 'Closest to Earth of any planet' },
  { label: 'Surface Area', value: '28%', note: 'of Earth\'s land surface â€” enough for billions' },
  { label: 'Tilt', value: '25.2Â°', note: 'Seasons like Earth â€” predictable cycles' },
  { label: 'Travel Time', value: '6â€“8 mo', note: 'Hohmann transfer orbit' },
  { label: 'Communication', value: '3â€“22 min', note: 'Speed-of-light delay from Earth' },
]

export default function MarsPage() {
  const { navigateTo } = useTransition()

  return (
    <div style={{ background: '#0e0400', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/mars-hero.png"
        exhibitLabel="Exhibit IV â€” The Solar Museum"
        name="Mars"
        subtitle="The Frontier World"
        description="The most explored planet beyond Earth â€” our next step as a multi-planetary species."
        stats={[
          { label: 'Active Rovers', value: '1' },
          { label: 'Missions Sent', value: '50+' },
          { label: 'Distance', value: '141.6M mi' },
          { label: 'Gravity', value: '0.38g' },
        ]}
        accentColor="#E07850"
        overlayColor="#0e0400"
        imageOpacity={0.8}
      />

      {/* â”€â”€ MISSION STATUS BAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{
        background: 'rgba(193,68,14,0.08)',
        borderTop: '1px solid rgba(193,68,14,0.15)',
        borderBottom: '1px solid rgba(193,68,14,0.15)',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        overflowX: 'auto',
      }}>
        <p style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.55rem',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(193,68,14,0.5)',
          flexShrink: 0,
        }}>Mission Status</p>
        {[
          { label: 'Planet Type', value: 'Terrestrial' },
          { label: 'Moons', value: 'Phobos & Deimos' },
          { label: 'Orbital Period', value: '686.97 Earth days' },
          { label: 'Human Arrival', value: 'Est. 2030sâ€“2040s' },
          { label: 'Atmosphere', value: 'COâ‚‚ 95.3%' },
        ].map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.53rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(193,68,14,0.35)',
              marginBottom: '4px',
            }}>{item.label}</p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(255,200,140,0.6)',
              fontWeight: 500,
            }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ COLONY VIABILITY SPECS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0e0400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-14">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(193,68,14,0.4)',
              marginBottom: '0.75rem',
            }}>Colony Viability Index</p>
            <h2 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
            }}>Why Mars?</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-px"
          style={{ background: 'rgba(193,68,14,0.08)' }}
        >
          {colonySpecs.map((spec, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ background: 'rgba(193,68,14,0.06)' }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.25rem)',
                background: '#0e0400',
                transition: 'background 0.3s ease',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.53rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(193,68,14,0.35)',
                marginBottom: '0.85rem',
              }}>{spec.label}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                fontWeight: 700,
                color: '#C1440E',
                lineHeight: 1,
                marginBottom: '6px',
                letterSpacing: '-0.02em',
              }}>{spec.value}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                color: 'rgba(255,200,140,0.25)',
                lineHeight: 1.5,
              }}>{spec.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ DESCRIPTION â€” editorial â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#1a0800',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
      }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <SectionReveal className="md:col-span-4">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(193,68,14,0.4)',
                marginBottom: '2.5rem',
              }}>About Mars</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#fff',
                marginBottom: '1.5rem',
              }}>The frontier we are racing toward</h2>

              <div style={{ width: 28, height: '1.5px', background: '#C1440E' }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-8" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(255,200,140,0.65)',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>{planet.description}</p>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(255,200,140,0.4)',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ MISSION TIMELINE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0e0400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-16">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(193,68,14,0.4)',
              marginBottom: '0.75rem',
            }}>Mission Log</p>
            <h2 style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
            }}>60 years of exploration</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {marsMissions.map((mission, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 1px 1fr',
                gap: '0 2rem',
                paddingBlock: '2rem',
                borderBottom: i < marsMissions.length - 1 ? '1px solid rgba(193,68,14,0.08)' : 'none',
              }}
            >
              {/* Year */}
              <div>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  color: '#C1440E',
                  letterSpacing: '0.05em',
                }}>{mission.year}</p>
              </div>

              {/* Timeline line */}
              <div style={{
                background: 'rgba(193,68,14,0.2)',
                position: 'relative',
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#C1440E',
                }} />
              </div>

              {/* Content */}
              <div style={{ paddingLeft: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '6px' }}>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    letterSpacing: '0.01em',
                  }}>{mission.name}</p>
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(193,68,14,0.5)',
                    border: '1px solid rgba(193,68,14,0.2)',
                    padding: '2px 8px',
                  }}>{mission.agency}</span>
                </div>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,200,140,0.3)',
                  lineHeight: 1.65,
                }}>{mission.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ OLYMPUS MONS CALLOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#1a0800',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(193,68,14,0.08)',
      }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { value: '21.9 km', label: 'Olympus Mons height', note: '3Ã— taller than Mount Everest. The largest volcano in the solar system.' },
            { value: '4,000 km', label: 'Valles Marineris length', note: 'A canyon that would stretch across the entire United States.' },
            { value: 'âˆ’63Â°C', label: 'Average surface temp', note: 'Cold, but within survivable range with proper insulation.' },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <motion.div variants={fadeUp}>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 800,
                  color: '#C1440E',
                  letterSpacing: '-0.03em',
                  lineHeight: 0.9,
                  marginBottom: '0.75rem',
                  textTransform: 'uppercase',
                }}>{item.value}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(193,68,14,0.45)',
                  marginBottom: '0.6rem',
                }}>{item.label}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,200,140,0.25)',
                  lineHeight: 1.6,
                }}>{item.note}</p>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0e0400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(193,68,14,0.08)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(193,68,14,0.3)',
              marginBottom: '0.75rem',
            }}>Next Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(255,200,140,0.5)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit V<br/>
              <span style={{ color: '#C88B3A' }}>Jupiter</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(255,200,140,0.2)',
              marginTop: '0.75rem',
            }}>The Colossus</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/jupiter')}
            whileHover={{ x: 6 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(193,68,14,0.4)',
            }}>Enter Exhibit V</span>
            <span style={{ color: '#C88B3A', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
