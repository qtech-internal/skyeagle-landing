import { motion } from 'motion/react'
import type { ReactNode } from 'react'

/**
 * Brings a block in as it enters the viewport: a short rise and fade, once.
 * Under reduced motion the MotionConfig in Shell turns the movement off.
 */
export default function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.8, delay }}
    >
      {children}
    </motion.div>
  )
}
