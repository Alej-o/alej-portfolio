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
  className="absolute bottom-8 left-2 pointer-events-none z-20 "
>
  <p
    className="
      font-title text-beige
    leading-[0.8] uppercase
    break-words
    text-[clamp(2.2rem,12vw,4rem)] 
    sm:text-[clamp(3rem,16vw,5rem)] 
    md:text-[clamp(5rem,16vw,6rem)]
    lg:text-[clamp(6rem,16vw,8rem)]
    xl:text-[clamp(8rem,18vw,14rem)]
    text-left sm:text-left
    px-8
      
    "
  >
    DÉVELOPPEUSE<br />
    FRONT-END
  </p>
</motion.div>
  )
}
