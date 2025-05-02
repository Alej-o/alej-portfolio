import Hero from '../components/Hero';
import Projects from '../components/Projects';
import Skills from '../components/Skills';

export default function Home() {
  return (
    <main className="px-6">
      <Hero />
      <Projects />
      <Skills />
    </main>
  );
}
