'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from './AnimatedParagraph'
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
    <section
  id="about"
  className="ml-12 mt-4 relative z-10 bg-black "
>
      <p className="text-8xl text-left font-title text-beige uppercase ">À propos</p>
      <div className="mx-auto px-10 py-10 flex flex-col md:flex-row justify-between gap-10 font-sans text-beige">
        <div>
          <AnimatedParagraph text="Hello, moi c’est Agathe ! Développeuse web fullstack, passionnée par la créativité sous toutes ses formes qu’il s’agisse d’animations front-end ou d’architectures back-end bien pensées. J’aime autant concevoir des interfaces vivantes que structurer ce qui les anime. Le code est mon terrain de jeu, l’émotion mon objectif." />
        </div>

        
      </div>

      <div ref={ref} className="w-full mx-auto px-20 py-3">
        <p className="text-6xl ml-3 mb-5 font-title text-beige uppercase">Technologies</p>
        <div className="flex flex-wrap gap-4">
          {techList.map((tech, i) => (
            <motion.span
              key={tech}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={tagVariants}
              className="px-6 py-2  mt-3 font-sans text-beige text-4xl "
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
   </section>
  )
}


{/* <div className="flex justify-center">
          <Image
            src="/image/image4.jpg"
            alt="Portrait d'Agathe"
            width={400}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div> */}