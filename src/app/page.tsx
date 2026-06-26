'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useTransition } from '@/providers/TransitionProvider'
import { planets } from '@/lib/planets'
import { PlanetCard } from '@/components/shared/PlanetCard'
import { StatCounter } from '@/components/shared/StatCounter'
import { SectionReveal } from '@/components/shared/SectionReveal'
import { staggerContainer, fadeUp } from '@/lib/animations'
import { CompareWorlds } from '@/components/sections/CompareWorlds'
import { FunFacts } from '@/components/sections/FunFacts'
import { FeaturedPlanet } from '@/components/sections/FeaturedPlanet'
import { GalleryPreview } from '@/components/sections/GalleryPreview'

const SolarSystemScene = dynamic(
  () => import('@/components/three/SolarSystemScene').then((m) => m.SolarSystemScene),
  { ssr: false, loading: () => <div style={{ background: '#03040a', width: '100%', height: '100%', borderRadius: 16 }} /> }
)

// ─── PLANET NAV DATA ──────────────────────────────────────────────────────────

const PLANET_NAV = [
  { slug: 'mercury', label: 'Mercury', bg: 'radial-gradient(circle at 38% 32%, #c0bdb0, #706d60, #28271e)' },
  { slug: 'venus',   label: 'Venus',   bg: 'radial-gradient(circle at 38% 32%, #f0d890, #c88b3a, #603800)' },
  { slug: 'earth',   label: 'Earth',   bg: 'radial-gradient(circle at 38% 32%, #80c8f0, #2268a8, #0c2a48)' },
  { slug: 'mars',    label: 'Mars',    bg: 'radial-gradient(circle at 38% 32%, #e07850, #b03818, #481008)' },
  { slug: 'jupiter', label: 'Jupiter', bg: 'radial-gradient(circle at 38% 32%, #dca860, #b07030, #584018)' },
  { slug: 'saturn',  label: 'Saturn',  bg: 'radial-gradient(circle at 38% 32%, #ede0a0, #cdb055, #806820)' },
  { slug: 'uranus',  label: 'Uranus',  bg: 'radial-gradient(circle at 38% 32%, #a8ecec, #56c0c0, #183838)' },
  { slug: 'neptune', label: 'Neptune', bg: 'radial-gradient(circle at 38% 32%, #7090f0, #2040a8, #081028)' },
]

// ─── 1. CINEMATIC HERO ────────────────────────────────────────────────────────

const CREAM = '#F7F3EB'
const INK   = '#120E09'

