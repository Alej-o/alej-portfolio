

export type ProjectData = {
  slug: string;
  heading: string;
  subheading: string[];
  hoverHeading: string;
  hoverSubheading: string;
  imgSrc?: string;         // image principale (cover/card)
  images?: string[];       // autres images (galerie sur la page projet)
  title: string;
  description: string;
  transitionLabel?: string;
  status: string;
  type: string;
  annee: string;
  link?: ({ url: string; label: string } | string)[];
  stack: string[];
};

export const projectsData: ProjectData[] = [
  {
    slug: "trollen",
    heading: "Application mobile",
    subheading: ["React Native", "Node.js","Expo","Express","MongoDB"],
    hoverHeading: "Trollen - MVP",
    hoverSubheading: "Découvrir le projet",
    
    images: ["image/Trollen/trollen_connection.jpg","image/Trollen/trollen_lobby.jpg","image/Trollen/trollen_room.jpg",],
    title: "Trollen - MVP",
    description: "Trollen est une application de chat nouvelle génération : chaque utilisateur rejoint des rooms à thème (publiques ou privées), où il peut lancer des sorts amusants qui influencent les messages des autres. L’anonymat, la gamification et l’ambiance RPG rendent chaque interaction unique et imprévisible. Projet réalisé en équipe de 4. ",
    transitionLabel: "Trollen",
    status: "Terminé",
    type: "Application mobile",
    annee: "2025",
    stack: ["React Native", "Node.js", "Expo", "Express", "MongoDB", "Redux","JWT","Socket.io"],
    link: [
  { url: "https://github.com/Alej-o/trollen-frontend", label: " Front-end (GitHub)" },
  { url: "https://github.com/Alej-o/trollen-backend", label: " Back-end (GitHub)" },
 
]
  },
  {
    slug: "portfolio",
    heading: "Site web",
    subheading: ["TypeScript","React", "Next.js", "Three.js"],
    hoverHeading: "Portfolio 2025",
    hoverSubheading: "En savoir plus",
    title: "Portfolio 2025",
    description: "Ce portfolio a été conçu pour exprimer ma créativité et mettre en valeur les compétences que j’ai développées ces derniers mois. C’est aussi un terrain d’expérimentation où j’explore des effets visuels, des animations et de nouvelles technologies, tout en veillant à la cohérence et à la fluidité de l’expérience utilisateur.",
    transitionLabel: "Portfolio 2025",
    status: "Terminé",
    type: "Site web",
    annee: "2025",
    link: [{ url: "https://github.com/Alej-o/alej-portfolio", label: "GitHub" },],
    stack: ["TypeScript", "Next.js", "Three.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    slug: "site-web",
    heading: "Site web",
    subheading: ["TypeScript", "React", "Next.js"],
    hoverHeading: "Site de vente de services",
    hoverSubheading: "En cours de développement",
    title: "Site de vente de services",
    description: "Création d’un site web pour une praticienne en bien-être : achat de services à distance (immédiats) ou sur rendez-vous, prise de rendez-vous en ligne, et présentation de l’offre.",
    transitionLabel: "Site de vente de services",
    status: "En cours",
    type: "Site web",
    annee: "2025",
    stack: ["TypeScript", "React", "Next.js"],

  },
];
