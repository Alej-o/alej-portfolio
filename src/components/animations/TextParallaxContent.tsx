'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Hero from '../sections/Hero'

type Props = { children: ReactNode }

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
          style={{ opacity: canvasOpacity, height: '100vh' }}
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

type OverlayCopyProps = { scrollYProgress: MotionValue<number> }

const OverlayCopy = ({ scrollYProgress }: OverlayCopyProps) => {
  const y = useTransform(scrollYProgress, [0, 1], [0, -350])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      className="absolute bottom-20 left-0 right-0 pointer-events-none z-20 px-3 sm:px-4 md:px-6 xl:px-8"
    >
      <h1
        className="
          font-title text-beige uppercase leading-[0.85] break-words text-left
          text-[clamp(2.7rem,10vw,5rem)]
          md:text-[clamp(3rem,9vw,7rem)]
          xl:text-[min(12rem,12vw)]
          2xl:text-[min(14rem,11vw)]
        "
      >
        DÉVELOPPEUSE<br />
        FRONT-END
      </h1>
    </motion.div>
  )
}
