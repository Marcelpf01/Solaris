'use client'

import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { fadeUp } from '@/lib/animations'

const COMPARE_DATA = [
  { id: 'mercury', name: 'Mercury', color: '#B5B3BB', diameter: 4879,   gravity: 3.7,   moons: 0,   dayLength: 1408,  tempAvg: 167,   mass: 0.055 },
  { id: 'venus',   name: 'Venus',   color: '#E8C285', diameter: 12104,  gravity: 8.87,  moons: 0,   dayLength: 5832,  tempAvg: 464,   mass: 0.815 },
  { id: 'earth',   name: 'Earth',   color: '#4B9CD3', diameter: 12742,  gravity: 9.8,   moons: 1,   dayLength: 24,    tempAvg: 15,    mass: 1.0   },
  { id: 'mars',    name: 'Mars',    color: '#C1440E', diameter: 6779,   gravity: 3.72,  moons: 2,   dayLength: 24.6,  tempAvg: -65,   mass: 0.107 },
  { id: 'jupiter', name: 'Jupiter', color: '#C88B3A', diameter: 139820, gravity: 24.79, moons: 95,  dayLength: 9.9,   tempAvg: -110,  mass: 317.8 },
  { id: 'saturn',  name: 'Saturn',  color: '#E8C878', diameter: 116460, gravity: 10.44, moons: 146, dayLength: 10.7,  tempAvg: -140,  mass: 95.2  },
  { id: 'uranus',  name: 'Uranus',  color: '#82D8D8', diameter: 50724,  gravity: 8.69,  moons: 28,  dayLength: 17.2,  tempAvg: -195,  mass: 14.5  },
  { id: 'neptune', name: 'Neptune', color: '#4B70DD', diameter: 49244,  gravity: 11.15, moons: 16,  dayLength: 16.1,  tempAvg: -200,  mass: 17.1  },
]

const METRICS = [
  { key: 'diameter',  label: 'Diameter',    unit: 'km',      format: (v: number) => v.toLocaleString() },
  { key: 'gravity',   label: 'Gravity',     unit: 'm/s²',    format: (v: number) => v.toFixed(2) },
  { key: 'moons',     label: 'Moons',       unit: '',        format: (v: number) => v.toString() },
  { key: 'dayLength', label: 'Day Length',  unit: 'hrs',     format: (v: number) => v.toLocaleString() },
  { key: 'tempAvg',   label: 'Avg Temp',    unit: '°C',      format: (v: number) => (v > 0 ? '+' : '') + v },
  { key: 'mass',      label: 'Mass',        unit: '× Earth', format: (v: number) => v < 1 ? v.toFixed(3) : v.toFixed(1) },
]

type MetricKey = 'diameter' | 'gravity' | 'moons' | 'dayLength' | 'tempAvg' | 'mass'

function AnimatedBar({ value, max, color, delay }: { value: number; max: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const pct = max === 0 ? 0 : Math.max(2, (Math.abs(value) / Math.abs(max)) * 100)

  return (
    <div ref={ref} style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', borderRadius: 3, background: color, transformOrigin: 'left' }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(to right, ${color}cc, ${color})`, borderRadius: 3 }} />
      </motion.div>
    </div>
  )
}

export function CompareWorlds() {
  const [activeMetric, setActiveMetric] = useState<MetricKey>('diameter')

  const metric = METRICS.find(m => m.key === activeMetric)!
  const values = COMPARE_DATA.map(p => p[activeMetric as keyof typeof p] as number)
  const maxVal = Math.max(...values.map(Math.abs))
  const sorted = [...COMPARE_DATA].sort((a, b) =>
    (b[activeMetric as keyof typeof b] as number) - (a[activeMetric as keyof typeof a] as number)
  )

  return (
    <section
      style={{
        background: '#fff',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid #E7E5E4',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <SectionReveal className="mb-14 flex items-end justify-between flex-wrap gap-6">
          <div>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '10px' }}>
              The Exhibition
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}>
              Compare the
              <br /><em>Worlds</em>
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#A8A29E', maxWidth: '220px', lineHeight: 1.6 }}>
            Select a metric below to compare all eight planets side by side.
          </motion.p>
        </SectionReveal>

        {/* Metric tabs */}
        <SectionReveal className="mb-10">
          <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
            {METRICS.map(m => (
              <motion.button
                key={m.key}
                onClick={() => setActiveMetric(m.key as MetricKey)}
                whileHover={{ y: -2 }}
                style={{
                  padding: '8px 18px',
                  borderRadius: '2px',
                  border: `1px solid ${activeMetric === m.key ? '#0a0a0a' : '#E7E5E4'}`,
                  background: activeMetric === m.key ? '#0a0a0a' : 'transparent',
                  color: activeMetric === m.key ? '#fff' : '#78716C',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: activeMetric === m.key ? 600 : 400,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {m.label}
              </motion.button>
            ))}
          </motion.div>
        </SectionReveal>

        {/* Comparison bars */}
        <div className="flex flex-col gap-4">
          {sorted.map((planet, i) => {
            const val = planet[activeMetric as keyof typeof planet] as number
            return (
              <motion.div
                key={planet.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-4"
              >
                {/* Planet dot + name */}
                <div className="flex items-center gap-3" style={{ width: 110, flexShrink: 0 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: planet.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', fontWeight: 500, color: '#0a0a0a', letterSpacing: '0.02em' }}>
                    {planet.name}
                  </span>
                </div>

                {/* Bar */}
                <div style={{ flex: 1 }}>
                  <AnimatedBar
                    value={val}
                    max={maxVal}
                    color={planet.color}
                    delay={i * 0.06}
                  />
                </div>

                {/* Value */}
                <div style={{ width: 120, textAlign: 'right', flexShrink: 0 }}>
                  <span style={{ fontFamily: 'var(--font-cormorant)', fontSize: '1.1rem', fontWeight: 500, color: '#0a0a0a' }}>
                    {metric.format(val)}
                  </span>
                  <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.6rem', color: '#A8A29E', marginLeft: 4 }}>
                    {metric.unit}
                  </span>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Legend */}
        <SectionReveal className="mt-10" delay={0.2}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem', color: '#D6D3D1', letterSpacing: '0.04em', textAlign: 'center' }}>
            Sorted by {metric.label.toLowerCase()} — click any metric tab to reorder
          </motion.p>
        </SectionReveal>
      </div>
    </section>
  )
}
