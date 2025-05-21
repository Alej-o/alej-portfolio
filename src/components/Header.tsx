"use client";
import React from "react"
import FlipLink from "./FlipLink";
export default function Header() {
  return (
    <header className="absolute top-8 w-full z-20  bg-transparent px-5 py-4 ">
      <nav className="flex items-center h-full justify-between">
       
        <div className="logo">…</div>
        
  <ul className="flex items-center gap-6 ml-auto">
  <li><FlipLink href="#skills">Technologies</FlipLink></li>
  <li><FlipLink href="#projects">Projets</FlipLink></li>
  <li><FlipLink href="#about">À propos</FlipLink></li>
  <li>
    <FlipLink
      href="mailto:agathe.lejour@email.com?subject=Contact%20depuis%20le%20portfolio"
      // className="
      //   flex items-center justify-center text-4xl text-white font-milk-honey
      // "
    >
      Contact
    </FlipLink>
  </li>
</ul>

      </nav>
    </header>
  );
}
