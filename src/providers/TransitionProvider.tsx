'use client'

import { createContext, useContext, useState, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { planets, type Planet } from '@/lib/planets'
import { delay } from '@/lib/utils'

interface TransitionCtx {
  navigateTo: (href: string) => Promise<void>
  isTransitioning: boolean
}

const Ctx = createContext<TransitionCtx>({
  navigateTo: async () => {},
  isTransitioning: false,
})

export function useTransition() {
  return useContext(Ctx)
}

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [activePlanet, setActivePlanet] = useState<Planet | null>(null)
  const [destinationHref, setDestinationHref] = useState('')
  const isNavigating = useRef(false)

  const navigateTo = useCallback(
    async (href: string) => {
      if (isNavigating.current) return
      isNavigating.current = true

      const planet = planets.find((p) => p.href === href) ?? null
      setActivePlanet(planet)
      setDestinationHref(href)
      setIsTransitioning(true)

      await delay(1400)
      router.push(href)
      await delay(600)

      setIsTransitioning(false)
      setActivePlanet(null)
      isNavigating.current = false
    },
    [router]
  )

  return (
    <Ctx.Provider value={{ navigateTo, isTransitioning }}>
      {children}

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            key="planet-transition"
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            style={{ background: '#000' }}
            initial={{ clipPath: 'inset(100% 0 0 0)' }}
            animate={{ clipPath: 'inset(0% 0 0 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.65, ease: [0.87, 0, 0.13, 1] }}
          >
            <div className="text-center select-none">
              {activePlanet ? (
                <>
                  <p
                    className="text-white/40 mb-4 tracking-[0.25em] uppercase"
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '0.7rem' }}
                  >
                    Traveling to
                  </p>
                  <p
                    className="text-white/50 mb-2 tracking-[0.12em] uppercase"
                    style={{ fontFamily: 'var(--font-inter)', fontSize: '0.75rem' }}
                  >
                    Exhibit {activePlanet.romanNumeral}
                  </p>
                  <h2
                    className="text-white tracking-[-0.02em]"
                    style={{
                      fontFamily: 'var(--font-cormorant)',
                      fontSize: 'clamp(3rem, 8vw, 7rem)',
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {activePlanet.name}
                  </h2>
                  <p
                    className="mt-6 tracking-[0.1em] uppercase"
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: '0.65rem',
                      color: activePlanet.color,
                    }}
                  >
                    {activePlanet.distanceMiles} from the Sun
                  </p>
                </>
              ) : (
                <h2
                  className="text-white tracking-[-0.02em]"
                  style={{
                    fontFamily: 'var(--font-cormorant)',
                    fontSize: 'clamp(2.5rem, 7vw, 6rem)',
                    fontWeight: 300,
                  }}
                >
                  SOLARIS
                </h2>
              )}
            </div>

            {/* Decorative horizontal line */}
            <motion.div
              className="absolute bottom-[20%] left-1/2 -translate-x-1/2"
              style={{
                width: activePlanet ? '120px' : '0px',
                height: '1px',
                background: activePlanet ? activePlanet.color : '#FFB400',
                opacity: 0.6,
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  )
}
