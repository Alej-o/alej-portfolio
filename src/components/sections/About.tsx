'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from '../animations/AnimatedParagraph'
import RevealTextOnScroll from '../animations/RevealTextOnScroll'
// import Image from 'next.js'

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
    <section id="about" className="relative z-10 bg-beige min-h-screen w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      {/* Titre principal */}
      <RevealTextOnScroll className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl pt-8 sm:pt-10 md:pt-12 lg:pt-14 font-title text-center text-black uppercase">
        À propos
      </RevealTextOnScroll>

      {/* Paragraphe de présentation */}
      <div className="w-full flex justify-center mt-6 sm:mt-8 md:mt-10 lg:mt-12">
        <div className="font-eb-garamond max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl text-left sm:text-center">
          <AnimatedParagraph>
            {`Hello, moi c'est Agathe !
Je suis développeuse front-end, avec un vrai goût pour les interfaces vivantes et accessibles. Ce que j'aime, c'est créer des expériences fluides, sensibles, où chaque détail compte : du petit mouvement subtil à la clarté de la navigation. Pour moi, le code, c'est un moyen d'exprimer des idées… et de toucher les gens.`}
          </AnimatedParagraph>
        </div>
      </div>

      {/* Section Technologies */}
      <div ref={ref} className="w-full mx-auto mt-12 sm:mt-16 md:mt-20">
        <RevealTextOnScroll className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-title text-black uppercase text-center mb-6 sm:mb-8">
          Technologies
        </RevealTextOnScroll>

        <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3 sm:gap-x-3 sm:gap-y-4 md:gap-x-4 md:gap-y-4 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-eb-garamond text-black uppercase text-center">
          {techList.map((tech, i) => (
            <motion.div
              key={tech}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={tagVariants}
              className="flex items-center justify-center font-eb-garamond"
            >
              <span>{tech}</span>
              {i !== techList.length - 1 && (
                <span
                  className="ml-1 sm:ml-2 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl align-middle select-none"
                  aria-hidden="true"
                >
                  •
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}