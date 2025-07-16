'use client'

import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion'
import React, { useRef, useEffect, useState  } from 'react'


export default function AnimatedParagraph({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)

  const text = typeof children === 'string' ? children : ''
  const words = text.split(/(\s+|\n)/)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })

  return (
   <div
  ref={ref}
  className="px-4 sm:px-10 py-6 sm:py-10 max-w-[80ch] text-2xl sm:text-[50px] leading-snug sm:leading-tight flex flex-wrap text-justify justify-center font-eb-garamond"
>
  {words.map((word, i) => {
    if (word === '\n') {
      return <span key={`br-${i}`} className="block w-full h-0 mb-2" />
    }

    const start = i / words.length
    const end = start + 1 / words.length

    return (
      <Word key={i} progress={scrollYProgress} range={[start, end]}>
        {word}
      </Word>
    )
  })}
</div>
  )
}

function Word({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const amount = range[1] - range[0]
  const step = amount / children.length

  return (
    <span className="relative mr-3 mt-3 inline-flex font-eb-garamond">
      {children.split('').map((char, i) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Char key={i} progress={progress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </span>
  )
}

function Char({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 640)
  }, [])

  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, isMobile ? [5, 0] : [10, 0])

  return (
    <span className="relative inline-block font-eb-garamond">
      <span
        className="absolute opacity-20 pointer-events-none font-eb-garamond"
        aria-hidden="true"
      >
        {children}
      </span>
      <motion.span style={{ opacity, y }} className="inline-block font-eb-garamond">
        {children}
      </motion.span>
    </span>
  )
}
