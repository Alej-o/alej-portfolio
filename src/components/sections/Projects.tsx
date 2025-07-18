"use client"

import { HoverLink } from "../animations/HoverLink";
import { projectsData } from "../../data/projectsData"; 
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col justify-center pt-10 px-8 pb-60">
      <div className="flex items-center pl-8 justify-center pb-20 border-b border-black">
        <RevealTextOnScroll className="text-6xl font-title text-black uppercase leading-[1.8]">
          Projects
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
  <HoverLink key={p.slug} {...p} isFirst={index === 0} />
))}
    </section>
  )
}
 