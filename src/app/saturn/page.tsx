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

const planet = getPlanetBySlug('saturn')!

const ringGroups = [
  {
    id: 'D',
    label: 'Ring D',
    distance: '67,000 â€“ 74,500 km',
    width: '7,500 km',
    note: 'Innermost ring. Extremely faint, barely visible. Discovered by Voyager.',
  },
  {
    id: 'C',
    label: 'Ring C',
    distance: '74,500 â€“ 92,000 km',
    width: '17,500 km',
    note: 'The "Crepe Ring." Semi-transparent, wide, with a faint brownish tint.',
  },
  {
    id: 'B',
    label: 'Ring B',
    distance: '92,000 â€“ 117,500 km',
    width: '25,500 km',
    note: 'The brightest and most massive ring. Contains most of the ring material.',
  },
  {
    id: 'CASSINI',
    label: 'Cassini Division',
    distance: '117,500 â€“ 122,200 km',
    width: '4,700 km',
    note: 'A gap between B and A rings caused by orbital resonance with the moon Mimas.',
    isGap: true,
  },
  {
    id: 'A',
    label: 'Ring A',
    distance: '122,200 â€“ 136,800 km',
    width: '14,600 km',
    note: 'The outer bright ring. Contains the Encke Gap and the F Ring shepherd moons.',
  },
  {
    id: 'F',
    label: 'Ring F',
    distance: '140,220 km',
    width: '30â€“500 km',
    note: 'A thin, braided ring shaped by two small shepherd moons: Prometheus and Pandora.',
  },
]

const saturnFacts = [
  { value: '282,000', unit: 'km', label: 'Ring Span', note: 'Nearly as wide as the distance from Earth to the Moon' },
  { value: '10m', unit: '', label: 'Ring Thickness', note: 'The rings are thinner than a sheet of paper, proportionally' },
  { value: '146', unit: '', label: 'Known Moons', note: 'More than any other planet in the solar system' },
  { value: '0.69', unit: 'g/cmÂ³', label: 'Density', note: 'The only planet that would float on water' },
]

// Deterministic pseudo-random star positions (avoids SSR hydration mismatch)
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000
  return x - Math.floor(x)
}
const STARS = Array.from({ length: 80 }, (_, i) => ({
  x: seededRandom(i * 3.1),
  y: seededRandom(i * 3.1 + 1),
  size: seededRandom(i * 3.1 + 2) > 0.8 ? 2 : 1,
  opacity: seededRandom(i * 3.1 + 2) * 0.5 + 0.05,
}))

