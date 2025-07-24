"use client"

import { HoverLink } from "../animations/HoverLink";
import { projectsData } from "../../data/projectsData"; 
import RevealTextOnScroll from '../animations/RevealTextOnScroll'

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col  pt-10 pb-24  md:pb-48 lg:pt-14 lg:pb-52 xl:pt-10  xl:pb-60  ">
      <div className="flex   px-6  border-b md:justify-center xl:justify-center border-black pb-6 xl:pb-14">
        <RevealTextOnScroll className="  xl:text-7xl lg:text-5xl md:text-4xl  text-4xl font-title text-black uppercase leading-[1.8]">
          Projets
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
  <HoverLink key={p.slug} {...p} isFirst={index === 0} />
))}
    </section>
  )
}
 