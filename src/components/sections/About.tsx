'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from '../animations/AnimatedParagraph'
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

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
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="relative z-10 bg-beige w-full py-16 px-6 md:py-40 lg:py-40 xl:py-52"
    >
      <header>
        <h2
          id="about-title"
          className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-title text-black uppercase md:text-center mb-8 mt-8 lg:mb-10"
        >
          <RevealTextOnScroll>À propos</RevealTextOnScroll>
        </h2>
      </header>

      <div className="max-w-7xl mx-auto font-eb-garamond xl:mt-14 text-black">
        <AnimatedParagraph>
          {`Hello, moi c'est Agathe !
Je suis développeuse front-end, avec un vrai goût pour les interfaces vivantes et accessibles. Ce que j'aime, c'est créer des expériences fluides, sensibles, où chaque détail compte : du petit mouvement subtil à la clarté de la navigation. Pour moi, le code, c'est un moyen d'exprimer des idées… et de toucher les gens.`}
        </AnimatedParagraph>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto mt-10 lg:mt-16 xl:mt-32">
        <h3
          id="technologies-title"
          className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-title text-black uppercase mt-10 mb-8 lg:mb-10 md:text-center"
        >
          <RevealTextOnScroll>Technologies</RevealTextOnScroll>
        </h3>

        <div
          role="list"
          aria-labelledby="technologies-title"
          className="flex flex-wrap xl:flex-nowrap md:justify-center text-lg md:text-xl gap-x-3 gap-y-2 md:gap-x-2 md:gap-y-4 font-eb-garamond xl:text-4xl xl:mt-14 text-black uppercase"
        >
          {techList.map((tech, i) => (
            <motion.div
              key={tech}
              initial="hidden"
              animate={controls}
              variants={tagVariants}
              className="flex items-center whitespace-nowrap"
              role="listitem"
            >
              <span>{tech}</span>
              {i !== techList.length - 1 && (
                <span className="ml-2 select-none" aria-hidden="true">
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
