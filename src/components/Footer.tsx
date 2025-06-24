import SlideButton from "./SlideButton";
import FlipLink from "./FlipLink";

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full text-black ${className}`}>
      <div className="w-full grid grid-rows-2 md:grid-cols-[auto_1fr] gap-x-10 px-8 min-h-[300px] ">
        
        {/* Ligne 1 gauche - RESTONS */}
        <div className="flex items-end">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons
          </h2>
        </div>

        {/* Ligne 1 droite - Une idée + contact (centré entre les deux mots) */}
        <div className="flex items-center gap-6 mt-12">
          <p className="text-black text-4xl font-title ">Une idée, un projet ?</p>
          <SlideButton
            href="mailto:agathe.lejour@email.com"
            className="px-6 py-3 text-beige text-3xl font-title rounded-md transition duration-300 flex items-center gap-2 uppercase"
          >
            Contact
          </SlideButton>
        </div>

        {/* Ligne 2 gauche - CONNECTÉS */}
        <div className="flex items-start">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Connectés
          </h2>
        </div>

        {/* Ligne 2 droite - ligne + liens alignés à CONNECTÉS */}
        <div className="flex flex-col justify-start">
          <hr className="w-full border-black mb-1" />
          <div className="flex gap-10 text-2xl font-title text-black">
            <FlipLink href="#" hoverChildren="LinkedIn">LinkedIn</FlipLink>
            <FlipLink href="#" hoverChildren="GitHub">GitHub</FlipLink>
            <FlipLink href="#" hoverChildren="Annexe">Annexe</FlipLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

