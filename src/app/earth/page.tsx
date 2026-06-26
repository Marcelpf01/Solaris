'use client'

import { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import { motion, useScroll, useTransform } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTransition } from '@/providers/TransitionProvider'
import { getPlanetBySlug } from '@/lib/planets'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'
import { PlanetHero } from '@/components/shared/PlanetHero'

const InteractiveGlobe = dynamic(
  () => import('@/components/ui/wireframe-dotted-globe'),
  { ssr: false, loading: () => <div style={{ width: '100%', height: 500, background: '#000', borderRadius: 16 }} /> }
)

gsap.registerPlugin(ScrollTrigger)

const planet = getPlanetBySlug('earth')!

const earthSpecs = [
  { label: 'Diameter', value: '12,742', unit: 'km', note: 'Largest terrestrial planet' },
  { label: 'Distance from Sun', value: '149.6', unit: 'M km', note: '1 Astronomical Unit' },
  { label: 'Orbital Period', value: '365.25', unit: 'days', note: 'One Earth year' },
  { label: 'Surface Temperature', value: 'âˆ’89 to 58', unit: 'Â°C', note: 'Life-sustaining range' },
  { label: 'Natural Satellites', value: '1', unit: 'moon', note: 'Stabilises Earth\'s axial tilt' },
  { label: 'Surface Water', value: '71', unit: '%', note: 'Unique in the solar system' },
  { label: 'Gravity', value: '9.81', unit: 'm/sÂ²', note: '1.0g â€” our baseline' },
  { label: 'Atmosphere', value: '78% Nâ‚‚', unit: '', note: '21% Oâ‚‚ â€” breathable' },
]

const achievements = [
  { year: '~3.5B BCE', label: 'First Life', desc: 'Single-celled organisms emerge in primordial oceans' },
  { year: '~540M BCE', label: 'Cambrian Explosion', desc: 'Rapid diversification of complex animal life' },
  { year: '~65M BCE', label: 'End of Dinosaurs', desc: 'Mass extinction opens the age of mammals' },
  { year: '~300K BCE', label: 'Homo Sapiens', desc: 'Modern humans emerge in Africa' },
  { year: '1969', label: 'We Left', desc: 'Apollo 11 â€” humanity sets foot on another world' },
  { year: '2021', label: 'James Webb', desc: 'We peer back 13.8 billion years to the dawn of time' },
]

