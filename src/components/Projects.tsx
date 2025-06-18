"use client"

import { HoverLink } from "./HoverLink";
import { projectsData } from "../data/projectsData"; 
import RevealTextOnScroll from './RevealTextOnScroll'




export default function Projects() {
  return (
    <section className=" p-8 " id="projects">
  <div className="w-full  ">
    <RevealTextOnScroll className="text-6xl font-title text-black uppercase">Projects</RevealTextOnScroll>

    {projectsData.map((p, index) => (
      <HoverLink key={index} {...p} />
    ))}
  </div>
</section>

  );
}
