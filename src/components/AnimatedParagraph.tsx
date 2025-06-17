// app/components/AnimatedParagraph.tsx
'use client'

import { useScroll, useTransform, motion, MotionValue } from 'framer-motion'
import React, { useRef } from 'react'

export default function AnimatedParagraph({ text }: { text: string }) {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.9', 'start 0.25'],
  })

  const words = (text ?? '').split(' ')

  return (
    <p
      ref={container}
      className="flex flex-wrap text-[50px] leading-none px-10 py-10 max-w-[1280px] text-black "
    >
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </p>
  )
}

const Word = ({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) => {
  const amount = range[1] - range[0]
  const step = amount / children.length

  return (
    <span className="relative mr-3 mt-3 inline-flex">
      {children.split('').map((char, i) => {
        const start = range[0] + i * step
        const end = range[0] + (i + 1) * step
        return (
          <Char key={`c_${i}`} progress={progress} range={[start, end]}>
            {char}
          </Char>
        )
      })}
    </span>
  )
}

const Char = ({
  children,
  progress,
  range,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
}) => {
  const opacity = useTransform(progress, range, [0, 1])
  const y = useTransform(progress, range, [10, 0])

  return (
    <span className="relative inline-block">
      <span
        className="absolute opacity-20 pointer-events-none text-yellow "
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
