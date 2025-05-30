'use client'

import Hero from './Hero'
import About from './About'
import Projects from './Projects'

export default function PageContent() {
  return (
    <main className="bg-black text-white">
      <section className="h-screen">
        <Hero />
      </section>

      <section className="py-20">
        <About />
      </section>

      <section className="h-screen">
        <Projects />
      </section>
    </main>
  )
}
