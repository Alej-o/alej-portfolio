"use client"

import { HoverLink } from "./HoverLink";
import { projectsData } from "../data/projectsData"; 
import RevealTextOnScroll from './RevealTextOnScroll'




export default function Projects() {
  return (
    <section className="bg-black p-8 mt-20" id="projects">
  <div className="w-full ">
    <RevealTextOnScroll className="text-6xl pt-24 pb-5 text-left font-title text-beige uppercase">Projects</RevealTextOnScroll>

    {projectsData.map((p, index) => (
      <HoverLink key={index} {...p} />
    ))}
  </div>
</section>

  );
}
