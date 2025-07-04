'use client';

import { usePathname } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import FlipLink from '../animations/FlipLink';
import { usePageTransition } from '../animations/PageTransition'; 

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkBackground, setIsDarkBackground] = useState(true);
  const pathname = usePathname();
  const { startTransition} = usePageTransition(); 
  const isHome = pathname === '/';
  

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const hero = document.querySelector('#hero');

    if (!hero || pathname !== '/') {
      setIsDarkBackground(false);
      return;
    }

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
  }, [pathname]);

  const textColorClass = isDarkBackground ? 'text-beige' : 'text-black';

  const scrollToHash = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      ref={headerRef}
      className={`fixed w-full z-30 transition-all duration-500 ${
        scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-8 py-3">
        {isHome ? (
  <span
    className={`font-title text-4xl uppercase transition-colors duration-500 ${textColorClass} cursor-default`}
  >
    Agathe Lejour
  </span>
) : (
  <button
    onClick={() => {
     startTransition("/", "ACCUEIL");
      
    }}
     
    className={`cursor-pointer font-title text-4xl uppercase transition-colors duration-500 ${textColorClass}`}
  >
    Agathe Lejour
  </button>
)}

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 font-title text-4xl uppercase transition-colors duration-500 ${textColorClass}`}
        >
          PORTFOLIO 2025
        </div>

        <ul className="flex items-center gap-8 ml-auto font-title uppercase">
          {[
            { href: '#about', label: 'À propos' },
            { href: '#projects', label: 'Projets' },
            { href: 'mailto:lejour.agathe@outlook.fr', label: 'Contact' },
          ].map(({ href, label }) => {
            const isHash = href.startsWith('#');

            const handleClick = (e: React.MouseEvent) => {
              e.preventDefault();
              if (isHash) {
              
                if (isHome) {
                  scrollToHash(href);
                } else {
                 startTransition('/' + href, label.toUpperCase());
                }
              } else {
                window.location.href = href;
              }
            };

            return (
              <li key={href}>
                <button onClick={handleClick}>
                  <FlipLink
                    href={href}
                    hoverChildren={
                      <span className={` uppercase transition-colors duration-500 ${textColorClass}`}>
                        {label}
                      </span>
                    }
                  >
                    <span className={`uppercase transition-colors duration-500 ${textColorClass}`}>
                      {label}
                    </span>
                  </FlipLink>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
