export default function Footer() {
  return (
    <footer className="bg-beige text-black w-full mt-auto">
      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 px-6 min-h-[300px]">
        {/* Colonne gauche : le titre */}
        <div className="flex items-end">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons<br />Connectés
          </h2>
        </div>

        {/* Colonne droite : contenu bas aligné */}
        <div className="flex flex-col justify-end flex-1 font-title">
          <div className="flex flex-wrap justify-start gap-6">
            <p className="text-black text-3xl">Une idée, un projet ?</p>
            <a
              href="mailto:agathe.lejour@email.com"
              className="px-4 py-1 border border-black text-black rounded-md text-3xl hover:bg-black hover:text-beige transition"
            >
              Contact
            </a>
          </div>

          <hr className="w-full border-black my-4" />

          <div className="flex max-w-2xl text-2xl justify-between items-center text-black">
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
            <a href="#">Annexe</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
