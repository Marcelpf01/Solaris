'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { getPlanetBySlug } from '@/lib/planets'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { PlanetHero } from '@/components/shared/PlanetHero'

const planet = getPlanetBySlug('neptune')!

const neptuneData = [
  { label: 'Distance from Sun', value: '4.495 billion km', sub: '30.07 AU from the Sun' },
  { label: 'Orbital Period', value: '164.8 years', sub: 'One orbit takes a human lifetime' },
  { label: 'Wind Speed', value: '2,100 km/h', sub: 'Fastest winds in the solar system' },
  { label: 'Temperature', value: 'âˆ’218Â°C', sub: 'Average cloud-top temperature' },
  { label: 'Moons', value: '16 known', sub: 'Triton orbits in retrograde' },
  { label: 'Discovery', value: '1846', sub: 'Predicted mathematically before being seen' },
]

export default function NeptunePage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 700], [0, 160])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  return (
    <div style={{ background: '#020408', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/neptune-hero.png"
        exhibitLabel="Exhibit VIII â€” The Solar Museum"
        name="Neptune"
        subtitle="The Dark Sovereign"
        description="The most distant planet â€” a world of supersonic winds and a Great Dark Spot visible from Earth."
        stats={[
          { label: 'Wind Speed', value: '2,100 km/h' },
          { label: 'Moons', value: '16' },
          { label: 'Year', value: '165 Earth Yrs' },
          { label: 'Distance', value: '4.5B km' },
        ]}
        accentColor="#7090F0"
        overlayColor="#020408"
        imageOpacity={0.75}
      />
      {/* â”€â”€ MINIMAL IDENTITY BAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{
        background: '#040810',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: '1.5rem',
        borderBottom: '1px solid rgba(75,112,221,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(2.5rem, 5vw, 5rem)',
        overflowX: 'auto',
      }}>
        {[
          { label: 'Type', value: 'Ice Giant' },
          { label: 'Position', value: '8th from Sun' },
          { label: 'Moons', value: '16 known' },
          { label: 'Rings', value: '5 faint rings' },
          { label: 'Visited', value: 'Once â€” Voyager 2, 1989' },
        ].map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.52rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(75,112,221,0.3)',
              marginBottom: '4px',
            }}>{item.label}</p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              color: 'rgba(75,112,221,0.55)',
              fontWeight: 400,
            }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ PLANETARY DATA â€” luxury grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#020408',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-14">
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(75,112,221,0.28)',
          }}>Planetary Data</motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-px"
          style={{ background: 'rgba(75,112,221,0.06)' }}
        >
          {neptuneData.map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ background: 'rgba(75,112,221,0.04)' }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                background: '#020408',
                transition: 'background 0.4s ease',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.52rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(75,112,221,0.28)',
                marginBottom: '1rem',
              }}>{d.label}</p>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#4B70DD',
                lineHeight: 1,
                marginBottom: '6px',
              }}>{d.value}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                color: 'rgba(75,112,221,0.2)',
                lineHeight: 1.5,
              }}>{d.sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ DESCRIPTION â€” cream on dark â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#030610',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
        borderTop: '1px solid rgba(75,112,221,0.06)',
      }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <SectionReveal className="md:col-span-4">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(75,112,221,0.3)',
                marginBottom: '2.5rem',
              }}>About Neptune</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: '#4B70DD',
                marginBottom: '1.5rem',
              }}>
                Discovered<br/>before<br/>it was seen
              </h2>

              <div style={{ width: 28, height: '1.5px', background: '#4B70DD', opacity: 0.35 }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-8" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(75,112,221,0.5)',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>{planet.description}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(75,112,221,0.3)',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ TRITON CALLOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#020408',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(75,112,221,0.05)',
        borderBottom: '1px solid rgba(75,112,221,0.05)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '780px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(75,112,221,0.28)',
              marginBottom: '1.5rem',
            }}>Neptune&apos;s Largest Moon</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(3rem, 8vw, 6.5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(75,112,221,0.5)',
              letterSpacing: '-0.04em',
              lineHeight: 0.9,
              marginBottom: '1.75rem',
            }}>Triton</h2>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'rgba(75,112,221,0.3)',
              lineHeight: 1.9,
              marginBottom: '2rem',
            }}>
              Triton orbits Neptune backwards â€” in the opposite direction to the planet&apos;s rotation.
              This retrograde orbit means Triton was almost certainly captured from the Kuiper Belt
              rather than forming in place. Tidal forces are slowly pulling it closer to Neptune.
              In approximately 3.6 billion years, Triton will cross the Roche limit and be torn apart
              into a spectacular ring system â€” rivalling Saturn&apos;s in scale.
            </p>

            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
              {[
                { label: 'Orbit direction', value: 'Retrograde' },
                { label: 'Fate', value: 'Destruction in 3.6B years' },
                { label: 'Surface', value: 'Nitrogen geysers' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.52rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(75,112,221,0.2)',
                    marginBottom: '4px',
                  }}>{item.label}</p>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.72rem',
                    color: 'rgba(75,112,221,0.45)',
                    fontWeight: 500,
                  }}>{item.value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ THE EDGE OF THE KNOWN â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#010205',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(6rem, 12vw, 10rem)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.5rem, 4vw, 3.5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(75,112,221,0.3)',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              marginBottom: '2.5rem',
            }}>
              Beyond Neptune lies the Kuiper Belt, the Oort Cloud, and the vast darkness of interstellar space.
              This is where the solar system ends â€” and the unknown begins.
            </p>

            <motion.button
              onClick={() => navigateTo('/beyond')}
              whileHover={{ opacity: 0.6 }}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(75,112,221,0.35)',
                background: 'none',
                border: '1px solid rgba(75,112,221,0.12)',
                padding: '1rem 2.5rem',
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
              }}
            >
              Venture Beyond
            </motion.button>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ NEXT â€” BEYOND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#020408',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(75,112,221,0.06)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(75,112,221,0.2)',
              marginBottom: '0.75rem',
            }}>What Lies Beyond</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(75,112,221,0.4)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              The Beyond<br/>
              <span style={{ color: '#FFB400' }}>Kuiper Belt Â· Voyager Â· Interstellar</span>
            </motion.h3>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/beyond')}
            whileHover={{ x: 6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(75,112,221,0.28)',
            }}>Enter the Unknown</span>
            <span style={{ color: '#FFB400', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
