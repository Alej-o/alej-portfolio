"use client"

import { HoverLink } from "./HoverLink";
import { projectsData } from "../data/projectsData"; 




export default function Projects() {
  return (
    <section className="bg-black p-4 md:p-8" id="projects">
  <div className="w-full ">
    <p className="text-5xl text-center font-milk-honey text-beige">Projects</p>

    {projectsData.map((p, index) => (
      <HoverLink key={index} {...p} />
    ))}
  </div>
</section>

  );
}
