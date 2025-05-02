export default function Header() {
    return (
      <header className="py-4 px-6 border-b border-orange-300">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Alej</h1>
          <ul className="flex gap-4 text-sm">
            <li><a href="#projects" className="hover:underline">Projets</a></li>
            <li><a href="#skills" className="hover:underline">Compétences</a></li>
            <li><a href="mailto:tonmail@mail.com" className="hover:underline">Contact</a></li>
          </ul>
        </nav>
      </header>
    );
  }
  