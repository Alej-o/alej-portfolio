"use client"

import { HoverLink } from "./HoverLink";
import { projectsData } from "../data/projectsData"; 




export default function Projects() {
  return (
    <section className="bg-black p-6 " id="projects">
  <div className="w-full ">
    <p className="text-5xl text-center mt-6 mb-12 font-milk-honey text-beige">Projects</p>

    {projectsData.map((p, index) => (
      <HoverLink key={index} {...p} />
    ))}
  </div>
</section>

  );
}
