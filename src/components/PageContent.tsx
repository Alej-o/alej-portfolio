'use client'

import Hero from './Hero'
import About from './About'
import Projects from './Projects'

export default function PageContent() {
  return (
    <main className="bg-black text-white">
      <section className="h-screen" id="hero">
        <Hero />
      </section>

      <section className="py-20 mb-20 " id="about">
  <About />
</section>

      <section className="py-15" id="projects">
        <Projects />
      </section>
    </main>
  )
}
