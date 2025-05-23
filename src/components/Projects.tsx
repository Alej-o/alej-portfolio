"use client"
import city1 from "../../public/image/image1.jpg";
import city2 from "../../public/image/image2.jpg";
import city3 from "../../public/image/image3.jpg";
import { HoverLink } from "./HoverLink";

const projects = [
  {
    heading: "Trollen",
    subheading: "Learn what we do here",
    imgSrc: city1.src,
    href: "#",
  },
  {
    heading: "Site Web",
    subheading: "We work with great people",
    imgSrc: city2.src,
    href: "#",
  },
  {
    heading: "Portfolio",
    subheading: "Our work speaks for itself",
    imgSrc: city3.src,
    href: "#",
  },
];


export default function Projects() {
  return (
    <section className="bg-black p-4 md:p-8" id="projects">
  <div className="w-full ">
    <p className="text-5xl text-center font-milk-honey text-beige">Projects</p>

    {projects.map((p, index) => (
      <HoverLink key={index} {...p} />
    ))}
  </div>
</section>

  );
}
