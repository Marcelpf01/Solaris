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

const planet = getPlanetBySlug('venus')!

const venusStats = [
  { label: 'Surface Temperature', value: '465Â°C', note: 'Hottest planet â€” hotter than Mercury' },
  { label: 'Diameter', value: '12,104 km', note: '94.9% of Earth' },
  { label: 'Orbital Period', value: '224.7 days', note: 'One Venusian year' },
  { label: 'Rotation Period', value: '243 days', note: 'Longer than its year â€” retrograde' },
  { label: 'Distance from Sun', value: '108.2M km', note: '67.24 million miles' },
  { label: 'Surface Pressure', value: '92 atm', note: 'Equivalent to 900m underwater' },
]

const atmosphereLayers = [
  { name: 'Carbon Dioxide', formula: 'COâ‚‚', pct: 96.5, color: '#C87830', barColor: 'rgba(200,120,48,0.8)' },
  { name: 'Nitrogen', formula: 'Nâ‚‚', pct: 3.5, color: '#E8C285', barColor: 'rgba(232,194,133,0.8)' },
  { name: 'Sulfuric Acid', formula: 'Hâ‚‚SOâ‚„', pct: 0.1, color: '#F5D090', barColor: 'rgba(245,208,144,0.5)', note: 'Trace â€” cloud layers' },
]

