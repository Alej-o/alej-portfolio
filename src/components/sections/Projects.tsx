"use client"

import { HoverLink } from "../animations/HoverLink";
import { projectsData } from "../../data/projectsData"; 
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col xl:justify-center pt-10 pb-24   xl:pt-10  xl:pb-60  ">
      <div className="flex   px-6 xl:justify-center border-b  border-black pb-6">
        <RevealTextOnScroll className="  xl:text-6xl text-4xl font-title text-black uppercase leading-[1.8]">
          Projets
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
  <HoverLink key={p.slug} {...p} isFirst={index === 0} />
))}
    </section>
  )
}
 