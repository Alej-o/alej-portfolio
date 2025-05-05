export default function Header() {
  return (
    <header className="absolute top-0 left-0 w-full z-20 bg-transparent px-6 py-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-white font-bold text-xl">Agathe</h1>
        <ul className="flex gap-3 text-white text-sm">
          <li><a href="#projects" className="hover:underline">Projets</a></li>
          <li><a href="#skills" className="hover:underline">Compétences</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
