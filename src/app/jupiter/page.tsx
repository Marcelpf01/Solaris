'use client'

import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTransition } from '@/providers/TransitionProvider'
import { getPlanetBySlug } from '@/lib/planets'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { PlanetHero } from '@/components/shared/PlanetHero'

gsap.registerPlugin(ScrollTrigger)

const planet = getPlanetBySlug('jupiter')!

const jupiterMoons = [
  { name: 'Europa', note: 'Subsurface ocean. Best candidate for extraterrestrial life.', color: '#C8B89A' },
  { name: 'Ganymede', note: 'Largest moon in the solar system. Bigger than Mercury.', color: '#8A8A7A' },
  { name: 'Io', note: 'Most volcanically active body in the solar system.', color: '#D4A830' },
  { name: 'Callisto', note: 'Most heavily cratered object we know. A geological museum.', color: '#707060' },
]

const jupiterData = [
  { label: 'Diameter', value: '139,820 km', note: '11.2Ã— Earth' },
  { label: 'Mass', value: '1.9 Ã— 10Â²â· kg', note: '2.5Ã— all other planets combined' },
  { label: 'Moons', value: '95', note: 'Most in the solar system' },
  { label: 'Gravity', value: '2.53g', note: 'Would crush most structures' },
  { label: 'Rotation', value: '9h 55m', note: 'Fastest in the solar system' },
  { label: 'Great Red Spot', value: '1.3Ã— Earth', note: 'Storm raging 400+ years' },
]

