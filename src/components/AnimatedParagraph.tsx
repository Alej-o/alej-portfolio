'use client'

import {
  useScroll,
  useTransform,
  motion,
  MotionValue,
} from 'framer-motion'
import React, { useRef } from 'react'

export default function AnimatedParagraph({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)

  const text = typeof children === 'string' ? children : ''
  const words = text.split(/(\s+|\n)/) // conserve les espaces ET les sauts de ligne
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })

  return (
    <div ref={ref} className="px-10 py-10 max-w-[80ch] text-black text-[50px] leading-tight flex flex-wrap justify-center">
      {words.map((word, i) => {
        if (word === '\n') {
          return <br key={`br-${i}`} />
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
    <span className="relative mr-3 mt-3 inline-flex">
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
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <span className="relative inline-block">
      <span
        className="absolute opacity-20 pointer-events-none text-black"
        aria-hidden="true"
      >
        {children}
      </span>
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  )
}
