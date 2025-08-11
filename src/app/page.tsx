'use client'

import About from '../components/sections/About'
import Projects from '../components/sections/Projects'
import TextParallaxContent from '../components/animations/TextParallaxContent'
import ScrollToAnchor from '../components/animations/ScrollToAnchor'

export default function Home() {
  return (
    <>
      <ScrollToAnchor />
      <main id="main-content">
        <TextParallaxContent>
          <About />
        </TextParallaxContent>
        <Projects />
      </main>
    </>
  )
}
