'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from './AnimatedParagraph'
import Image from 'next/image'

const techList = [
  'TypeScript',
  'JavaScript',
  'React',
  'React Native',
  'Next.js',
  'Tailwind CSS',
  'Framer Motion',
  'Node.js',
  'MongoDB',
  'Express.js',
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
  className="mt-60 relative z-10 bg-black px-6 py-24"
>
      <p className="text-5xl text-center font-milk-honey text-beige ">À propos</p>
      <div className="mx-auto px-10 py-10 flex flex-col md:flex-row justify-between gap-10 font-milk-honey">
        <div>
          <AnimatedParagraph text="Hello, moi c’est Agathe ! Développeuse web fullstack, passionnée par la créativité sous toutes ses formes — qu’il s’agisse d’animations front-end ou d’architectures back-end bien pensées. J’aime autant concevoir des interfaces vivantes que structurer ce qui les anime. Le code est mon terrain de jeu, l’émotion mon objectif." />
        </div>

        <div className="flex justify-center">
          <Image
            src="/image/image4.jpg"
            alt="Portrait d'Agathe"
            width={400}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div>
      </div>

      <div ref={ref} className="w-full mx-auto px-20 py-3">
        <p className="text-4xl ml-3 mb-5 font-milk-honey text-beige">Technologies :</p>
        <div className="flex flex-wrap gap-4">
          {techList.map((tech, i) => (
            <motion.span
              key={tech}
              custom={i}
              initial="hidden"
              animate={controls}
              variants={tagVariants}
              className="px-6 py-2 rounded-full font-milk-honey border border-beige text-beige text-3xl hover:bg-beige hover:text-black transition duration-300"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>
   </section>
  )
}
