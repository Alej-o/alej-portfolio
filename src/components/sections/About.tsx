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
    <section
  id="about"
  className="relative z-10 bg-beige w-full min-h-screen px-6 pt-10 "
>
  <RevealTextOnScroll className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-title text-black uppercase mb-10 text-center">
    À propos
  </RevealTextOnScroll>

  <div className="max-w-5xl mx-auto font-eb-garamond text-black">
    <AnimatedParagraph>
      {`Hello, moi c'est Agathe !
Je suis développeuse front-end, avec un vrai goût pour les interfaces vivantes et accessibles. Ce que j'aime, c'est créer des expériences fluides, sensibles, où chaque détail compte : du petit mouvement subtil à la clarté de la navigation. Pour moi, le code, c'est un moyen d'exprimer des idées… et de toucher les gens.`}
    </AnimatedParagraph>
  </div>

  <div ref={ref} className="max-w-5xl mx-auto mt-16">
    <RevealTextOnScroll className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-title text-black uppercase mb-6 text-center">
      Technologies
    </RevealTextOnScroll>

    <div className="flex flex-wrap justify-center text-lg gap-x-3 gap-y-2 md:gap-x-6 md:gap-y-4 font-eb-garamond text-black uppercase">
      {techList.map((tech, i) => (
        <motion.div
          key={tech}
          custom={i}
          initial="hidden"
          animate={controls}
          variants={tagVariants}
          className="flex items-center"
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