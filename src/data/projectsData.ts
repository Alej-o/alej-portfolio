

export type ProjectData = {
  heading: string;
  subheading: string;
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc: string;
  href: string;
};

export const projectsData: ProjectData[] = [
  {
    heading: "Application mobile",
    subheading: "React Native",
    hoverHeading: "Trollen",
    hoverSubheading: "Découvrir le projet",
    imgSrc: "/image/image1.jpg",
    href: "#",
  },
  {
    heading: "Site Web",
    subheading: "Développement de vitrine",
    hoverHeading: "Voir le site",
    hoverSubheading: "Explorer la démo",
    imgSrc: "/image/image2.jpg",
    href: "#",
  },
  {
    heading: "Portfolio",
    subheading: "Projet personnel en DA rétro",
    hoverHeading: "Mon Portfolio",
    hoverSubheading: "Plongez dans l’univers",
    imgSrc: "/image/image3.jpg",
    href: "#",
  },
];
