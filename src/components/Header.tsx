"use client";
import React from "react";
import FlipLink from "./FlipLink";

export default function Header() {
  return (
    <header className="absolute top-8 w-full z-20 bg-transparent px-5 py-4">
      <nav className="flex items-center h-full justify-between">
        <div className="logo">…</div>

        <ul className="flex items-center gap-6 ml-auto">
          <li>
            <FlipLink
              href="#skills"
              hoverChildren={<span className="text-yellow">Technologies</span>}
            >
              <span className="text-beige">Technologies</span>
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
              href="#about"
              hoverChildren={<span className="text-yellow">À propos</span>}
            >
              <span className="text-beige">À propos</span>
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
