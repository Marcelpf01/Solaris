'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp } from '@/lib/animations'

const FEATURED_PLANETS = [
  {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'The Giant Guardian',
    tagline: 'A world so vast it could swallow all other planets combined.',
    color: '#C88B3A',
    roman: 'V',
    image: '/images/jupiter-hero.png',
    imagePosition: 'center',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'The Ringed Jewel',
    tagline: 'Beauty sculpted from ice and gravity across 282,000 kilometres.',
    color: '#E8C878',
    roman: 'VI',
    image: '/images/saturn-rings.png',
    imagePosition: 'center left',
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'The Living World',
    tagline: 'The only oasis of life in the known universe.',
    color: '#4B9CD3',
    roman: 'III',
    image: '/images/earth-hero.png',
    imagePosition: 'center',
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Frontier World',
    tagline: "Humanity's next destination — a cold, red world waiting to be explored.",
    color: '#C1440E',
    roman: 'IV',
    image: '/images/mars-hero.png',
    imagePosition: 'center',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'The Dark Sovereign',
    tagline: 'The wind-scarred edge of the solar system — cold, blue, and unknowable.',
    color: '#4B70DD',
    roman: 'VIII',
    image: '/images/neptune-sphere.png',
    imagePosition: 'center',
  },
]

export function FeaturedPlanet() {
  const { navigateTo } = useTransition()
  const [planet, setPlanet] = useState(FEATURED_PLANETS[0])

  useEffect(() => {
    const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24))
    setPlanet(FEATURED_PLANETS[dayIndex % FEATURED_PLANETS.length])
  }, [])

  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        background: '#030303',
      }}
    >
      {/* Full-bleed planet image */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <img
          src={planet.image}
          alt={planet.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: planet.imagePosition,
            opacity: 0.55,
            transition: 'opacity 0.8s ease',
          }}
        />
        {/* Left gradient for text readability */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(3,3,3,0.97) 0%, rgba(3,3,3,0.75) 40%, rgba(3,3,3,0.25) 70%, transparent 100%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(3,3,3,0.6) 0%, transparent 40%)',
        }} />
        {/* Accent color tint */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 70% 50%, ${planet.color}12, transparent 60%)`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10" style={{ paddingInline: 'clamp(1.5rem, 5vw, 5rem)', paddingBlock: 'clamp(5rem, 10vw, 7rem)' }}>
        <SectionReveal>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)', fontSize: '0.6rem', letterSpacing: '0.25em',
            textTransform: 'uppercase', color: `${planet.color}cc`, marginBottom: '1.5rem',
          }}>
            Featured Exhibit · Exhibit {planet.roman}
          </motion.p>

          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(4rem, 11vw, 10rem)',
            fontWeight: 300,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 0.88,
            marginBottom: '1rem',
          }}>
            {planet.name}
          </motion.h2>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-inter)', fontSize: '0.7rem', letterSpacing: '0.18em',
            textTransform: 'uppercase', color: planet.color, marginBottom: '1.75rem', fontWeight: 500,
          }}>
            {planet.subtitle}
          </motion.p>

          <motion.p variants={fadeUp} style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            color: 'rgba(255,255,255,0.42)',
            lineHeight: 1.5,
            fontStyle: 'italic',
            maxWidth: '460px',
            marginBottom: '2.5rem',
          }}>
            &ldquo;{planet.tagline}&rdquo;
          </motion.p>

          <motion.div variants={fadeUp}>
            <motion.button
              onClick={() => navigateTo(`/${planet.id}`)}
              whileHover={{ scale: 1.03, backgroundColor: `${planet.color}ee` }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: planet.color,
                color: '#000',
                border: 'none',
                padding: '0.9rem 2.4rem',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '2px',
                transition: 'background 0.2s',
              }}
            >
              Explore Exhibit {planet.roman}
            </motion.button>
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  )
}
