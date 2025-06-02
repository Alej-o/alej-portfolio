export default function Footer() {
  return (
    <footer
      className="relative bg-black text-beige py-24 px-6 bg-cover bg-center">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        {/* Titre géant */}
        <h2 className="text-[60px] sm:text-[90px] md:text-[120px] leading-[0.85] uppercase text-yellow font-milk-honey tracking-tight">
          Restons <br /> Connectés
        </h2>

        {/* Colonne droite */}
        <div className="flex-1 flex flex-col justify-center items-start gap-8">
          <p className="text-xl">Je suis toujours curieuse à propos de :</p>

          <div className="flex flex-wrap gap-3">
            {[
              'UX/UI Design',
              'Frontend Dev',
              'Node.js',
              'Startups',
              'Pizza',
              'Web3',
              'Design Systems',
            ].map((tag, i) => (
              <span
                key={i}
                className="px-5 py-2 rounded-full border border-beige text-beige text-sm hover:bg-beige hover:text-black transition"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <p className="text-xl font-light">Une idée, un projet ?</p>
            <a
              href="mailto:agathe.lejour@email.com"
              className="px-6 py-3 bg-beige text-black rounded-full font-bold text-lg transition duration-300 hover:bg-yellow"
            >
              Contactez-moi
            </a>
          </div>

          {/* Réseaux */}
          <div className="flex gap-6 mt-8 text-sm uppercase tracking-wider">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              LinkedIn
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              GitHub
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:underline">
              Instagram
            </a>
            <a href="mailto:agathe.lejour@email.com" className="hover:underline">
              Mail
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