function HeroSection() {
  const { scrollY } = useScroll()
  const { navigateTo } = useTransition()
  const imageY = useTransform(scrollY, [0, 800], [0, 90])
  const textY  = useTransform(scrollY, [0, 500], [0, -40])
  const contentOpacity = useTransform(scrollY, [0, 350], [1, 0])
  const [trailerOpen, setTrailerOpen] = useState(false)

  return (
    <section style={{
      height: '100svh',
      minHeight: '700px',
      background: CREAM,
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      {/* ── Sun image — right side with parallax ── */}
      <motion.div
        aria-hidden="true"
        style={{
          y: imageY,
          position: 'absolute',
          right: 0,
          top: '-6%',
          width: '65%',
          height: '112%',
          pointerEvents: 'none',
        }}
      >
        <img
          src="/images/sun-hero.png"
          alt=""
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: '60% center' }}
        />
        {/* Wide left fade — covers dark star field, blends into cream */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to right, ${CREAM} 0%, ${CREAM}f0 8%, ${CREAM}c0 18%, ${CREAM}70 30%, ${CREAM}28 42%, transparent 58%)`,
        }} />
        {/* Top + bottom edge fades */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom, ${CREAM} 0%, transparent 12%, transparent 85%, ${CREAM} 100%)`,
        }} />
        {/* Warm amber glow to neutralise remaining dark stars */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 20% 50%, rgba(245,195,100,0.12) 0%, transparent 55%)`,
        }} />
      </motion.div>

      {/* ── Left scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position: 'absolute',
          left: 'clamp(1.4rem, 2.5vw, 2.5rem)',
          bottom: '2.8rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.7rem',
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '44px', background: `linear-gradient(to bottom, rgba(18,14,9,0.5), transparent)`, transformOrigin: 'top' }}
        />
        <span style={{
          fontFamily: 'var(--font-inter)',
          fontSize: '0.34rem',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(18,14,9,0.32)',
          writingMode: 'vertical-lr',
          transform: 'rotate(180deg)',
        }}>
          Scroll
        </span>
      </motion.div>

      {/* ── Editorial left content ── */}
      <motion.div
        style={{
          y: textY,
          opacity: contentOpacity,
          position: 'relative',
          zIndex: 10,
          paddingLeft: 'clamp(5rem, 9vw, 10rem)',
          paddingRight: 'clamp(1.5rem, 3vw, 3rem)',
          maxWidth: 'min(44%, 560px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        {/* SOLARIS — large serif title */}
        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontWeight: 300,
            fontSize: 'clamp(4.5rem, 9.5vw, 11rem)',
            color: INK,
            letterSpacing: '-0.015em',
            lineHeight: 0.88,
            marginBottom: '0',
          }}
        >
          SOLARIS
        </motion.h1>

        {/* Thin rule */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            width: '2.75rem',
            height: '1px',
            background: `rgba(18,14,9,0.22)`,
            margin: '1.8rem 0',
            transformOrigin: 'left',
          }}
        />

        {/* Body copy */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.75 }}
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(0.72rem, 1vw, 0.85rem)',
            fontWeight: 300,
            color: `rgba(18,14,9,0.48)`,
            lineHeight: 1.9,
            maxWidth: '280px',
            marginBottom: '2.4rem',
            letterSpacing: '0.015em',
          }}
        >
          An interactive journey through the wonders<br />of our Solar System.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.0 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Primary — black pill */}
          <motion.button
            onClick={() => navigateTo('/mercury')}
            whileHover={{ scale: 1.03, backgroundColor: '#2a2218' }}
            whileTap={{ scale: 0.97 }}
            style={{
              alignSelf: 'flex-start',
              background: INK,
              color: CREAM,
              border: 'none',
              padding: '0.9rem 2.1rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.58rem',
              fontWeight: 400,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'background 0.25s, transform 0.2s',
            }}
          >
            Begin the Journey <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem' }}>→</span>
          </motion.button>

          {/* Secondary — circle play + label */}
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }}
            onClick={() => setTrailerOpen(true)}
          >
            <motion.div
              whileHover={{ scale: 1.08, borderColor: `rgba(18,14,9,0.55)` }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                border: `1px solid rgba(18,14,9,0.22)`,
                background: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'border-color 0.25s, transform 0.2s',
              }}
            >
              <span style={{ color: `rgba(18,14,9,0.55)`, fontSize: '0.5rem', marginLeft: '2px' }}>▶</span>
            </motion.div>
            <span style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.5rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: `rgba(18,14,9,0.35)`,
            }}>
              Watch Trailer
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Trailer modal ── */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setTrailerOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 9999,
              background: 'rgba(0,0,0,0.88)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '2rem',
              backdropFilter: 'blur(10px)',
              cursor: 'zoom-out',
            }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: 'relative', width: '100%', maxWidth: '960px', cursor: 'default' }}
            >
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: '10px', overflow: 'hidden', background: '#000' }}>
                <iframe
                  src="https://www.youtube.com/embed/libKVRa01L8?autoplay=1&rel=0"
                  title="SOLARIS Trailer"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              </div>
              <button
                onClick={() => setTrailerOpen(false)}
                style={{
                  position: 'absolute', top: '-14px', right: '-14px',
                  width: 36, height: 36,
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: '50%',
                  background: 'rgba(18,14,9,0.85)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)',
                }}
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── 2. WELCOME TO SOLARIS ────────────────────────────────────────────────────

function MuseumStatement() {
  return (
    <section style={{ background: '#F8F6F2', overflow: 'hidden' }}>
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ minHeight: '70vh' }}>

        {/* Left — Earth image */}
        <div style={{ position: 'relative', minHeight: '420px', overflow: 'hidden', order: 0 }}>
          <img
            src="/images/earth-at-night.png"
            alt="Earth at night from orbit"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
          />
          {/* Right blend toward text */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to left, #F8F6F2 0%, transparent 30%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.06)' }} />
        </div>

        {/* Right — text */}
        <div style={{ paddingInline: 'clamp(2rem, 8vw, 8rem)', paddingBlock: 'clamp(5rem, 10vw, 9rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center', order: 1 }}>
          <SectionReveal>
            <motion.p variants={fadeUp} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.62rem', letterSpacing: '0.26em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '1.5rem' }}>
              Welcome to Solaris
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.4rem, 5vw, 4.5rem)', fontWeight: 300, lineHeight: 1.06, letterSpacing: '-0.02em', color: '#0a0a0a', marginBottom: '2rem' }}
            >
              Every planet tells<br />a different story.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.88rem, 1.2vw, 1rem)', color: '#78716C', lineHeight: 1.9, maxWidth: '480px', marginBottom: '1.25rem' }}
            >
              A story of formation — of dust and gas collapsing into worlds over billions of years.
              A story of evolution — of atmospheres shifting, surfaces scarring, oceans rising and falling.
            </motion.p>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.88rem, 1.2vw, 1rem)', color: '#78716C', lineHeight: 1.9, maxWidth: '480px' }}
            >
              SOLARIS is a cinematic museum of the solar system. Eight exhibits.
              An endless curiosity about what lies beyond.
            </motion.p>
          </SectionReveal>
        </div>

      </div>
    </section>
  )
}

// ─── 3. INTERACTIVE SOLAR SYSTEM ──────────────────────────────────────────────

function InteractiveSolarSystem() {
  const { navigateTo } = useTransition()

  return (
    <section
      style={{
        background: '#03040a',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingTop: 'clamp(4rem, 8vw, 7rem)',
        paddingBottom: '0',
      }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <SectionReveal className="mb-6 flex items-end justify-between">
          <div>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,0,0.55)', marginBottom: '10px' }}
            >
              Interactive Explorer
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}
            >
              The Solar System
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="hidden md:block"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)', textAlign: 'right', lineHeight: 1.7, maxWidth: '220px' }}
          >
            Drag to orbit · Scroll to zoom
            <br />
            Click a planet to explore
          </motion.p>
        </SectionReveal>

        {/* 3D Canvas */}
        <SectionReveal delay={0.1}>
          <motion.div
            variants={fadeUp}
            style={{
              position: 'relative',
              height: 'clamp(380px, 65vh, 680px)',
              borderRadius: '12px',
              overflow: 'hidden',
              background: '#01020a',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            {/* Solar system overview image behind the 3D scene */}
            <img
              src="/images/solar-system-overview.png"
              alt=""
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.35 }}
            />
            <SolarSystemScene onNavigate={(id) => navigateTo(`/${id}`)} />

            {/* Interaction hint overlay (fades after a moment) */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 flex justify-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              style={{ pointerEvents: 'none' }}
            >
              {['Drag to orbit', 'Scroll to zoom', 'Click to explore'].map((hint) => (
                <span key={hint} style={{ fontFamily: 'var(--font-inter)', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)' }}>
                  {hint}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </SectionReveal>

        {/* Planet quick-nav row */}
        <SectionReveal delay={0.2} className="mt-4 pb-10">
          <motion.div
            variants={fadeUp}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            {PLANET_NAV.map((p) => (
              <motion.button
                key={p.slug}
                onClick={() => navigateTo(`/${p.slug}`)}
                whileHover={{ y: -3 }}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '2px',
                  padding: '6px 14px',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.38)',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '7px',
                }}
              >
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: p.bg, flexShrink: 0 }} />
                {p.label}
              </motion.button>
            ))}
          </motion.div>
        </SectionReveal>
      </div>
    </section>
  )
}

// ─── 4. VIII EXHIBITS ─────────────────────────────────────────────────────────

function ExhibitsGrid() {
  return (
    <section
      id="exhibits"
      style={{
        background: '#fafaf9',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="flex items-end justify-between mb-16">
          <div>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '12px' }}
            >
              The Exhibition
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}
            >
              VIII Exhibits
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="hidden md:block"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: '#A8A29E', maxWidth: '200px', textAlign: 'right', lineHeight: 1.6 }}
          >
            From Mercury&apos;s scorched plains to Neptune&apos;s dark depths.
          </motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {planets.map((planet, i) => (
            <PlanetCard key={planet.id} planet={planet} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 5. TIMELINE OF FORMATION ─────────────────────────────────────────────────

const TIMELINE_EVENTS = [
  {
    year: '4,600 Mya',
    title: 'The Solar Nebula',
    body: 'A vast molecular cloud — mostly hydrogen and helium — begins to collapse under its own gravity, triggered by a nearby supernova shockwave.',
    facts: ['99.86% of the cloud\'s mass became the Sun', 'Temperature reached 15 million °C at the core'],
    color: '#7090C8',
    accent: 'rgba(112,144,200,0.15)',
  },
  {
    year: '4,570 Mya',
    title: 'The Sun Ignites',
    body: 'Pressure and temperature at the collapsing core reach nuclear-fusion threshold. Hydrogen fuses into helium — and our star is born, releasing energy equivalent to 100 billion nuclear bombs per second.',
    facts: ['Sun generates 3.8 × 10²⁶ watts continuously', 'The solar wind swept gas from the inner system'],
    color: '#FFB400',
    accent: 'rgba(255,180,0,0.12)',
  },
  {
    year: '4,500 Mya',
    title: 'Protoplanetary Disk',
    body: 'The remaining disk of gas and dust around the young Sun begins to clump. Dust grains stick together, forming pebbles, then boulders, then planetesimals — the seeds of planets.',
    facts: ['The disk extended 100+ AU from the Sun', 'Millions of planetesimals formed in under 10,000 years'],
    color: '#C88B3A',
    accent: 'rgba(200,139,58,0.12)',
  },
  {
    year: '4,450 Mya',
    title: 'Rocky Worlds Form',
    body: 'In the hot inner disk, only metals and silicates survive. Violent collisions between planetesimals build Mercury, Venus, Earth, and Mars — scarred, molten, and bombarded.',
    facts: ['Earth\'s iron core sank to its center in ~30M years', 'The Moon formed from a Mars-sized impactor called Theia'],
    color: '#4B9CD3',
    accent: 'rgba(75,156,211,0.12)',
  },
  {
    year: '4,400 Mya',
    title: 'The Giant Planets',
    body: 'Beyond the frost line where water ice survives, Jupiter and Saturn rapidly accrete massive hydrogen envelopes around rocky cores. Uranus and Neptune follow at the edge of the disk.',
    facts: ['Jupiter formed in under 1 million years', 'Jupiter\'s gravity shaped the entire solar system\'s architecture'],
    color: '#E8C878',
    accent: 'rgba(232,200,120,0.12)',
  },
  {
    year: '4,100 Mya',
    title: 'Late Heavy Bombardment',
    body: 'A gravitational reshuffling of the giant planets sends a torrent of asteroids and comets into the inner solar system. Every world is cratered. Oceans may have arrived with the ice-bearing impactors.',
    facts: ['The Moon\'s ancient craters date to this period', 'Earth may have received its water from cometary impacts'],
    color: '#C04040',
    accent: 'rgba(192,64,64,0.12)',
  },
  {
    year: '3,800 Mya',
    title: 'Life Begins on Earth',
    body: 'Chemical reactions in hydrothermal vents or shallow pools produce the first self-replicating molecules. Single-celled organisms emerge — the only known life in the entire universe.',
    facts: ['First evidence of life found in 3.7 Billion-year-old rocks', 'Photosynthetic bacteria oxygenated Earth\'s atmosphere over 2B years'],
    color: '#58A868',
    accent: 'rgba(88,168,104,0.12)',
  },
  {
    year: 'Present Day',
    title: 'The Age of Exploration',
    body: 'In the cosmic blink of 250 years, humanity has launched 250+ missions, landed on the Moon, roved Mars, and sent two spacecraft beyond the heliopause into interstellar space.',
    facts: ['Voyager 1 is 24 billion km from Earth', '8 planets, 200+ moons, and counting'],
    color: '#82D8D8',
    accent: 'rgba(130,216,216,0.12)',
  },
]

function FormationTimeline() {
  return (
    <section
      id="timeline"
      style={{
        background: '#06060e',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {/* Header */}
        <SectionReveal className="mb-20">
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,0,0.5)', marginBottom: '10px' }}
          >
            4.6 Billion Years of History
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}
          >
            Timeline of
            <br />
            <em>Formation</em>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, maxWidth: '480px', marginTop: '1.25rem' }}
          >
            From a collapsing cloud of interstellar dust to a civilization reaching for the stars — traced in eight pivotal moments.
          </motion.p>
        </SectionReveal>

        {/* Vertical timeline */}
        <div style={{ position: 'relative' }}>
          {/* Central spine */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'absolute',
              left: 'clamp(60px, 10vw, 100px)',
              top: 0,
              bottom: 0,
              width: '1px',
              background: 'linear-gradient(to bottom, transparent, rgba(255,180,0,0.25) 8%, rgba(255,180,0,0.18) 92%, transparent)',
              transformOrigin: 'top',
            }}
          />

          {/* Events */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {TIMELINE_EVENTS.map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(60px, 10vw, 100px) 1fr',
                  paddingBottom: i < TIMELINE_EVENTS.length - 1 ? 'clamp(3rem, 6vw, 5rem)' : 0,
                }}
              >
                {/* Left: year + node */}
                <div style={{ position: 'relative', paddingRight: '1.5rem' }}>
                  {/* Node ring */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    style={{
                      position: 'absolute',
                      right: '-9px',
                      top: '4px',
                      width: 17,
                      height: 17,
                      borderRadius: '50%',
                      background: '#06060e',
                      border: `1.5px solid ${event.color}`,
                      boxShadow: `0 0 14px ${event.color}55`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: event.color }} />
                  </motion.div>

                  {/* Year label */}
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '0.52rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: event.color,
                    textTransform: 'uppercase',
                    lineHeight: 1.3,
                    paddingTop: '2px',
                  }}>
                    {event.year}
                  </p>
                </div>

                {/* Right: content card */}
                <div
                  style={{
                    padding: 'clamp(1.25rem, 3vw, 2rem)',
                    background: event.accent,
                    border: `1px solid ${event.color}22`,
                    borderRadius: '12px',
                    marginLeft: '1.5rem',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(1.3rem, 2.5vw, 1.85rem)',
                    fontWeight: 400,
                    color: '#fff',
                    lineHeight: 1.1,
                    marginBottom: '0.75rem',
                    letterSpacing: '-0.01em',
                  }}>
                    {event.title}
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.8,
                    marginBottom: '1rem',
                  }}>
                    {event.body}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {event.facts.map((fact, j) => (
                      <span key={j} style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '0.56rem',
                        letterSpacing: '0.04em',
                        color: event.color,
                        background: `${event.color}14`,
                        border: `1px solid ${event.color}28`,
                        padding: '3px 10px',
                        borderRadius: '100px',
                      }}>
                        {fact}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── 6. SOLAR SYSTEM STATISTICS ───────────────────────────────────────────────

function StatsSection() {
  const stats = [
    { value: 8,     suffix: '',   label: 'Total Planets',        decimals: 0 },
    { value: 200,   suffix: '+',  label: 'Known Moons',          decimals: 0 },
    { value: 4.6,   suffix: 'B', label: 'Years of History',     decimals: 1 },
    { value: 1.39,  suffix: 'M', label: 'Sun Diameter (km)',    decimals: 2 },
    { value: 24,    suffix: 'B', label: 'Voyager Distance (km)', decimals: 0 },
    { value: 250,   suffix: '+',  label: 'Missions Launched',    decimals: 0 },
  ]

  return (
    <section
      style={{
        background: '#fff',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
        borderTop: '1px solid #E7E5E4',
        borderBottom: '1px solid #E7E5E4',
      }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal className="mb-16">
          <motion.p
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#A8A29E', marginBottom: '10px' }}
          >
            By the numbers
          </motion.p>
          <motion.h2
            variants={fadeUp}
            style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#0a0a0a' }}
          >
            Solar System
            <br />
            <em>Statistics</em>
          </motion.h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <StatCounter
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              decimals={stat.decimals}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── 7. FEATURED MISSIONS ─────────────────────────────────────────────────────

const FEATURED_MISSIONS = [
  {
    year: '1969',
    name: 'Apollo 11',
    type: 'Crewed Lunar',
    agency: 'NASA',
    target: 'The Moon',
    desc: 'Humanity sets foot on another world. Neil Armstrong takes one giant leap for mankind.',
    accent: '#c8b870',
    image: '/images/lunar-module.png',
    imagePosition: 'center',
  },
  {
    year: '1977',
    name: 'Voyager 1',
    type: 'Deep Space Probe',
    agency: 'NASA',
    target: 'Interstellar Space',
    desc: 'Now beyond our solar system — the farthest human-made object in history.',
    accent: '#5890c0',
    image: '/images/voyager-1.png',
    imagePosition: 'center',
  },
  {
    year: '1990',
    name: 'Hubble',
    type: 'Space Telescope',
    agency: 'NASA / ESA',
    target: 'Deep Universe',
    desc: 'Three decades of iconic imagery have forever changed humanity\'s view of the cosmos.',
    accent: '#3878a8',
    image: '/images/hubble-telescope.png',
    imagePosition: 'center',
  },
  {
    year: '1998',
    name: 'Space Station',
    type: 'Orbital Laboratory',
    agency: 'NASA / ESA / Roscosmos',
    target: 'Low Earth Orbit',
    desc: 'A permanent home in space, hosting astronauts continuously for over two decades.',
    accent: '#7090f0',
    image: '/images/iss.png',
    imagePosition: 'center',
  },
  {
    year: '2020',
    name: 'Perseverance',
    type: 'Mars Rover',
    agency: 'NASA',
    target: 'Mars',
    desc: 'Searching for biosignatures in ancient Martian lakebeds — and caching samples for Earth return.',
    accent: '#c04010',
    image: '/images/perseverance-rover.png',
    imagePosition: 'center',
  },
  {
    year: '2023+',
    name: 'Starship',
    type: 'Next-Gen Spacecraft',
    agency: 'SpaceX',
    target: 'Mars & Beyond',
    desc: 'The most powerful rocket ever built — designed to make humanity a multiplanetary species.',
    accent: '#FF7040',
    image: '/images/starship-launch.png',
    imagePosition: 'center bottom',
  },
]

function FeaturedMissions() {
  return (
    <section
      style={{
        background: '#0a0a0a',
        paddingInline: 'clamp(1.5rem, 5vw, 5rem)',
        paddingBlock: 'clamp(5rem, 10vw, 8rem)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <SectionReveal className="mb-16 flex items-end justify-between">
          <div>
            <motion.p
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,180,0,0.5)', marginBottom: '10px' }}
            >
              Mission Archive
            </motion.p>
            <motion.h2
              variants={fadeUp}
              style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', fontWeight: 300, letterSpacing: '-0.02em', lineHeight: 1, color: '#fff' }}
            >
              Featured
              <br />
              <em>Missions</em>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            className="hidden md:block"
            style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.22)', maxWidth: '200px', textAlign: 'right', lineHeight: 1.7 }}
          >
            Six missions that changed our understanding of the cosmos.
          </motion.p>
        </SectionReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {FEATURED_MISSIONS.map((mission, i) => (
            <MissionCard key={i} mission={mission} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function MissionCard({ mission, index }: { mission: typeof FEATURED_MISSIONS[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] } },
      }}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 24 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111',
        border: `1px solid ${hovered ? `${mission.accent}50` : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '10px',
        overflow: 'hidden',
        cursor: 'default',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 24px 60px rgba(0,0,0,0.5), 0 0 30px ${mission.accent}18` : '0 2px 20px rgba(0,0,0,0.3)',
      }}
    >
      {/* Mission image */}
      <div style={{ position: 'relative', height: '180px', overflow: 'hidden', background: '#0a0a0a' }}>
        <img
          src={mission.image}
          alt={mission.name}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: mission.imagePosition,
            opacity: hovered ? 0.85 : 0.65,
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'opacity 0.5s ease, transform 0.6s ease',
          }}
        />
        {/* Bottom gradient bleed */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,17,17,0.1) 0%, rgba(17,17,17,0.8) 100%)' }} />
        {/* Accent tint */}
        <div style={{ position: 'absolute', inset: 0, background: `${mission.accent}10`, opacity: hovered ? 1 : 0, transition: 'opacity 0.4s' }} />
        {/* Year badge */}
        <div style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '3px 10px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2px', backdropFilter: 'blur(8px)' }}>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>{mission.year}</span>
        </div>
        {/* Type badge */}
        <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
          <span style={{ fontFamily: 'var(--font-inter)', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: `${mission.accent}cc`, fontWeight: 600 }}>{mission.type}</span>
        </div>
      </div>

      {/* Card body */}
      <div style={{ padding: 'clamp(1.25rem, 2.5vw, 1.6rem)' }}>
        <h3 style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
          fontWeight: 400,
          color: '#fff',
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
          marginBottom: '0.35rem',
          fontStyle: 'italic',
        }}>
          {mission.name}
        </h3>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.58rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.28)', marginBottom: '0.85rem' }}>
          {mission.agency} · {mission.target}
        </p>
        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.75 }}>
          {mission.desc}
        </p>
      </div>

      {/* Bottom accent bar */}
      <motion.div
        style={{ height: '2px', background: `linear-gradient(to right, ${mission.accent}, transparent)` }}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      />
    </motion.div>
  )
}

// ─── 8. JOURNEY CTA ───────────────────────────────────────────────────────────

function FinalCTA() {
  const { navigateTo } = useTransition()

  return (
    <section
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '90vh', background: '#000', paddingInline: 'clamp(1.5rem, 5vw, 5rem)' }}
    >
      {/* Cinematic CTA background — use universe-waiting if saved, else earth-sunrise */}
      <div className="absolute inset-0">
        <img
          src="/images/space-background.png"
          alt=""
          aria-hidden="true"
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/images/earth-sunrise.png' }}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            objectPosition: 'center 40%',
            opacity: 0.55,
          }}
        />
        {/* Deep radial vignette */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 60%, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.7) 65%, #000 100%)' }} />
        {/* Top/bottom edge fades */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, #000 0%, transparent 22%, transparent 68%, #000 100%)' }} />
        {/* Warm gold atmospheric glow */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 70%, rgba(255,170,50,0.1) 0%, transparent 50%)' }} />
      </div>

      <SectionReveal className="text-center relative z-10 max-w-4xl">
        <motion.p
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-inter)', fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(255,180,0,0.5)', marginBottom: '2rem' }}
        >
          Begin the Exhibition
        </motion.p>

        <motion.h2
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 300, color: '#fff', letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '1.5rem' }}
        >
          The Universe
        </motion.h2>
        <motion.h2
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-cormorant)', fontSize: 'clamp(3.5rem, 10vw, 9rem)', fontWeight: 300, color: 'rgba(255,180,0,0.9)', letterSpacing: '-0.03em', lineHeight: 0.92, marginBottom: '3.5rem', fontStyle: 'italic' }}
        >
          Awaits.
        </motion.h2>

        <motion.p
          variants={fadeUp}
          style={{ fontFamily: 'var(--font-inter)', fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', color: 'rgba(255,255,255,0.3)', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 3rem' }}
        >
          Eight worlds. 4.6 billion years of history.
          Your journey through the solar system starts here.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => navigateTo('/mercury')}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: '#FFB400',
              color: '#000',
              border: 'none',
              padding: '1.1rem 2.8rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
            }}
          >
            Enter Exhibit I — Mercury
          </motion.button>

          <motion.button
            onClick={() => navigateTo('/beyond')}
            whileHover={{ scale: 1.03, borderColor: 'rgba(255,255,255,0.25)', color: 'rgba(255,255,255,0.7)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.35)',
              border: '1px solid rgba(255,255,255,0.12)',
              padding: '1.1rem 2.8rem',
              fontFamily: 'var(--font-inter)',
              fontSize: '0.7rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.2s',
            }}
          >
            Beyond the Solar System
          </motion.button>
        </motion.div>
      </SectionReveal>
    </section>
  )
}

// ─── PAGE EXPORT ──────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MuseumStatement />
      <InteractiveSolarSystem />
      <ExhibitsGrid />
      <FormationTimeline />
      <CompareWorlds />
      <StatsSection />
      <FeaturedMissions />
      <FeaturedPlanet />
      <FunFacts />
      <GalleryPreview />
      <FinalCTA />
    </>
  )
}
