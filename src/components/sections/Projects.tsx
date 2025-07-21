"use client"

import { HoverLink } from "../animations/HoverLink";
import { projectsData } from "../../data/projectsData"; 
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col xl:justify-center  xl:pt-10  xl:pb-60 pb-32 ">
      <div className="flex items-center justify-left xl:justify-center border-b border-black pb-8">
        <RevealTextOnScroll className=" px-8 xl:text-6xl text-4xl font-title text-black uppercase leading-[1.8]">
          Projets
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
  <HoverLink key={p.slug} {...p} isFirst={index === 0} />
))}
    </section>
  )
}
 