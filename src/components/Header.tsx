export default function Header() {
  return (
    <header className="absolute top-3 left-0 w-full z-20  bg-transparent px-5 py-2">
      <nav className="flex items-center">
        {/* Ici tu pourrais avoir un logo */}
        <div className="logo">…</div>

        {/* ml-auto repousse cette liste tout à droite */}
        <ul className="flex gap-6 text-white text-2xl ml-auto">
          <li><a href="#projects" className="hover:underline font-milk-honey">Projets</a></li>
          <li><a href="#skills"   className="hover:underline font-milk-honey">Compétences</a></li>
          <li><a href="#about"  className="hover:underline font-milk-honey">A propos</a></li>
          <li><a href="#contact"  className="hover:underline font-milk-honey">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}
