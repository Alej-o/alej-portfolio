
'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'

type RevealTextOnScrollProps = {
  children: string
  className?: string
  lineClassName?: string
}

export default function RevealTextOnScroll({
  children,
  className = '',
  lineClassName = '',
}: RevealTextOnScrollProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
  triggerOnce: true,
  threshold: 0.2,
  rootMargin: '-15% 0px',
})

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  const lines = children.split('\n')

  return (
    <div ref={ref} className={`flex flex-col gap-2 ${className}`}>
      {lines.map((line, index) => (
        <div key={index} className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={controls}
            variants={{
              visible: {
                y: '0%',
                transition: {
                  duration: 0.6,
                  ease: 'easeOut',
                  delay: index * 0.15,
                },
              },
            }}
            className={lineClassName}
          >
            {line}
          </motion.div>
        </div>
      ))}
    </div>
  )
}
