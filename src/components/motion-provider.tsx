"use client"

import { MotionConfig } from "motion/react"
import type { ReactNode } from "react"

/** Turns movement off for readers who ask their system for reduced motion. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
