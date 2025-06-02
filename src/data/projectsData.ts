

export type ProjectData = {
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  href: string;
};

export const projectsData: ProjectData[] = [
  {
    heading: "Application mobile",
    subheading: ["React Native", "Node", "Next.js"],
    hoverHeading: "Trollen",
    hoverSubheading: "Découvrir le projet",
    imgSrc: "/image/image1.jpg",
    href: "#",
  },
  {
    heading: "Portfolio",
    subheading: ["TypeScript", "Next", "Three.js", "Tailwind", "Framer Motion"],
    hoverHeading: "Voir le site",
    hoverSubheading: "Explorer la démo",
    imgSrc: "/image/image2.jpg",
    href: "#",
  },
  {
    heading: "Site web",
    subheading: ["Next.js", "Three.js", "Framer Motion"],
    hoverHeading: "Mon Portfolio",
    hoverSubheading: "Plongez dans l’univers",
    imgSrc: "/image/image3.jpg",
    href: "#",
  },
];
