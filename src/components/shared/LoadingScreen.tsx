'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const duration = 1600

    const tick = () => {
      const elapsed = Date.now() - start
      const pct = Math.min((elapsed / duration) * 100, 100)
      setProgress(pct)
      if (pct < 100) {
        requestAnimationFrame(tick)
      } else {
        setTimeout(() => setVisible(false), 300)
      }
    }
    requestAnimationFrame(tick)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9997] flex flex-col items-center justify-center"
          style={{ background: '#000' }}
          exit={{
            clipPath: 'inset(0 0 100% 0)',
            transition: { duration: 0.7, ease: [0.87, 0, 0.13, 1] },
          }}
        >
          {/* Wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <h1
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                fontWeight: 300,
                color: '#fff',
                letterSpacing: '-0.02em',
                lineHeight: 1,
              }}
            >
              SOLARIS
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '0.625rem',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '12px',
              }}
            >
              A Digital Museum of the Solar System
            </p>
          </motion.div>

          {/* Progress bar */}
          <div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            style={{ width: '160px', height: '1px', background: 'rgba(255,255,255,0.1)' }}
          >
            <motion.div
              style={{
                height: '100%',
                background: '#FFB400',
                originX: 0,
                scaleX: progress / 100,
              }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '0.6rem',
              letterSpacing: '0.15em',
              color: 'rgba(255,255,255,0.3)',
            }}
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {Math.round(progress)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
