'use client'

import { motion } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp, staggerContainer } from '@/lib/animations'

const missions = [
  {
    year: '1969',
    name: 'Apollo 11',
    agency: 'NASA',
    type: 'Crewed Lunar',
    tagline: 'One small step.',
    desc: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon. 600 million people watched. Humanity was never the same.',
    status: 'Complete',
    color: '#FFB400',
  },
  {
    year: '1977',
    name: 'Voyager 1 & 2',
    agency: 'NASA/JPL',
    type: 'Interplanetary',
    tagline: 'Humanity\'s farthest reach.',
    desc: 'Two spacecraft launched 16 days apart on the Grand Tour of the outer solar system. Voyager 1 is now in interstellar space — the most distant human-made object in existence.',
    status: 'Active (interstellar)',
    color: '#C88B3A',
  },
  {
    year: '1990',
    name: 'Hubble Space Telescope',
    agency: 'NASA / ESA',
    type: 'Space Telescope',
    tagline: 'A window to the beginning.',
    desc: 'Despite a flawed mirror at launch, Hubble became the most important scientific instrument in human history — revealing the age of the universe, the existence of dark energy, and galaxies from 13.4 billion years ago.',
    status: 'Active',
    color: '#4B9CD3',
  },
  {
    year: '1997',
    name: 'Mars Pathfinder',
    agency: 'NASA/JPL',
    type: 'Mars Rover',
    tagline: 'First wheels on Mars.',
    desc: 'Sojourner, the first Mars rover, proved that robotic surface exploration was possible. It covered 100 metres of Martian terrain and sent back 16,500 images.',
    status: 'Complete',
    color: '#C1440E',
  },
  {
    year: '2004',
    name: 'Cassini–Huygens',
    agency: 'NASA / ESA / ASI',
    type: 'Saturn Orbiter',
    tagline: 'Thirteen years at Saturn.',
    desc: 'The most successful planetary mission ever flown. Cassini orbited Saturn for 13 years, discovering geysers on Enceladus, methane lakes on Titan, and 6 new moons. It ended with a deliberate plunge into Saturn\'s atmosphere in 2017.',
    status: 'Complete',
    color: '#E8C878',
  },
  {
    year: '2012',
    name: 'Curiosity Rover',
    agency: 'NASA/JPL',
    type: 'Mars Rover',
    tagline: 'Still roving after 12 years.',
    desc: 'The most capable rover ever sent to another planet. Curiosity found organic molecules, evidence of ancient lakes, and conditions that once could have supported microbial life. It used a revolutionary sky crane landing system.',
    status: 'Active',
    color: '#C1440E',
  },
  {
    year: '2021',
    name: 'James Webb Space Telescope',
    agency: 'NASA / ESA / CSA',
    type: 'Space Telescope',
    tagline: 'We can see the first light.',
    desc: 'The most powerful space telescope ever built. Webb images the universe in infrared, peering through dust clouds to capture star formation, exoplanet atmospheres, and galaxies from just 300 million years after the Big Bang.',
    status: 'Active',
    color: '#82D8D8',
  },
  {
    year: '2021',
    name: 'Perseverance + Ingenuity',
    agency: 'NASA/JPL',
    type: 'Mars Rover + Helicopter',
    tagline: 'First powered flight on another world.',
    desc: 'Perseverance caches rock samples for a future return mission — the first step in bringing Martian material to Earth. Ingenuity performed 72 flights, proving aerial exploration on Mars is possible.',
    status: 'Active',
    color: '#C1440E',
  },
]

