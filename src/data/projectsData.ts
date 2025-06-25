

export type ProjectData = {
  slug: string;
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  
  title: string;
  description: string;
};

export const projectsData: ProjectData[] = [
  {
    slug: "trollen",
    heading: "Application mobile",
    subheading: ["React Native", "Node", "Next.js"],
    hoverHeading: "Trollen",
    hoverSubheading: "Découvrir le projet",
    imgSrc: "/image/image1.jpg",
    title: "Trollen - Application mobile",
    description: "Une application mobile innovante pour la gestion de projets.",
  },
  {
    slug: "portfolio",
    heading: "Portfolio",
    subheading: ["TypeScript", "Next", "Three.js", "Tailwind", "Framer Motion"],
    hoverHeading: "Voir le site",
    hoverSubheading: "Explorer la démo",
    imgSrc: "/image/image2.jpg",
    title: "Mon Portfolio",
    description: "Un portfolio interactif mettant en avant mes projets et compétences.",
  },
  {
    slug: "site-web",
    heading: "Site web",
    subheading: ["Next.js", "Three.js", "Framer Motion"],
    hoverHeading: "Mon Portfolio",
    hoverSubheading: "Plongez dans l’univers",
    imgSrc: "/image/image3.jpg",
    title: "Site Web",
    description: "Un site web dynamique et interactif construit avec les dernières technologies.",
  },
];
