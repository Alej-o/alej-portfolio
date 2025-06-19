'use client'

import { motion, useAnimation, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'
import AnimatedParagraph from './AnimatedParagraph'
import RevealTextOnScroll from './RevealTextOnScroll'
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
   <section id="about" className="ml-12 mt-24 relative z-10 b bg-beige ">
      <RevealTextOnScroll className="text-6xl pt-24 items-center font-title justify-center text-black uppercase ">À propos</RevealTextOnScroll>
      <div className=" px-10 py-10 flex flex-col md:flex-row  justify-center gap-10 font-sans text-black ">
  
<AnimatedParagraph>
  {"Hello, moi c’est Agathe !\n Je suis développeuse front-end, avec un vrai goût pour les interfaces vivantes et accessibles.Ce que j’aime, c’est créer des expériences fluides, sensibles, où chaque détail compte : du petit mouvement subtil à la clarté de la navigation. Pour moi, le code, c’est un moyen d’exprimer des idées… et de toucher les gens."}
</AnimatedParagraph>       


        
      </div>

      <div ref={ref} className="w-full mx-auto px-20 py-3">
        <RevealTextOnScroll className="text-6xl pb-14 font-title text-black uppercase items-center justify-center">Technologies</RevealTextOnScroll>
       <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-4 text-4xl pt-4 font-sans text-black uppercase">
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
      {/* Ajoute un point sauf pour le dernier */}
      {i !== techList.length - 1 && (
        <span className="mx-2 text-3xl font-sans text-black select-none">•</span>
      )}
    </motion.div>
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