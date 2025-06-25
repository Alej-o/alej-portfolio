'use client';

import React, { useEffect, useRef, useState } from 'react';
import FlipLink from '../animations/FlipLink';

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true); // white by default

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hero = document.querySelector('#hero');
    if (!hero || !headerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkBackground(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
        rootMargin: '-64px 0px 0px 0px',
      }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const textColorClass = isDarkBackground ? 'text-beige' : 'text-black';

  return (
    <header
      ref={headerRef}
      className={`fixed w-full z-30 transition-all duration-500 ${
        scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-8 py-3">
        <div className={`font-title text-4xl uppercase transition-colors duration-500 ${textColorClass}`}>
          Agathe Lejour
        </div>

        <div className={`absolute left-1/2 transform -translate-x-1/2 font-title text-4xl  uppercase transition-colors duration-500 ${textColorClass}`}>
          PORTFOLIO 2025
        </div>

        <ul className="flex items-center gap-8 ml-auto font-title uppercase">
          {['#about', '#projects', 'mailto:agathe.lejour@email.com'].map((href, i) => {
            const label = ['À propos', 'Projets', 'Contact'][i];
            return (
              <li key={href}>
                <FlipLink
                  href={href}
                  hoverChildren={<span className={`transition-colors duration-500 ${textColorClass}`}>{label}</span>}
                >
                  <span className={`transition-colors duration-500 ${textColorClass}`}>{label}</span>
                </FlipLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

