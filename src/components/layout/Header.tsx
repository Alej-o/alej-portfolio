'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import FlipLink from '../animations/FlipLink'
import { usePageTransition } from '../animations/PageTransition'
import MobileMenuOverlay from '../animations/MobileMenuOverlay'
import { useMenuStore } from '../../app/lib/menuStore'

export default function Header() {
  const headerRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [isDarkBackground, setIsDarkBackground] = useState(true)
  const pathname = usePathname()
  const { startTransition } = usePageTransition()
  const { isOpen, toggleMenu } = useMenuStore()
  const isHome = pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const hero = document.querySelector('#hero')
    if (!hero || !isHome) return setIsDarkBackground(false)

    const observer = new IntersectionObserver(
      ([entry]) => setIsDarkBackground(entry.isIntersecting),
      { threshold: 0.01, rootMargin: '-64px 0px 0px 0px' }
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
      className={`fixed top-0 w-full min-h-[64px] transition-all duration-500 ${
        isOpen ? 'z-[10000]' : 'z-30'
      } ${scrolled ? 'bg-black/10 backdrop-blur-md shadow-md' : 'bg-transparent'}`}
    >
      {/* Header mobile */}
      <div className="flex justify-between items-center w-full px-4 sm:px-6 py-4 lg:hidden">
        <div className={`text-xs sm:text-sm font-title uppercase ${textColorClass} transition-colors duration-500`}>
          Agathe Lejour
        </div>
        <div className={`text-xs sm:text-sm font-title uppercase ${textColorClass} transition-colors duration-500 hidden xs:block`}>
          Portfolio 2025
        </div>
        <button
          onClick={toggleMenu}
          aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={isOpen}
          className={`uppercase font-title text-xs sm:text-sm md:text-2xl ${textColorClass} transition-colors duration-500 hover:opacity-70`}
        >
          {isOpen ? 'Fermer' : 'Menu'}
        </button>
      </div>

      {/* Header desktop */}
      <nav className="hidden lg:grid grid-cols-3 items-center px-6 xl:px-8 py-3">
        {/* Colonne gauche : logo */}
        <div className="flex justify-start">
          {isHome ? (
            <button
              onClick={() => {
                const hero = document.getElementById('hero')
                if (hero) hero.scrollIntoView({ behavior: 'smooth' })
              }}
              className={`font-title text-2xl xl:text-3xl 2xl:text-4xl uppercase ${textColorClass} cursor-pointer transition-colors duration-500 hover:opacity-70`}
            >
              Agathe Lejour
            </button>
          ) : (
            <button
              onClick={() => startTransition('/', 'ACCUEIL')}
              className={`font-title text-2xl xl:text-3xl 2xl:text-4xl uppercase ${textColorClass} transition-colors duration-500 hover:opacity-70`}
            >
              Agathe Lejour
            </button>
          )}
        </div>

        {/* Colonne centre : titre */}
        <div className={`text-center font-title text-xl xl:text-2xl 2xl:text-3xl uppercase ${textColorClass} transition-colors duration-500 hidden xl:block`}>
          PORTFOLIO 2025
        </div>

        {/* Colonne droite : liens */}
        <ul className="flex justify-end items-center gap-4 xl:gap-6 2xl:gap-8 font-title uppercase">
          {links.map(({ scrollTo, href, label }) => {
            const isExternal = href?.startsWith('mailto:')
            const isAnchor = isHome && scrollTo
            const fullHref = isAnchor ? `#${scrollTo}` : scrollTo ? '/' : href!
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
                  hoverChildren={<span className={`transition-colors duration-500 text-sm xl:text-base ${textColorClass}`}>{label}</span>}
                >
                  <span className={`transition-colors duration-500 text-sm xl:text-base ${textColorClass}`}>{label}</span>
                </FlipLink>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Overlay menu mobile */}
      <MobileMenuOverlay isDarkBackground={isDarkBackground} scrolled={scrolled} />
    </header>
  )
}
