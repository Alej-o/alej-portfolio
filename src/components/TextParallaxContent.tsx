'use client'

import { ReactNode, useRef,} from 'react'
import {
  motion,
  useScroll,
  useTransform,

  MotionValue,
  
} from 'framer-motion'
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
  // const scaleMotion = useTransform(scrollYProgress, [0, 0.5], [1, 0.75])

  // scaleValue (si Hero attend un number)
  // const [scaleValue, setScaleValue] = useState(1)
  // useMotionValueEvent(scaleMotion, 'change', (latest) => {
  //   setScaleValue(latest)
  // })

  return (
    <div>
      <div ref={ref} className="relative h-[100vh]">
        {/* Canvas */}
        <motion.div
          style={{
            opacity: canvasOpacity,
            height: '100vh',
          }}
          className="sticky top-0 z-0 overflow-hidden"
        >
          <Hero />
        </motion.div>

        {/* Texte qui monte au scroll */}
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
      className="absolute bottom-16 left-12 pointer-events-none z-20 text-left"
    >
      <p className="text-[90px] md:text-[190px] font-title text-beige leading-[0.8] uppercase">
        DÉVELOPPEUSE<br />
        <span>FRONT-END</span>
      </p>
    </motion.div>
  )
}
