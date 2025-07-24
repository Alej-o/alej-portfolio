'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

type RevealTextOnScrollProps = {
  children: ReactNode
  className?: string
  forceReveal?: boolean
  maskColor?: string 
  delay?: number     
}

export default function RevealTextOnScroll({
  children,
  className = '',
  forceReveal = false,
  maskColor = 'bg-beige',
  delay = 0,
}: RevealTextOnScrollProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (forceReveal || inView) {
      controls.start('visible')
    }
  }, [inView, forceReveal, controls])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden xl:flex xl:items-center xl:justify-center`}
      style={{ minHeight: '1em' }}
    >
      <div
        className={`absolute inset-0 w-full h-full ${maskColor}`}
        style={{ zIndex: 10, pointerEvents: 'none' }}
      />
      <motion.span
        initial={{ y: '100%' }}
        animate={controls}
        variants={{
          visible: {
            y: '0%',
            transition: {
              duration: 0.42,
              delay, 
              ease: [0.4, 0.0, 0.2, 1],
            },
          },
        }}
        className={className}
        style={{
          display: 'block',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {children}
      </motion.span>
    </div>
  )
}
