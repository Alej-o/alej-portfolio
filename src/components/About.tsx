'use client'

import AnimatedParagraph from './AnimatedParagraph'
import Image from 'next/image'

export default function About() {
  return (
 <>
      <p className="text-5xl text-center font-milk-honey text-beige">A propos</p>
      <div className="mx-auto px-10 py-10 flex flex-col md:flex-row justify-between gap-10 ">
       
        <div >
          <AnimatedParagraph text="Hello, moi c’est Agathe ! Développeuse web fullstack, passionnée par la créativité sous toutes ses formes — qu’il s’agisse d’animations front-end ou d’architectures back-end bien pensées. J’aime autant concevoir des interfaces vivantes que structurer ce qui les anime. Le code est mon terrain de jeu, l’émotion mon objectif." />
        </div>

        
        <div className=" flex justify-center">
          <Image
            src="/image/image4.jpg" 
            alt="Portrait d'Agathe"
            width={400}
            height={400}
            className="rounded-2xl object-cover"
          />
        </div>
        
      </div>
      <div className="w-full mx-auto px-20 py-10 ">
  <h3 className="text-2xl mb-4">Stack technique</h3>
  <div className="flex flex-wrap gap-4">
    {[
      'TypeScript',
      'JavaScript',
      'React',
      'Next.js',
      'Tailwind CSS',
      'Framer Motion',
      'Node.js',
      'MongoDB',
      'Express.js',
      'Vercel',
    ].map((tech, index) => (
      <span
        key={index}
        className="px-6 py-2 rounded-full border border-beige text-beige text-3xl hover:bg-beige hover:text-black transition duration-300"
      >
        {tech}
      </span>
    ))}
  </div>
</div>
</>
  
  )
}
