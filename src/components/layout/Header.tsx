'use client'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import FlipLink from '../animations/FlipLink'
import { usePageTransition } from '../animations/PageTransition'

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const pathname = usePathname()
  const { startTransition } = usePageTransition()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero || !isHome) {
      setIsDarkBackground(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsDarkBackground(entry.isIntersecting)
      },
      {
        threshold: 0.01,
        rootMargin: '-64px 0px 0px 0px',
      }
    )
    observer.observe(hero)
    return () => observer.disconnect()
  }, [isHome])

  const textColorClass = isDarkBackground ? 'text-beige' : 'text-black'

  const links = [
    { scrollTo: 'about', label: 'À propos' },
    { scrollTo: 'projects', label: 'Projets' },
    { href: 'mailto:lejour.agathe@outlook.fr', label: 'Contact' },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed w-full z-30 transition-all duration-500 ${
        scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="flex items-center justify-between px-8 py-3">
        {isHome ? (
  <button
    onClick={() => {
      const hero = document.getElementById('hero')
      if (hero) {
        hero.scrollIntoView({ behavior: 'smooth' })
      }
    }}
    className={`font-title text-4xl uppercase ${textColorClass} cursor-pointer`}
  >
    Agathe Lejour
  </button>
) : (
  <button
    onClick={() => startTransition('/', 'ACCUEIL')}
    className={`font-title text-4xl uppercase ${textColorClass}`}
  >
    Agathe Lejour
  </button>
)}

        <div
          className={`absolute left-1/2 transform -translate-x-1/2 font-title text-4xl uppercase ${textColorClass}`}
        >
          PORTFOLIO 2025
        </div>

        <ul className="flex items-center gap-8 ml-auto font-title uppercase">
          {links.map(({ scrollTo, href, label }) => {
            const isExternal = href?.startsWith('mailto:')
            const isAnchor = isHome && scrollTo

            const fullHref = isAnchor
              ? `#${scrollTo}` 
              : scrollTo
                ? '/' 
                : href!

            const handleClick = (e: React.MouseEvent) => {
              if (scrollTo) {
                e.preventDefault()
                if (isHome) {
                  const el = document.getElementById(scrollTo)
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                } else {
                  sessionStorage.setItem('scrollTo', scrollTo)
                  startTransition('/', label.toUpperCase())
                }
              }
            }

            return (
              <li key={label}>
                <FlipLink
                  href={fullHref}
                  label={label.toUpperCase()}
                  skipTransition={Boolean(isAnchor || isExternal)}
                  onClick={scrollTo ? handleClick : undefined}
                  hoverChildren={
                    <span className={`transition-colors ${textColorClass}`}>{label}</span>
                  }
                >
                  <span className={`transition-colors ${textColorClass}`}>{label}</span>
                </FlipLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
