"use client"

import { HoverLink } from "../animations/HoverLink"
import { projectsData } from "../../data/projectsData"
import RevealTextOnScroll from "../animations/RevealTextOnScroll"

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex flex-col justify-center px-4 sm:px-6 md:px-12 xl:px-24 pt-10 pb-32 sm:pb-40"
    >
      {/* Titre */}
      <div className="flex justify-center items-center pb-16 sm:pb-20 border-b border-black">
        <RevealTextOnScroll
          className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-title text-black uppercase leading-[1.4] text-center"
        >
          Projects
        </RevealTextOnScroll>
      </div>

      {/* Liste des projets */}
      <div className="flex flex-col gap-8 sm:gap-12 pt-12">
        {projectsData.map((p, index) => (
          <HoverLink key={p.slug} {...p} isFirst={index === 0} />
        ))}
      </div>
    </section>
  )
}
