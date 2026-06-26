'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'

const FACTS = [
  {
    planet: 'Jupiter',
    color: '#C88B3A',
    teaser: 'Protects Earth',
    front: 'Jupiter could fit 1,300 Earths inside it.',
    back: 'Jupiter\'s enormous gravity acts as a shield — it captures or deflects asteroids and comets that would otherwise strike Earth. Without Jupiter, life on our planet might never have had time to evolve.',
  },
  {
    planet: 'Venus',
    color: '#E8C285',
    teaser: 'Spins Backwards',
    front: 'Venus rotates in the opposite direction to most planets.',
    back: 'On Venus, the Sun rises in the west and sets in the east. Its day is longer than its year — a single Venusian day lasts 243 Earth days, while its year is only 225 days.',
  },
  {
    planet: 'Mars',
    color: '#C1440E',
    teaser: 'Tallest Mountain',
    front: 'Olympus Mons is nearly 3× taller than Everest.',
    back: 'At 21.9 km above the Martian surface, Olympus Mons is the tallest volcano in the solar system. It\'s so wide (600 km) that standing at its rim, you couldn\'t see the centre — it would be below the horizon.',
  },
  {
    planet: 'Neptune',
    color: '#4B70DD',
    teaser: 'Supersonic Winds',
    front: 'Neptune\'s winds reach 2,100 km/h.',
    back: 'The fastest winds in the solar system howl across Neptune — over three times faster than Earth\'s most powerful hurricanes. Despite being the farthest planet from the Sun, Neptune generates enormous internal heat that drives these incredible storms.',
  },
  {
    planet: 'Saturn',
    color: '#E8C878',
    teaser: 'Would Float',
    front: 'Saturn is the only planet less dense than water.',
    back: 'Saturn\'s density is just 0.69 g/cm³ — lighter than water. If you could find an ocean large enough, Saturn would float in it. Its rings are composed of billions of ice particles ranging from tiny grains to chunks the size of houses.',
  },
  {
    planet: 'Mercury',
    color: '#B5B3BB',
    teaser: 'Extreme Days',
    front: 'A Mercury day is longer than a Mercury year.',
    back: 'Mercury rotates so slowly that its day (59 Earth days) is longer than its year (88 Earth days). One Mercury solar day — sunrise to sunrise — is 176 Earth days, meaning the Sun sometimes appears to reverse direction in Mercury\'s sky.',
  },
  {
    planet: 'Earth',
    color: '#4B9CD3',
    teaser: 'Drifting Moon',
    front: 'The Moon moves 3.8 cm away from Earth every year.',
    back: 'Tidal interactions between Earth and the Moon are causing the Moon to slowly recede. In about 600 million years, the Moon will appear too small to fully cover the Sun — total solar eclipses will become impossible. Ancient Earth had no such eclipses either.',
  },
  {
    planet: 'Uranus',
    color: '#82D8D8',
    teaser: 'Sideways Planet',
    front: 'Uranus rotates on its side — at a 98° tilt.',
    back: 'Uranus\'s extreme tilt means its poles experience 42 years of continuous sunlight followed by 42 years of darkness. Scientists believe a massive collision billions of years ago knocked Uranus onto its side, giving it the most extreme seasons in the solar system.',
  },
]

function FlipCard({ fact, index }: { fact: typeof FACTS[0]; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={{ perspective: '1200px', cursor: 'pointer' }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped(f => !f)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          width: '100%',
          height: '220px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: '#fafaf9',
            border: '1px solid #E7E5E4',
            borderRadius: '10px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: fact.color, flexShrink: 0 }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: fact.color, fontWeight: 600 }}>
                {fact.planet}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(1.2rem, 2.5vw, 1.55rem)', fontWeight: 400, color: '#0a0a0a', lineHeight: 1.25, letterSpacing: '-0.01em' }}>
              {fact.front}
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#A8A29E' }}>
              Hover to reveal
            </span>
            <span style={{ color: '#FFB400', fontSize: '0.7rem' }}>→</span>
          </div>
        </div>

        {/* Back face */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: '#0a0a0a',
            border: `1px solid ${fact.color}40`,
            borderRadius: '10px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: `0 0 40px ${fact.color}18`,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: fact.color }} />
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: fact.color, fontWeight: 600 }}>
                {fact.teaser}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
              {fact.back}
            </p>
          </div>
          <div style={{ width: '30%', height: 1, background: `linear-gradient(to right, ${fact.color}, transparent)` }} />
        </div>
      </motion.div>
    </motion.div>
  )
}

export function FunFacts() {
  return (
    <section
      style={{
        background: '#fafaf9',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '10px' }}>
              Did You Know
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}>
              Fascinating
              <br /><em>Facts</em>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.78rem', color: '#A8A29E', maxWidth: '200px', textAlign: 'right', lineHeight: 1.7 }}>
            Hover each card to reveal the full story.
          </motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {FACTS.map((fact, i) => (
            <FlipCard key={fact.planet} fact={fact} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
