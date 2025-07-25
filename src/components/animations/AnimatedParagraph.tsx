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
  const words = text.trim().split(/\s+/)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'start 0.35'],
  })

  return (
   <div
  ref={ref}
  className=" 
  py-2  
  max-w-[80ch] xl:max-w-[110ch] 
  text-2xl md:text-3xl xl:text-6xl  
  leading-snug  
  flex flex-wrap 
  text-left md:text-justify lg:text-justify xl:text-justify 
  justify-left md:justify-center lg:justify-center xl:justify-center  
  font-eb-garamond

  "
>
  {words.map((word, i) => {
    if (word === '\n') {
      return <span key={`br-${i}`} className="block w-full h-0" />
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
    <span className="relative mr-3 inline-flex font-eb-garamond">
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
