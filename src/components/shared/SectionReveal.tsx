'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import type { Variants } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/animations'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
  variants?: Variants
  delay?: number
  stagger?: boolean
  threshold?: number
}

export function SectionReveal({
  children,
  className,
  variants,
  delay = 0,
  stagger = false,
  threshold = 0.15,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })

  const chosen = stagger ? staggerContainer : (variants ?? fadeUp)

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={chosen}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </motion.div>
  )
}
