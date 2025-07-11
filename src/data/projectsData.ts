

export type ProjectData = {
  slug: string;
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  title: string;
  description: string;
  transitionLabel?: string;
  status: string;
  type: string;
  annee: string
  link?: string  
};

export const projectsData: ProjectData[] = [
  {
    slug: "trollen",
    heading: "Application mobile",
    subheading: ["React Native", "Node", "Next.js"],
    hoverHeading: "Trollen",
    hoverSubheading: "Découvrir le projet",
    imgSrc: "/image/image1.jpg",
    title: "Trollen",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam eu diam vitae dolor viverra scelerisque. Curabitur dignissim aliquam pretium. Vestibulum nisi massa, auctor ac iaculis sed, feugiat non eros. ",
    transitionLabel: "Trollen",
    status: "Terminé",
    type: "Application mobile",
    annee: "2025",
  },
  {
    slug: "portfolio",
    heading: "Portfolio",
    subheading: ["TypeScript", "Next", "Three.js", "Tailwind", "Framer Motion"],
    hoverHeading: "voir le portfolio",
    hoverSubheading: "Explorer la démo",
    imgSrc: "/image/image2.jpg",
    title: "Mon Portfolio",
    description: "Un portfolio interactif mettant en avant mes projets et compétences.",
    transitionLabel: "Mon Portfolio",
    status: "Terminé",
    type: "Site web",
    annee: "2025",
    link: "https://mon-portfolio.com",
  },
  {
    slug: "site-web",
    heading: "Site web",
    subheading: ["Next.js", "Three.js", "Framer Motion"],
    hoverHeading: "Site Web",
    hoverSubheading: "Plongez dans l’univers",
    imgSrc: "/image/image3.jpg",
    title: "Site Web",
    description: "Un site web dynamique et interactif construit avec les dernières technologies.",
    transitionLabel: "Mon Site Web",
    status: "En cours",
    type: "Site web",
    annee: "2025",
  },
];
