'use client'

import About from './About'
import Projects from './Projects'
import TextParallaxContent from './TextParallaxContent'

export default function PageContent() {
  return (
    <main>
  <TextParallaxContent>
    <section id="about" className="bg-beige text-black">
      <About />
    </section>
  </TextParallaxContent>

  <section id="projects" className="bg-beige text-black">
    <Projects />
  </section>
</main>
  )
}
