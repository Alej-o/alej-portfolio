'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion'
import Hero from './Hero'


type Props = {
  children: ReactNode
}

export default function TextParallaxContent({ children }: Props) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'end start'],
  })

  const canvasOpacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scaleMotion = useTransform(scrollYProgress, [0, 0.4], [1, 0.75])

  const [scaleValue, setScaleValue] = useState(1)
  useMotionValueEvent(scaleMotion, 'change', (latest) => {
    setScaleValue(latest)
  })

  return (
    <div>
      <div ref={ref} className="relative h-[150vh]">
        {/* Canvas sans CSS scale */}
        <motion.div
          style={{
            opacity: canvasOpacity,
            height: '100vh',
            top: 0,
          }}
          className="sticky z-0 overflow-hidden"
        >
          <Hero scale={scaleValue} />
        </motion.div>

        {/* Texte en bas à gauche */}
        <OverlayCopy />
      </div>

      {children}
    </div>
  )
}

const OverlayCopy = () => {
  const targetRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -50])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute bottom-16 left-12 pointer-events-none z-20 text-left"
    >
      <div>
        <p className="text-[90px] md:text-[190px] font-title text-beige leading-[0.8] uppercase">
          DÉVELOPPEUSE<br />
          <span>FRONT-END</span>
        </p>
      </div>
    </motion.div>
  )
}
