'use client'

import React, {
  ElementType,
  ReactNode,
  createElement,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(mql.matches)
    onChange()
    mql.addEventListener?.('change', onChange)
    return () => mql.removeEventListener?.('change', onChange)
  }, [])
  return reduced
}

type AnimatedParagraphProps<T extends ElementType = 'p'> = {
  as?: T
  children: ReactNode
} & Omit<React.ComponentPropsWithoutRef<T>, 'children'>

export default function AnimatedParagraph<T extends ElementType = 'p'>(
  props: AnimatedParagraphProps<T>
) {
  const { as, children, className, ...rest } = props
  const Tag = (as ?? 'p') as ElementType

  const ref = useRef<HTMLDivElement | null>(null)
  const reduced = usePrefersReducedMotion()

  const text = useMemo(() => {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.join(' ')
    return String(children ?? '')
  }, [children])

  const words = useMemo(
    () => text.replace(/\r\n/g, '\n').split(/(\s+)/).map(w => (w === '\n' ? '\n' : w)),
    [text]
  )

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.35'] })

  return createElement(
    Tag,
    {
      ref,
      className:
        [
          'py-2',
          'max-w-[80ch] xl:max-w-[110ch]',
          'text-2xl md:text-3xl xl:text-6xl',
          'leading-snug',
          'flex flex-wrap',
          'text-left md:text-justify lg:text-justify xl:text-justify',
          'justify-start md:justify-center lg:justify-center xl:justify-center',
          'font-eb-garamond',
          className ?? '',
        ].join(' '),
      'aria-label': text,
      ...rest,
    },
    <>
     
      <span className="sr-only">{text}</span>

     
      <span aria-hidden="true" className="contents">
        {words.map((token, i) => {
          if (token === '\n') {
            return <span key={`br-${i}`} className="block w-full h-0" aria-hidden="true" />
          }
          if (/\s+/.test(token)) {
            return (
              <span key={`sp-${i}`} className="whitespace-pre">
                {token}
              </span>
            )
          }
          const start = i / words.length
          const end = start + 1 / words.length
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} reduced={reduced}>
              {token}
            </Word>
          )
        })}
      </span>
    </>
  )
}

function Word({
  children,
  progress,
  range,
  reduced,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  reduced: boolean
}) {
  const amount = range[1] - range[0]
  const step = amount / children.length
  return (
    <span className="relative mr-3 inline-flex font-eb-garamond">
      {children.split('').map((char, i) => (
        <Char
          key={i}
          progress={progress}
          range={[range[0] + i * step, range[0] + (i + 1) * step]}
          reduced={reduced}
        >
          {char}
        </Char>
      ))}
    </span>
  )
}

function Char({
  children,
  progress,
  range,
  reduced,
}: {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  reduced: boolean
}) {
  const opacity = useTransform(progress, range, reduced ? [1, 1] : [0, 1])
  const y = useTransform(progress, range, reduced ? [0, 0] : [10, 0])
  return (
    <span className="relative inline-block font-eb-garamond">
      <span className="absolute opacity-20 pointer-events-none font-eb-garamond" aria-hidden="true">
        {children}
      </span>
      <motion.span style={{ opacity, y }} className="inline-block font-eb-garamond">
        {children}
      </motion.span>
    </span>
  )
}
