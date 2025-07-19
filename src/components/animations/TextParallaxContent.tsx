'use client'

import { ReactNode, useRef,} from 'react'
import {
  motion,
  useScroll,
  useTransform,

  MotionValue,
  
} from 'framer-motion'
import Hero from '../sections/Hero'

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

  return (
    <div>
      <div ref={ref} className="relative h-[100vh]">
      
        <motion.div
          style={{
            opacity: canvasOpacity,
            height: '100vh',
          }}
          className="sticky top-0 z-0 overflow-hidden"
        >
          <Hero />
        </motion.div>

        <OverlayCopy scrollYProgress={scrollYProgress} />
      </div>

      {children}
    </div>
  )
}

type OverlayCopyProps = {
  scrollYProgress: MotionValue<number>
}

const OverlayCopy = ({ scrollYProgress }: OverlayCopyProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -350])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute bottom-8 left-2  pointer-events-none z-20 text-center"
    >
      <p className="font-title text-beige text-left leading-[0.8] uppercase text-[52px] sm:text-[50px] md:text-[120px] lg:text-[180px] xl:text-[220px]">
        DÉVELOPPEUSE<br />
        FRONT-END
      </p>
    </motion.div>
  )
}
