'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type RevealTextProps = {
  children: ReactNode
  className?: string
  reveal?: boolean
  delay?: number
  maskColor?: string
}

export default function RevealText({
  children,
  className = '',
  reveal = false,
  delay = 0,
  maskColor = 'bg-beige',
}: RevealTextProps) {
  return (
    <span
      className={`relative inline-block overflow-hidden ${maskColor}`}
      style={{ minHeight: '1em' }}
    >
      <motion.span
        initial={{ y: '100%' }}
        animate={reveal ? { y: '0%' } : { y: '100%' }}
        transition={{
          duration: 0.44,
          ease: [0.4, 0.0, 0.2, 1],
          delay,
        }}
        className={className}
        style={{ display: 'block' }}
      >
        {children}
      </motion.span>
    </span>
  )
}
