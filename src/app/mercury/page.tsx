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

const planet = getPlanetBySlug('mercury')!

// â”€â”€ Data grids â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const techSpecs = [
  { key: 'DIAMETER', value: '4,879 KM', sub: '0.38 Ã— Earth' },
  { key: 'MASS', value: '3.30 Ã— 10Â²Â³ kg', sub: '0.055 Ã— Earth' },
  { key: 'GRAVITY', value: '3.7 m/sÂ²', sub: '0.38g' },
  { key: 'ORBIT PERIOD', value: '87.97 DAYS', sub: 'Fastest planet' },
  { key: 'ROTATION', value: '58.6 DAYS', sub: 'Tidally semi-locked' },
  { key: 'DISTANCE', value: '57.9M KM', sub: 'From the Sun' },
  { key: 'MOONS', value: '0', sub: 'No natural satellites' },
  { key: 'TEMP RANGE', value: '610Â°C SWING', sub: 'âˆ’180 to +430 Â°C' },
]

export default function MercuryPage() {
  const { navigateTo } = useTransition()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 500], [0, 120])
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0])

  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!orbitRef.current) return
    const ctx = gsap.context(() => {
      gsap.to('.orbit-dot', {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
      gsap.to('.orbit-ring', {
        rotation: -360,
        duration: 12,
        repeat: -1,
        ease: 'none',
        transformOrigin: '50% 50%',
      })
    }, orbitRef)
    return () => ctx.revert()
  }, [])

  return (
    <div style={{ background: '#0a0a0a', minHeight: '100vh' }}>

      <PlanetHero
        image="/images/mercury-hero.png"
        exhibitLabel="Exhibit I â€” The Solar Museum"
        name="Mercury"
        subtitle="The Scorched Messenger"
        description="The smallest planet, closest to the Sun â€” a world of extreme temperature swings and ancient craters."
        stats={[
          { label: 'From the Sun', value: '57.9M km' },
          { label: 'Orbit', value: '88 Days' },
          { label: 'Moons', value: '0' },
          { label: 'Gravity', value: '0.38g' },
        ]}
        accentColor="#B5B3BB"
        overlayColor="#080808"
        imageOpacity={0.82}
      />

      {/* â”€â”€ SUBTITLE BAND â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div
        style={{
          background: '#B5B3BB',
          paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
          paddingBlock: '1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#0a0a0a',
          }}
        >
          {planet.subtitle}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.65rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.45)',
          }}
        >
          {planet.travelTime}
        </p>
      </div>

      {/* â”€â”€ TECHNICAL DATA GRID â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        style={{
          background: '#0d0d0d',
          paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
          paddingBlock: 'clamp(4rem, 8vw, 7rem)',
        }}
      >
        <SectionReveal className="mb-12">
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(181,179,187,0.35)',
            }}
          >
            Technical Specifications
          </motion.h2>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ border: '1px solid rgba(181,179,187,0.08)' }}
        >
          {techSpecs.map((spec, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group"
              style={{
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                borderRight: i % 4 !== 3 ? '1px solid rgba(181,179,187,0.08)' : undefined,
                borderBottom: i < 4 ? '1px solid rgba(181,179,187,0.08)' : undefined,
                background: '#0d0d0d',
                transition: 'background 0.3s',
              }}
              whileHover={{ background: '#141414' }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(181,179,187,0.3)',
                  marginBottom: '0.75rem',
                }}
              >
                {spec.key}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1.25rem, 3vw, 2rem)',
                  fontWeight: 500,
                  color: '#B5B3BB',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}
              >
                {spec.value}
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  color: 'rgba(181,179,187,0.25)',
                  letterSpacing: '0.05em',
                }}
              >
                {spec.sub}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* â”€â”€ DESCRIPTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        style={{
          background: '#fff',
          paddingInline: 'clamp(1.5rem, 8vw, 10rem)',
          paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
          <SectionReveal className="md:col-span-4">
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#A8A29E',
              }}
            >
              About Mercury
            </motion.p>
          </SectionReveal>
          <SectionReveal className="md:col-span-8" delay={0.1}>
            <motion.h2
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
                color: '#0a0a0a',
                marginBottom: '2rem',
              }}
            >
              {planet.tagline}
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#57534E',
                lineHeight: 1.85,
                marginBottom: '1.5rem',
              }}
            >
              {planet.description}
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(0.9375rem, 1.5vw, 1.0625rem)',
                color: '#78716C',
                lineHeight: 1.85,
              }}
            >
              {planet.longDescription}
            </motion.p>
          </SectionReveal>
        </div>
      </section>

      {/* â”€â”€ ATMOSPHERE SECTION â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        style={{
          background: '#0d0d0d',
          paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
          paddingBlock: 'clamp(4rem, 8vw, 6rem)',
        }}
      >
        <div className="max-w-6xl mx-auto">
          <SectionReveal className="mb-12">
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(181,179,187,0.35)',
              }}
            >
              Atmospheric Composition
            </motion.p>
          </SectionReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-3"
          >
            {planet.atmosphere.map((element, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid rgba(181,179,187,0.12)',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(181,179,187,0.6)',
                  fontWeight: 500,
                }}
              >
                {element}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ NEXT EXHIBIT CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <section
        style={{
          background: '#0a0a0a',
          paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
          paddingBlock: 'clamp(4rem, 8vw, 7rem)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <SectionReveal className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.6rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.2)',
                marginBottom: '0.75rem',
              }}
            >
              Next Exhibit
            </motion.p>
            <motion.h3
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              Exhibit II
              <br />
              <em>Venus</em>
            </motion.h3>
            <motion.p
              variants={fadeUp}
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.75rem',
                color: 'rgba(255,255,255,0.25)',
                marginTop: '0.75rem',
              }}
            >
              The Veiled Inferno
            </motion.p>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/venus')}
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
            <span
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.4)',
              }}
            >
              Enter Exhibit II
            </span>
            <span
              style={{
                color: '#E8C285',
                fontSize: '1.25rem',
                lineHeight: 1,
              }}
            >
              â†’
            </span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
