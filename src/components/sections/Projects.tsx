"use client"

import { HoverLink } from "../animations/HoverLink";
import { projectsData } from "../../data/projectsData"; 
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col xl:justify-center pt-10  pb-60">
      <div className="flex items-center justify-left xl:justify-center border-b border-black">
        <RevealTextOnScroll className=" px-8 xl:text-6xl text-3xl font-title text-black uppercase leading-[1.8]">
          Projects
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
  <HoverLink key={p.slug} {...p} isFirst={index === 0} />
))}
    </section>
  )
}
 