export default function MissionsPage() {
  const { navigateTo } = useTransition()

  return (
    <div style={{ background: '#030303', minHeight: '100vh' }}>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingTop: 'clamp(7rem, 14vw, 12rem)',
        paddingBottom: 'clamp(4rem, 8vw, 7rem)',
        borderBottom: '1px solid rgba(255,180,0,0.06)',
      }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '0.6rem',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,180,0,0.35)',
            marginBottom: '1.5rem',
          }}
        >
          Mission Archive — SOLARIS
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(4rem, 14vw, 12rem)',
            fontWeight: 200,
            fontStyle: 'italic',
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 0.88,
            marginBottom: '1.5rem',
          }}
        >
          Humanity&apos;s<br/>
          greatest<br/>
          <em style={{ color: '#FFB400' }}>journeys</em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            color: 'rgba(255,255,255,0.3)',
            maxWidth: '520px',
            lineHeight: 1.75,
            marginTop: '1.5rem',
          }}
        >
          Eight decades of exploration. Billions of kilometres. Eight remarkable spacecraft.
          Each one a testament to what curiosity and determination can achieve.
        </motion.p>
      </section>

      {/* ── MISSION LIST ──────────────────────────────────────── */}
      <section style={{
        paddingInline: 'clamp(1.5rem, 6vw, 6rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
        >
          {missions.map((mission, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(70px, 8vw, 100px) 1fr',
                gap: '3rem',
                paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              {/* Year column */}
              <div style={{ paddingTop: '4px' }}>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.62rem',
                  fontWeight: 600,
                  color: mission.color,
                  letterSpacing: '0.06em',
                  marginBottom: '6px',
                }}>{mission.year}</p>
                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.5rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.15)',
                  lineHeight: 1.5,
                }}>{mission.status}</p>
              </div>

              {/* Content column */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.85rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: 1,
                  }}>{mission.name}</h3>

                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: mission.color,
                    border: `1px solid ${mission.color}`,
                    padding: '3px 10px',
                    opacity: 0.6,
                  }}>{mission.type}</span>

                  <span style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.5rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.2)',
                  }}>{mission.agency}</span>
                </div>

                <p style={{
                  fontFamily: 'var(--font-cormorant)',
                  fontSize: 'clamp(1rem, 2.2vw, 1.4rem)',
                  fontStyle: 'italic',
                  color: 'rgba(255,255,255,0.45)',
                  lineHeight: 1.3,
                  marginBottom: '0.85rem',
                  fontWeight: 300,
                }}>{mission.tagline}</p>

                <p style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.72rem',
                  color: 'rgba(255,255,255,0.22)',
                  lineHeight: 1.8,
                  maxWidth: '680px',
                }}>{mission.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── PULL QUOTE ────────────────────────────────────────── */}
      <section style={{
        background: '#050505',
        paddingInline: 'clamp(1.5rem, 8vw, 12rem)',
        paddingBlock: 'clamp(6rem, 12vw, 10rem)',
        borderTop: '1px solid rgba(255,255,255,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.03)',
      }}>
        <SectionReveal>
          <motion.div variants={fadeUp} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <motion.div
              animate={{ opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ width: 6, height: 6, borderRadius: '50%', background: '#FFB400', margin: '0 auto 3rem' }}
            />
            <p style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(1.5rem, 4.5vw, 3.5rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.4,
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              &ldquo;Every generation has the obligation to free men&apos;s minds for a look
              at new worlds — to look out from a higher plateau than the last generation.&rdquo;
            </p>
            <p style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.15)',
            }}>— Ellison Onizuka, NASA Astronaut</p>
          </motion.div>
        </SectionReveal>
      </section>

      {/* ── BACK TO MUSEUM ────────────────────────────────────── */}
      <section style={{
        background: '#030303',
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
              color: 'rgba(255,255,255,0.12)',
              marginBottom: '0.75rem',
            }}>Explore the planets</motion.p>

            <motion.h3 variants={fadeUp} style={{
              fontFamily: 'var(--font-cormorant)',
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              fontWeight: 200,
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.45)',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}>
              Return to<br/>
              <span style={{ color: '#FFB400' }}>SOLARIS</span>
            </motion.h3>
          </div>

          <motion.button
            variants={fadeUp}
            onClick={() => navigateTo('/')}
            whileHover={{ x: 6 }}
            style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.2)',
            }}>Back to the museum</span>
            <span style={{ color: '#FFB400', fontSize: '1.25rem', lineHeight: 1 }}>→</span>
          </motion.button>
        </SectionReveal>
      </section>
    </div>
  )
}
