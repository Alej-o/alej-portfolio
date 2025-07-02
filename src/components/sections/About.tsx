'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from '../animations/AnimatedParagraph'
import RevealTextOnScroll from '../animations/RevealTextOnScroll'
// import Image from 'next/image'

const techList = [
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Vercel',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])

  const tagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.07,
        duration: 0.3,
        ease: 'easeOut',
      },
    }),
  }

  return (
 <section id="about" className="relative z-10 bg-beige min-h-screen w-full flex flex-col justify-center">
  <RevealTextOnScroll className="text-6xl pt-14 font-title text-center text-black uppercase">
    À propos
  </RevealTextOnScroll>


  <div className="w-full flex justify-center">
    <div className="font-eb-garamond">
      <AnimatedParagraph>
        {`Hello, moi c’est Agathe !
Je suis développeuse front-end, avec un vrai goût pour les interfaces vivantes et accessibles. Ce que j’aime, c’est créer des expériences fluides, sensibles, où chaque détail compte : du petit mouvement subtil à la clarté de la navigation. Pour moi, le code, c’est un moyen d’exprimer des idées… et de toucher les gens.`}
      </AnimatedParagraph>
    </div>
  </div>


  <div ref={ref} className="w-full mx-auto mt-20">
    <RevealTextOnScroll className="text-6xl font-title text-black uppercase text-center">
      Technologies
    </RevealTextOnScroll>

   
    <RevealTextOnScroll className="flex flex-wrap items-center justify-center gap-x-4 mt-8 text-4xl font-eb-garamond text-black uppercase">
      {techList.map((tech, i) => (
        <motion.div
          key={tech}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={tagVariants}
          className="flex items-center font-eb-garamond"
        >
          <span>{tech}</span>
          {i !== techList.length - 1 && (
            <span
              className="ml-4 text-2xl align-middle select-none"
              aria-hidden="true"
            >
              •
            </span>
          )}
        </motion.div>
      ))}
    </RevealTextOnScroll>
  </div>
</section>


  )
}

