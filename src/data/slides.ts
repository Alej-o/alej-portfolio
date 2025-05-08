import city1 from "../../public/image/image1.jpg";
import city2 from "../../public/image/image2.jpg";
import city3 from "../../public/image/image3.jpg";
import type { StaticImageData } from "next/image";

export interface Slide {
  id: string;
  image: StaticImageData;
  title: string;
  description: string;
  href: string;
}

export const slides: Slide[] = [
  {
    id: "alpha",
    image: city1,
    title: "Projet Alpha",
    description: "Courte description du projet Alpha.",
    href: "/projects/alpha",
  },
  {
    id: "beta",
    image: city2,
    title: "Projet Beta",
    description: "Courte description du projet Beta.",
    href: "/projects/beta",
  },
  {
    id: "gamma",
    image: city3,
    title: "Projet Gamma",
    description: "Courte description du projet Gamma.",
    href: "/projects/gamma",
  },
];
