'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from '../animations/AnimatedParagraph'
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

const techList = [
  'TypeScript','JavaScript','React','React Native','Next.js',
  'Tailwind CSS','Framer Motion','Vercel',
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const controls = useAnimation()

  useEffect(() => { if (isInView) controls.start('visible') }, [isInView, controls])

  const tagVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
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
        <AnimatedParagraph as="h3">
{`Hello, moi c'est Agathe.
Développeuse front-end passionnée par la création d'interfaces fluides et accessibles. Je me spécialise dans les micro-interactions et animations qui enrichissent l'expérience utilisateur, tout en explorant des territoires plus créatifs comme les shaders. Le site s'étoffera avec de nouvelles réalisations à découvrir dans la section Projets.`}
        </AnimatedParagraph>
      </div>

      <div ref={ref} className="max-w-7xl mx-auto mt-10 lg:mt-16 xl:mt-32">
        <h2
          id="technologies-title"
          className="text-4xl md:text-4xl lg:text-5xl xl:text-7xl font-title text-black uppercase mt-10 mb-8 lg:mb-10 md:text-center"
        >
          <RevealTextOnScroll>Technologies</RevealTextOnScroll>
        </h2>

        <ul
          aria-labelledby="technologies-title"
          className="flex flex-wrap md:justify-center text-lg md:text-xl gap-x-3 gap-y-2 md:gap-x-2 md:gap-y-4 font-eb-garamond text-black uppercase xl:text-4xl xl:mt-14 2xl:flex-nowrap list-none p-0 m-0"
        >
          {techList.map((tech, i) => (
            <motion.li
              key={tech}
              initial="hidden"
              animate={controls}
              variants={tagVariants}
              className="flex items-center whitespace-nowrap"
            >
              <h3 className="text-lg md:text-xl xl:text-4xl font-eb-garamond">
  {tech}
</h3>

              {i !== techList.length - 1 && (
                <span className="ml-2 select-none" aria-hidden="true">•</span>
              )}
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