export default function EarthPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const heroParallax = useTransform(scrollY, [0, 700], [0, 160])
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])

  const globeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!globeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.globe-grid', {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
      gsap.to('.globe-grid-2', {
        rotation: -360,
        duration: 90,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    }, globeRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/earth-hero.png"
        exhibitLabel="Exhibit III â€” The Solar Museum"
        name="Earth"
        subtitle="The Living World"
        description="The only world we know of that harbors life â€” 71% water, one moon, 8 billion inhabitants."
        stats={[
          { label: 'Diameter', value: '12,742 km' },
          { label: 'Moon', value: '1' },
          { label: 'Surface Water', value: '71%' },
          { label: 'Inhabitants', value: '8B' },
        ]}
        accentColor="#4B9CD3"
        overlayColor="#030a12"
        imageOpacity={0.82}
      />
      {/* â”€â”€ IDENTITY BAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div style={{
        background: '#f5f8fb',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: '1.5rem',
        borderBottom: '1px solid rgba(75,156,211,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: 'clamp(2rem, 5vw, 5rem)',
        overflowX: 'auto',
      }}>
        {[
          { label: 'Type', value: 'Terrestrial Planet' },
          { label: 'Position', value: '3rd from Sun' },
          { label: 'Mass', value: '5.97 Ã— 10Â²â´ kg' },
          { label: 'Moons', value: '1 (Luna)' },
          { label: 'Life', value: 'Confirmed' },
        ].map((item, i) => (
          <div key={i} style={{ flexShrink: 0 }}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.53rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(75,156,211,0.45)',
              marginBottom: '4px',
            }}>{item.label}</p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: '#0a0a0a',
              fontWeight: 500,
            }}>{item.value}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ SPEC GRID â€” Apple-style â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#ffffff',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-14">
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.26em',
            textTransform: 'uppercase',
            color: 'rgba(10,10,10,0.25)',
          }}>Technical Specifications</motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ border: '1px solid rgba(0,0,0,0.06)', background: 'rgba(0,0,0,0.06)' }}
        >
          {earthSpecs.map((spec, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              whileHover={{ background: '#f0f7ff' }}
              style={{
                padding: 'clamp(1.5rem, 3vw, 2rem)',
                background: '#ffffff',
                transition: 'background 0.25s ease',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.53rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(10,10,10,0.28)',
                marginBottom: '0.75rem',
              }}>{spec.label}</p>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '4px' }}>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.6rem)',
                  fontWeight: 600,
                  color: '#0a0a0a',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                }}>{spec.value}</p>
                {spec.unit && (
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.62rem',
                    fontWeight: 500,
                    color: '#4B9CD3',
                  }}>{spec.unit}</p>
                )}
              </div>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                color: 'rgba(10,10,10,0.3)',
                lineHeight: 1.5,
              }}>{spec.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ INTERACTIVE GLOBE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{ background: '#ffffff', paddingInline: 'clamp(1.5rem, 6vw, 6rem)', paddingBlock: 'clamp(4rem, 8vw, 7rem)' }}>
        <SectionReveal className="mb-10">
          <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,10,10,0.28)', marginBottom: '0.5rem' }}>Interactive</p>
              <h2 style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.02em', color: '#0a0a0a', lineHeight: 1 }}>Explore the Globe</h2>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.68rem', color: 'rgba(10,10,10,0.35)', maxWidth: 260, lineHeight: 1.6 }}>
              Drag to rotate. Scroll to zoom. Every continent, every coastline.
            </p>
          </motion.div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <motion.div variants={fadeUp}>
            <InteractiveGlobe width={1200} height={560} className="w-full" />
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ EDITORIAL DESCRIPTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#f5f8fb',
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
                color: 'rgba(10,10,10,0.28)',
                marginBottom: '2.5rem',
              }}>About Earth</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.05,
                color: '#0a0a0a',
                marginBottom: '1.5rem',
              }}>The only world that knows itself</h2>

              <div style={{ width: 28, height: '1.5px', background: '#4B9CD3' }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-8" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#2a2a2a',
                lineHeight: 1.9,
                marginBottom: '1.75rem',
              }}>{planet.description}</p>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#555',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ ATMOSPHERE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#ffffff',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        borderBottom: '1px solid rgba(0,0,0,0.05)',
      }}>
        <SectionReveal className="mb-14">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.25)',
              marginBottom: '0.75rem',
            }}>Atmospheric Composition</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 300,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
            }}>The air we breathe</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', gap: '2rem' }}
        >
          {[
            { name: 'Nitrogen', symbol: 'Nâ‚‚', pct: 78, color: '#0a0a0a' },
            { name: 'Oxygen', symbol: 'Oâ‚‚', pct: 21, color: '#4B9CD3' },
            { name: 'Argon', symbol: 'Ar', pct: 0.9, color: '#999' },
            { name: 'Carbon Dioxide', symbol: 'COâ‚‚', pct: 0.04, color: '#ccc', note: '+ trace gases' },
          ].map((gas, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem' }}>
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.8rem',
                    fontWeight: 500,
                    color: '#0a0a0a',
                  }}>{gas.name}</span>
                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.58rem',
                    letterSpacing: '0.08em',
                    color: 'rgba(10,10,10,0.32)',
                  }}>{gas.symbol}</span>
                  {gas.note && (
                    <span style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.55rem',
                      color: 'rgba(10,10,10,0.2)',
                    }}>{gas.note}</span>
                  )}
                </div>
                <span style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: gas.color,
                  letterSpacing: '-0.01em',
                }}>{gas.pct}%</span>
              </div>
              <div style={{ height: '2px', background: '#f0f0f0' }}>
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: '100%',
                    width: `${Math.max(gas.pct, 0.5)}%`,
                    background: gas.color,
                    transformOrigin: 'left',
                  }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ TIMELINE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0a0a0a',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal className="mb-16">
          <motion.div variants={fadeUp}>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.26em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
              marginBottom: '0.75rem',
            }}>4.5 Billion Years</p>
            <h2 style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#ffffff',
              letterSpacing: '-0.02em',
            }}>A brief history</h2>
          </motion.div>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ maxWidth: '720px' }}
        >
          {achievements.map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: '130px 1fr',
                gap: '2rem',
                paddingBlock: '1.75rem',
                borderBottom: i < achievements.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              }}
            >
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.1em',
                color: '#4B9CD3',
                fontWeight: 500,
                paddingTop: '2px',
              }}>{item.year}</p>
              <div>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  marginBottom: '4px',
                  letterSpacing: '0.01em',
                }}>{item.label}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  color: 'rgba(255,255,255,0.3)',
                  lineHeight: 1.6,
                }}>{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ PALE BLUE DOT QUOTE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#f5f8fb',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto' }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.5rem, 4vw, 3rem)',
              fontWeight: 300,
              color: '#0a0a0a',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              &ldquo;Look again at that dot. That&apos;s here. That&apos;s home. That&apos;s us. On it everyone you love,
              everyone you know, everyone you ever heard of, every human being who ever was, lived out their lives.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.3)',
            }}>â€” Carl Sagan, Pale Blue Dot, 1994</p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#ffffff',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        borderTop: '1px solid rgba(0,0,0,0.06)',
      }}>
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(10,10,10,0.2)',
              marginBottom: '0.75rem',
            }}>Next Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 300,
              color: '#0a0a0a',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit IV<br/>
              <span style={{ color: '#C1440E' }}>Mars</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(10,10,10,0.25)',
              marginTop: '0.75rem',
            }}>The Frontier World</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/mars')}
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
              color: 'rgba(10,10,10,0.3)',
            }}>Enter Exhibit IV</span>
            <span style={{ color: '#C1440E', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
