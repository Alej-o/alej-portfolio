export default function Header() {
  return (
    <header className="absolute top-8 left-0 w-full z-20  bg-transparent px-5 py-2 ">
      <nav className="flex items-center">
       
        <div className="logo">…</div>
        
        <ul className="flex items-center gap-6 text-white text-4xl ml-auto">
  <li><a href="#skills" className="hover:underline font-milk-honey">Technologies</a></li>
  <li><a href="#projects" className="hover:underline font-milk-honey">Projets</a></li>
  <li><a href="#about" className="hover:underline font-milk-honey">À propos</a></li>
  <li>
    <a
      href="mailto:agathe.lejour@email.com?subject=Contact%20depuis%20le%20portfolio"
      className="
        flex items-center justify-center text-4xl text-white font-milk-honey
      "
    >
      Contact
    </a>
  </li>
</ul>

      </nav>
    </header>
  );
}