export default function SaturnPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()

  // Scroll-controlled ring tilt â€” as user scrolls, rings rotate
  const ringTilt = useTransform(scrollY, [0, 600], [74, 58])
  const heroOpacity = useTransform(scrollY, [0, 700], [1, 0])
  const heroY = useTransform(scrollY, [0, 700], [0, 180])

  // Horizontal scroll section
  const hsContainerRef = useRef<HTMLDivElement>(null)
  const hsTrackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!hsTrackRef.current || !hsContainerRef.current) return

      const panels = gsap.utils.toArray<HTMLElement>('.ring-panel')
      const totalWidth = () => hsTrackRef.current!.scrollWidth - window.innerWidth

      ScrollTrigger.create({
        trigger: hsContainerRef.current,
        start: 'top top',
        pin: true,
        scrub: 1,
        end: () => `+=${totalWidth()}`,
        invalidateOnRefresh: true,
        animation: gsap.to(hsTrackRef.current, {
          x: () => -totalWidth(),
          ease: 'none',
        }),
      })
    })
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#050305', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/saturn-hero.png"
        exhibitLabel="Exhibit VI â€” The Solar Museum"
        name="Saturn"
        subtitle="The Ringed Jewel"
        description="The most beautiful object in the solar system â€” its rings spanning 282,000 km yet only metres thick."
        stats={[
          { label: 'Moons', value: '146' },
          { label: 'Ring Span', value: '282,000 km' },
          { label: 'Density', value: '0.69 g/cmÂ³' },
          { label: 'Gravity', value: '1.07g' },
        ]}
        accentColor="#C8A050"
        overlayColor="#050305"
        imageOpacity={0.62}
      />
      {/* â”€â”€ STATS FLOAT BAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#0a0600',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(3rem, 6vw, 5rem)',
        borderTop: '1px solid rgba(232,200,120,0.06)',
        borderBottom: '1px solid rgba(232,200,120,0.06)',
      }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {saturnFacts.map((fact, i) => (
            <motion.div key={i} variants={fadeUp} style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '4px', marginBottom: '6px' }}>
                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#E8C878',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                }}>{fact.value}</p>
                {fact.unit && (
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.6rem',
                    color: 'rgba(232,200,120,0.4)',
                    letterSpacing: '0.04em',
                  }}>{fact.unit}</p>
                )}
              </div>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(232,200,120,0.35)',
                marginBottom: '4px',
              }}>{fact.label}</p>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.58rem',
                color: 'rgba(232,200,120,0.18)',
                lineHeight: 1.5,
              }}>{fact.note}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ HORIZONTAL SCROLL: THE RING SYSTEM â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        ref={hsContainerRef}
        style={{ height: '100svh', overflow: 'hidden', background: '#050305' }}
      >
        {/* Header */}
        <div style={{
          position: 'absolute',
          top: 'clamp(3rem, 6vw, 5rem)',
          left: 'clamp(1.5rem, 6vw, 6rem)',
          zIndex: 10,
        }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(232,200,120,0.3)',
              marginBottom: '0.5rem',
            }}
          >
            Scroll to explore â€” Ring Anatomy
          </motion.p>
          <p style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'rgba(232,200,120,0.55)',
            letterSpacing: '-0.02em',
          }}>
            Thousands of individual ringlets
          </p>
        </div>

        {/* Horizontal track */}
        <div
          ref={hsTrackRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            gap: 0,
          }}
        >
          {ringGroups.map((ring, i) => (
            <div
              key={ring.id}
              className="ring-panel"
              style={{
                flexShrink: 0,
                width: '70vw',
                maxWidth: '700px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                paddingInline: 'clamp(3rem, 6vw, 6rem)',
                paddingBlock: 'clamp(6rem, 10vw, 8rem)',
                borderRight: '1px solid rgba(232,200,120,0.06)',
              }}
            >
              {/* Ring visualisation bar */}
              <div style={{
                height: ring.isGap ? 2 : Math.min(parseInt(ring.width) / 300 + 10, 60),
                background: ring.isGap
                  ? 'rgba(232,200,120,0.04)'
                  : `linear-gradient(to right, rgba(232,200,120,0.6), rgba(232,200,120,0.2))`,
                marginBottom: '2rem',
                border: ring.isGap ? '1px dashed rgba(232,200,120,0.1)' : 'none',
              }} />

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.55rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: ring.isGap ? 'rgba(232,200,120,0.2)' : 'rgba(232,200,120,0.35)',
                marginBottom: '0.75rem',
              }}>Ring Group</p>

              <h3 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: ring.isGap ? 'rgba(232,200,120,0.2)' : '#E8C878',
                letterSpacing: '-0.03em',
                lineHeight: 0.9,
                marginBottom: '1.5rem',
              }}>{ring.label}</h3>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                color: ring.isGap ? 'rgba(232,200,120,0.18)' : 'rgba(232,200,120,0.35)',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
                maxWidth: '400px',
              }}>{ring.note}</p>

              <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,200,120,0.2)', marginBottom: '3px' }}>Distance from planet</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'rgba(232,200,120,0.45)', fontWeight: 500 }}>{ring.distance}</p>
                </div>
                <div>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.5rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(232,200,120,0.2)', marginBottom: '3px' }}>Width</p>
                  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: 'rgba(232,200,120,0.45)', fontWeight: 500 }}>{ring.width}</p>
                </div>
              </div>

              {/* Progress dots */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '3rem' }}>
                {ringGroups.map((_, j) => (
                  <div key={j} style={{
                    width: i === j ? 20 : 4,
                    height: 2,
                    background: i === j ? '#E8C878' : 'rgba(232,200,120,0.15)',
                    borderRadius: 1,
                    transition: 'width 0.3s ease',
                  }} />
                ))}
              </div>
            </div>
          ))}

          {/* End panel */}
          <div
            className="ring-panel"
            style={{
              flexShrink: 0,
              width: '60vw',
              maxWidth: '600px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              paddingInline: 'clamp(3rem, 6vw, 6rem)',
            }}
          >
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(232,200,120,0.25)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}>
              Seven major ring groups.<br/>
              Thousands of ringlets.<br/>
              One breathtaking system.
            </p>
          </div>
        </div>
      </div>

      {/* â”€â”€ DESCRIPTION â€” editorial â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#f9f5ed',
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
                color: '#A8A29E',
                marginBottom: '2.5rem',
              }}>About Saturn</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
                color: '#3a2800',
                marginBottom: '1.5rem',
              }}>
                The most beautiful object in the solar system
              </h2>

              <div style={{ width: 28, height: '1.5px', background: '#C89840', opacity: 0.6 }} />
            </motion.div>
          </SectionReveal>

          <SectionReveal className="md:col-span-8" delay={0.12}>
            <motion.div variants={fadeUp} style={{ paddingTop: 'clamp(0px, 3vw, 2rem)' }}>
              <blockquote style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.15rem, 2.8vw, 1.9rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.5,
                color: '#3a2800',
                marginBottom: '2.25rem',
                letterSpacing: '-0.01em',
                borderLeft: '2px solid rgba(200,150,40,0.25)',
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
              }}>{planet.description}</p>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#78716C',
                lineHeight: 1.9,
              }}>{planet.longDescription}</p>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ TITAN CALLOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#080500',
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <SectionReveal>
            <motion.div variants={fadeUp}>
              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(232,200,120,0.3)',
                marginBottom: '1rem',
              }}>Saturn&apos;s Largest Moon</p>

              <h2 style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                fontWeight: 200,
                fontStyle: 'italic',
                color: '#E8C878',
                letterSpacing: '-0.04em',
                lineHeight: 0.9,
                marginBottom: '1.5rem',
              }}>Titan</h2>

              <p style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)',
                color: 'rgba(232,200,120,0.4)',
                lineHeight: 1.85,
              }}>
                Titan is the only moon in the solar system with a substantial atmosphere â€”
                a thick nitrogen atmosphere with methane lakes and rivers on its surface.
                It is larger than the planet Mercury. The Cassiniâ€“Huygens mission landed on
                Titan in 2005, sending back the first images from the surface of an outer
                solar system world.
              </p>
            </motion.div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <motion.div variants={fadeUp}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  { label: 'Atmosphere', value: 'Nitrogen + Methane' },
                  { label: 'Diameter', value: '5,150 km' },
                  { label: 'Surface', value: 'Lakes of liquid methane' },
                  { label: 'Only visited by', value: 'Cassiniâ€“Huygens (2005)' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: '1.5rem',
                    borderBottom: '1px solid rgba(232,200,120,0.06)',
                  }}>
                    <p style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: 'rgba(232,200,120,0.25)',
                    }}>{item.label}</p>
                    <p style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.72rem',
                      color: 'rgba(232,200,120,0.6)',
                      fontWeight: 500,
                      textAlign: 'right',
                    }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ GALILEO QUOTE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#050305',
        paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid rgba(232,200,120,0.04)',
        borderBottom: '1px solid rgba(232,200,120,0.04)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.4rem, 3.5vw, 2.8rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(232,200,120,0.4)',
              lineHeight: 1.45,
              marginBottom: '2rem',
            }}>
              &ldquo;I do not know what to say in a case so surprising, so unlooked for and so novel.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(232,200,120,0.18)',
            }}>â€” Galileo Galilei, upon first observing Saturn&apos;s rings through a telescope, 1610</p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section style={{
        background: '#080500',
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
              color: 'rgba(232,200,120,0.2)',
              marginBottom: '0.75rem',
            }}>Next Exhibit</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(232,200,120,0.5)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Exhibit VII<br/>
              <span style={{ color: '#82D8D8' }}>Uranus</span>
            </motion.h3>

            <motion.p variants={fadeUp} style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.72rem',
              color: 'rgba(232,200,120,0.18)',
              marginTop: '0.75rem',
            }}>The Tilted Giant</motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/uranus')}
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
              color: 'rgba(232,200,120,0.3)',
            }}>Enter Exhibit VII</span>
            <span style={{ color: '#82D8D8', fontSize: '1.25rem', lineHeight: 1 }}>â†’</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
