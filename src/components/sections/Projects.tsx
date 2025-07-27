"use client"

import { HoverLink } from "../animations/HoverLink"
import { projectsData } from "../../data/projectsData"
import RevealTextOnScroll from "../animations/RevealTextOnScroll"

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="flex flex-col pt-10 pb-24 md:pb-48 lg:pt-14 lg:pb-52 xl:pt-24 xl:pb-60"
    >
      <header className="flex px-6 border-b md:justify-center xl:justify-center border-black pb-6 xl:pb-20">
        <h2
          id="projects-title"
          className="xl:text-7xl lg:text-5xl md:text-4xl text-4xl mb-2 font-title text-black uppercase leading-[1.8]"
        >
          <RevealTextOnScroll>Projets</RevealTextOnScroll>
        </h2>
      </header>

      <div role="list" aria-labelledby="projects-title">
        {projectsData.map((p, index) => (
          <HoverLink key={p.slug} {...p} isFirst={index === 0} />
        ))}
      </div>
    </section>
  )
}
