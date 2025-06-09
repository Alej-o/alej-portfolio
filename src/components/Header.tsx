"use client";
import FlipLink from "./FlipLink";
import React, { useEffect, useState } from "react";
export default function Header() {
   const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`fixed  w-full z-20 bg-transparent px-3 py-2 transition-all duration-300  ${scrolled ? "bg-black/30 backdrop-blur-md shadow-md" : "bg-transparent"}`} >
  <nav className="flex items-center h-full justify-between">
    <div className="text-beige font-title text-4xl pl-6 uppercase">Agathe Lejour</div>
    <div className="absolute left-1/2 transform -translate-x-1/2 text-beige font-title text-4xl uppercase">
    PORTFOLIO 2025
  </div>
    <ul className="flex items-center gap-8 ml-auto font-title mr-6 uppercase">
      <li>
        <FlipLink
          href="#about"
          hoverChildren={<span className="text-yellow">À propos</span>}
        >
          <span className="text-beige">À propos</span>
        </FlipLink>
      </li>
      <li>
        <FlipLink
          href="#projects"
          hoverChildren={<span className="text-yellow">Projets</span>}
        >
          <span className="text-beige">Projets</span>
        </FlipLink>
      </li>
      <li>
        <FlipLink
          href="mailto:agathe.lejour@email.com"
          hoverChildren={<span className="text-yellow">Contact</span>}
        >
          <span className="text-beige">Contact</span>
        </FlipLink>
      </li>
    </ul>
  </nav>
</header>

  );
}
