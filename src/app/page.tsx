'use client'

import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import TextParallaxContent from '../components/animations/TextParallaxContent'
import ScrollToAnchor from '../components/ScrollToAnchor'

export default function Home() {
  return (
    <>
      <ScrollToAnchor />
      <main id="main-content">
        <TextParallaxContent>
          <section
            id="about"
            aria-labelledby="about-heading"
            className="bg-beige text-black"
          >
            <h2 id="about-heading" className="sr-only">À propos</h2>
            <About />
          </section>
        </TextParallaxContent>

        <section
          id="projects"
          aria-labelledby="projects-heading"
          className="bg-beige text-black"
        >
          <h2 id="projects-heading" className="sr-only">Projets</h2>
          <Projects />
        </section>
      </main>
    </>
  )
}