export default function VenusPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 700], [0, 180])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const atmosphereRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!atmosphereRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.atm-ring-1', { rotation: 360,  duration: 120, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('.atm-ring-2', { rotation: -360, duration: 80,  repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
      gsap.to('.atm-ring-3', { rotation: 360,  duration: 200, repeat: -1, ease: 'none', transformOrigin: '50% 50%' })
    }, atmosphereRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#120800', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/venus-hero.png"
        exhibitLabel="Exhibit II â€” The Solar Museum"
        name="Venus"
        subtitle="The Veiled Inferno"
        description="Our sister planet in size, but a hellish world of crushing pressure and acid rain beneath eternal clouds."
        stats={[
          { label: 'Surface Temp', value: '465Â°C' },
          { label: 'Moons', value: '0' },
          { label: 'Gravity', value: '0.91g' },
          { label: 'Pressure', value: '92 atm' },
        ]}
        accentColor="#C87830"
        overlayColor="#120800"
        imageOpacity={0.78}
      />
      {/* â”€â”€ IDENTITY BAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{
        background: 'linear-gradient(to right, #1e0d00, #2a1500, #1a0a00)',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: '1.75rem',
        borderTop: '1px solid rgba(232,194,133,0.07)',
        borderBottom: '1px solid rgba(232,194,133,0.07)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 4rem)',
        overflowX: 'auto',
      }}>
        {[
          { label: 'Classification', value: 'Terrestrial Planet' },
          { label: 'Distance from Sun', value: '108.2 million km' },
          { label: 'Orbital Period', value: '224.7 Earth days' },
          { label: 'Atmosphere', value: 'COâ‚‚ dominant' },
          { label: 'Natural Satellites', value: 'None' },
        ].map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.55rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(232,194,133,0.28)',
              marginBottom: '5px',
            }}>{item.label}</p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(232,194,133,0.65)',
              fontWeight: 500,
              letterSpacing: '0.03em',
            }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ FLOATING GLASS DATA CARDS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0500',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-14">
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(232,194,133,0.28)',
          }}>
            Planetary Data
          </motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5"
        >
          {venusStats.map((stat, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ y: -6, borderColor: 'rgba(232,194,133,0.22)' }}
              style={{
                padding: 'clamp(1.25rem, 3vw, 2.25rem)',
                background: 'rgba(200,120,48,0.04)',
                border: '1px solid rgba(232,194,133,0.09)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                transition: 'all 0.4s ease',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(232,194,133,0.28)',
                marginBottom: '0.9rem',
              }}>{stat.label}</p>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#E8C285',
                lineHeight: 1,
                marginBottom: '5px',
              }}>{stat.value}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                color: 'rgba(232,194,133,0.22)',
                letterSpacing: '0.04em',
                lineHeight: 1.5,
              }}>{stat.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ EDITORIAL DESCRIPTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#faf6ef',
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
                color: '#A8A29E',
                marginBottom: '2.5rem',
              }}>About Venus</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: '#1a0800',
                marginBottom: '2.5rem',
              }}>
                Earth&apos;s<br/>twisted<br/>twin
              </h2>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div style={{
                  width: 32,
                  height: 1,
                  background: 'rgba(200,120,48,0.45)',
                }} />
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.58rem',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'rgba(200,120,48,0.55)',
                }}>
                  Exhibit II of VIII
                </p>
              </div>
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-7" delay={0.15}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2.5rem)' }}>
              <blockquote style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.15rem, 2.8vw, 1.9rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#2a1200',
                marginBottom: '2.25rem',
                letterSpacing: '-0.01em',
                borderLeft: '2px solid rgba(200,120,48,0.2)',
                paddingLeft: '1.5rem',
              }}>
                &ldquo;{planet.tagline}&rdquo;
              </blockquote>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#57534E',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>
                {planet.description}
              </p>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#78716C',
                lineHeight: 1.9,
              }}>
                {planet.longDescription}
              </p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ ANOMALY CALLOUT: A DAY LONGER THAN A YEAR â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#1a0900',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(232,194,133,0.05)',
        borderBottom: '1px solid rgba(232,194,133,0.05)',
      }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          <SectionReveal>
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#E8C285',
                lineHeight: 0.9,
                marginBottom: '0.75rem',
              }}>243</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(232,194,133,0.3)',
                marginBottom: '0.5rem',
              }}>Days â€” One Rotation</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                color: 'rgba(232,194,133,0.2)',
                lineHeight: 1.6,
              }}>Venus spins so slowly that its day is longer than its entire year.</p>
            </motion.div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#C87830',
                lineHeight: 0.9,
                marginBottom: '0.75rem',
              }}>âˆ’1</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(232,194,133,0.3)',
                marginBottom: '0.5rem',
              }}>Retrograde Rotation</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                color: 'rgba(232,194,133,0.2)',
                lineHeight: 1.6,
              }}>It spins backwards. On Venus, the Sun rises in the West and sets in the East.</p>
            </motion.div>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#E8C285',
                lineHeight: 0.9,
                marginBottom: '0.75rem',
              }}>92Ã—</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'rgba(232,194,133,0.3)',
                marginBottom: '0.5rem',
              }}>Earth&apos;s Atmosphere</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                color: 'rgba(232,194,133,0.2)',
                lineHeight: 1.6,
              }}>The atmospheric pressure would crush a human like a depth of 900 metres of ocean.</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ ATMOSPHERE COMPOSITION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0500',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <div style={{ maxWidth: '860px' }}>
          <SectionReveal className="mb-16">
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(232,194,133,0.28)',
                marginBottom: '1rem',
              }}>Atmospheric Composition</p>
              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#E8C285',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}>
                A suffocating veil
              </h2>
            </motion.div>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}
          >
            {atmosphereLayers.map((gas, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
                    <span style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
                      fontStyle: 'italic',
                      color: '#E8C285',
                      fontWeight: 300,
                    }}>{gas.name}</span>
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.58rem',
                      letterSpacing: '0.12em',
                      color: 'rgba(232,194,133,0.3)',
                      textTransform: 'uppercase',
                    }}>{gas.formula}</span>
                    {gas.note && (
                      <span style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.58rem',
                        color: 'rgba(232,194,133,0.2)',
                        letterSpacing: '0.05em',
                      }}>{gas.note}</span>
                    )}
                  </div>
                  <span style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontStyle: 'italic',
                    color: gas.color,
                    fontWeight: 300,
                  }}>{gas.pct}%</span>
                </div>
                <div style={{
                  height: '2px',
                  background: 'rgba(232,194,133,0.05)',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%',
                      width: `${Math.max(gas.pct, 0.5)}%`,
                      background: gas.barColor,
                      transformOrigin: 'left',
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ PULL QUOTE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#120800',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(232,194,133,0.04)',
        borderBottom: '1px solid rgba(232,194,133,0.04)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '860px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(232,194,133,0.45)',
              lineHeight: 1.45,
              letterSpacing: '-0.01em',
              marginBottom: '2rem',
            }}>
              &ldquo;Venus is a cautionary tale â€” a planet that once may have harboured oceans,
              transformed into an inferno by a runaway greenhouse effect we are only beginning to understand.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(232,194,133,0.18)',
            }}>â€” NASA Planetary Science Division</p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0d0500',
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
              color: 'rgba(232,194,133,0.2)',
              marginBottom: '0.75rem',
            }}>Next Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(232,194,133,0.65)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit III<br/>
              <span style={{ color: '#4B9CD3' }}>Earth</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(232,194,133,0.22)',
              marginTop: '0.75rem',
            }}>The Living World</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/earth')}
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
              color: 'rgba(232,194,133,0.3)',
            }}>Enter Exhibit III</span>
            <span style={{ color: '#4B9CD3', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
