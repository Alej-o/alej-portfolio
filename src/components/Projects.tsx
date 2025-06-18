"use client"

import { HoverLink } from "./HoverLink";
import { projectsData } from "../data/projectsData"; 
import RevealTextOnScroll from './RevealTextOnScroll'




export default function Projects() {
  return (
    <section className="p-8 " id="projects">
      <div className=" flex items-center pl-8 justify-center  pt-14 pb-14">
        <RevealTextOnScroll className="text-6xl  font-title text-black uppercase leading-[1.2]">
          Projects
        </RevealTextOnScroll>
      </div>

      {projectsData.map((p, index) => (
        <HoverLink key={index} {...p} />
      ))}
    </section>
  )
}
