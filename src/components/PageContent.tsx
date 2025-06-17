'use client'

import About from './About'
import Projects from './Projects'
import TextParallaxContent from './TextParallaxContent'

export default function PageContent() {
  return (
    <main className="bg-beige text-black">
      {/* Hero + Texte + About = intégré dans TextParallaxContent */}
      <TextParallaxContent>
        <About />
      </TextParallaxContent>

      {/* Le reste de la page */}
      <section  id="projects">
        <Projects />
      </section>
    </main>
  )
}