export default function JupiterPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 800], [0, 250])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0])

  const stormRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!stormRef.current) return
    const ctx = gsap.context(() => {
      // Animate the storm band layers at different speeds
      gsap.to('.storm-band-1', { x: '3%', duration: 30, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.storm-band-2', { x: '-4%', duration: 22, repeat: -1, yoyo: true, ease: 'sine.inOut' })
      gsap.to('.storm-band-3', { x: '2%', duration: 18, repeat: -1, yoyo: true, ease: 'sine.inOut' })

      gsap.to('.great-red-spot', {
        rotation: 360,
        duration: 48,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    }, stormRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#080400', minHeight: '100vh', overflow: 'hidden' }}>

      <PlanetHero
        image="/images/jupiter-hero.png"
        exhibitLabel="Exhibit V â€” The Solar Museum"
        name="Jupiter"
        subtitle="The Giant Guardian"
        description="A world so vast it could swallow all other planets combined â€” and its gravity shields the inner solar system."
        stats={[
          { label: 'Moons', value: '95' },
          { label: 'Diameter', value: '139,820 km' },
          { label: 'Rotation', value: '9h 55m' },
          { label: 'Mass', value: '2.5Ã— all planets' },
        ]}
        accentColor="#DCA860"
        overlayColor="#080400"
        imageOpacity={0.78}
      />
      {/* â”€â”€ SCALE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0600',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '900px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(200,139,58,0.35)',
              marginBottom: '2rem',
            }}>Scale</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2.5rem, 8vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#C88B3A',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
              marginBottom: '2rem',
            }}>
              All other planets combined would fit inside Jupiter.
              <span style={{ color: 'rgba(200,139,58,0.3)' }}> Twice.</span>
            </h2>

            {/* Visual scale comparison */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: '1rem',
              marginTop: '3rem',
              padding: '2rem 0',
              borderTop: '1px solid rgba(200,139,58,0.08)',
            }}>
              {[
                { label: 'Jupiter', size: 120, color: '#C88B3A' },
                { label: 'Saturn', size: 98, color: '#E8C878' },
                { label: 'Uranus', size: 41, color: '#82D8D8' },
                { label: 'Neptune', size: 40, color: '#4B70DD' },
                { label: 'Earth', size: 10, color: '#4B9CD3' },
                { label: 'Venus', size: 9.5, color: '#E8C285' },
                { label: 'Mars', size: 5.5, color: '#C1440E' },
                { label: 'Mercury', size: 4, color: '#B5B3BB' },
              ].map((p, i) => (
                <div key={i} style={{ textAlign: 'center', flexShrink: 0 }}>
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: Math.max(p.size * 0.65, 4),
                      height: Math.max(p.size * 0.65, 4),
                      borderRadius: '50%',
                      background: p.color,
                      opacity: 0.7,
                      marginBottom: '0.5rem',
                      transformOrigin: 'bottom',
                    }}
                  />
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.48rem',
                    letterSpacing: '0.1em',
                    color: 'rgba(200,139,58,0.3)',
                    textTransform: 'uppercase',
                  }}>{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ DATA GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#080400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(200,139,58,0.06)',
      }}>
        <SectionReveal className="mb-14">
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(200,139,58,0.3)',
          }}>Planetary Data</motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-px"
          style={{ background: 'rgba(200,139,58,0.06)' }}
        >
          {jupiterData.map((d, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ background: 'rgba(200,139,58,0.04)' }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2.5rem)',
                background: '#080400',
                transition: 'background 0.3s ease',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.53rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(200,139,58,0.3)',
                marginBottom: '1rem',
              }}>{d.label}</p>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem, 3.5vw, 2.5rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: '#C88B3A',
                lineHeight: 1,
                marginBottom: '5px',
              }}>{d.value}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                color: 'rgba(200,139,58,0.22)',
                lineHeight: 1.5,
              }}>{d.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ DESCRIPTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0600',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 9rem)',
      }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16">
          <SectionReveal className="md:col-span-5">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(200,139,58,0.3)',
                marginBottom: '2.5rem',
              }}>About Jupiter</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                lineHeight: 1.0,
                color: '#C88B3A',
                marginBottom: '1.5rem',
              }}>The colossus that shields us all</h2>

              <div style={{ width: 28, height: '1.5px', background: '#C88B3A', opacity: 0.5 }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-7" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(200,139,58,0.55)',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>{planet.description}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: 'rgba(200,139,58,0.35)',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ GALILEAN MOONS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#080400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(200,139,58,0.06)',
      }}>
        <SectionReveal className="mb-16">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(200,139,58,0.3)',
              marginBottom: '0.75rem',
            }}>95 Known Moons</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#C88B3A',
              letterSpacing: '-0.02em',
            }}>The Galilean worlds</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          style={{ maxWidth: '900px' }}
        >
          {jupiterMoons.map((moon, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ borderColor: 'rgba(200,139,58,0.25)' }}
              style={{
                padding: '2rem',
                border: '1px solid rgba(200,139,58,0.1)',
                transition: 'border-color 0.3s ease',
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: moon.color,
                opacity: 0.6,
                flexShrink: 0,
                marginTop: 2,
              }} />
              <div>
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: '1.5rem',
                  fontStyle: 'italic',
                  color: '#C88B3A',
                  fontWeight: 300,
                  marginBottom: '6px',
                }}>{moon.name}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  color: 'rgba(200,139,58,0.3)',
                  lineHeight: 1.65,
                }}>{moon.note}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ GREAT RED SPOT CALLOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0600',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(200,139,58,0.06)',
        borderBottom: '1px solid rgba(200,139,58,0.06)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '800px' }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(200,139,58,0.3)',
              marginBottom: '1.5rem',
            }}>The Great Red Spot</p>

            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: '#C88B3A',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              marginBottom: '1.5rem',
            }}>
              A storm wider than Earth. Raging for over 400 years.
            </h2>

            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
              color: 'rgba(200,139,58,0.35)',
              lineHeight: 1.85,
            }}>
              Jupiter&apos;s Great Red Spot is an anticyclonic storm that has persisted in the southern
              hemisphere for at least 350 years of recorded observation â€” and likely much longer. Winds
              within the storm reach 540 km/h. At its largest, the spot was 3Ã— the diameter of Earth.
              It is slowly shrinking â€” no one knows why.
            </p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#080400',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(200,139,58,0.2)',
              marginBottom: '0.75rem',
            }}>Next Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(200,139,58,0.55)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit VI<br/>
              <span style={{ color: '#E8C878' }}>Saturn</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(200,139,58,0.2)',
              marginTop: '0.75rem',
            }}>The Ringed Jewel â€” Showpiece of the Solar System</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/saturn')}
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
              color: 'rgba(200,139,58,0.35)',
            }}>Enter Exhibit VI</span>
            <span style={{ color: '#E8C878', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
