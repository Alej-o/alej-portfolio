'use client'

import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'

type RevealTextOnScrollProps = {
  children: ReactNode
  className?: string
}

export default function RevealTextOnScroll({
  children,
  className = '',
}: RevealTextOnScrollProps) {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  })

  useEffect(() => {
    if (inView) {
      controls.start('visible')
    }
  }, [inView, controls])

  return (
    <div ref={ref} className="relative h-[100px] overflow-hidden flex justify-left items-center md:justify-center lg:justify-center xl:justify-center">
     
      <motion.div
        initial={{ y: '100%' }}
        animate={controls}
        variants={{
          visible: {
            y: '0%',
            transition: {
              duration: 0.6,
              ease: [0.25, 1, 0.5, 1], 
            },
          },
        }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}
