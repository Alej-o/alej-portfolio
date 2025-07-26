import SlideButton from "../animations/SlideButton";
import FlipLink from "../animations/FlipLink";

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full text-black ${className}`}>
      {/* Desktop */}
      <div className="hidden xl:grid w-full xl:grid-cols-[auto_1fr] gap-x-4 xl:gap-x-10 px-4 xl:px-8 xl:min-h-[300px]">
        <div className="flex flex-col items-start justify-end">
          <h2 className="text-4xl md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons
          </h2>
        </div>

        <div className="flex items-center xl:gap-6 xl:mt-12">
          <p className="text-black text-xl xl:text-4xl font-title">Une idée, un projet ?</p>
          <SlideButton
            href="mailto:lejour.agathe@outlook.fr"
            className="px-2 py-2 xl:px-6 xl:py-3 text-beige text-xl xl:text-3xl font-title rounded-md transition duration-300 flex items-center xl:gap-2 uppercase"
          >
            Contact
          </SlideButton>
        </div>

        <div className="flex flex-col items-start">
          <h2 className="text-4xl md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Connectés
          </h2>
        </div>

        <div className="flex flex-col items-start">
          <hr className="w-full border-black mb-1" />
          <div className="flex gap-2 xl:gap-20 xl:text-2xl font-title mt-6 justify-start text-black">
            <FlipLink
              className="inline-block text-xl"
              href="https://www.linkedin.com/in/agathe-lejour"
              hoverChildren="LinkedIn"
              aria-label="Visiter mon profil LinkedIn (nouvel onglet)"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </FlipLink>

            <FlipLink
              className="inline-block text-xl"
              href="https://github.com/Alej-o"
              hoverChildren="GitHub"
              aria-label="Voir mon profil GitHub (nouvel onglet)"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </FlipLink>

            <FlipLink
              className="inline-block text-xl"
              href="mailto:lejour.agathe@outlook.fr"
              hoverChildren="Email"
              aria-label="Envoyer un email à Agathe Lejour"
            >
              Email
            </FlipLink>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet */}
      <div className="grid grid-cols-[2fr_1fr] lg:grid-cols-2 w-full px-4 md:px-8 py-8 xl:hidden items-center mx-auto">
        <div className="flex flex-col justify-center h-full pr-2">
          <h2 className="text-4xl md:text-6xl font-title uppercase text-left text-black leading-tight">
            Restons<br />Connectés
          </h2>
        </div>

        <div className="flex flex-col justify-start items-start gap-3 pl-4 md:pl-6 border-l border-black">
          <a
            href="https://www.linkedin.com/in/agathe-lejour"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visiter mon profil LinkedIn (nouvel onglet)"
            className="flex font-eb-garamond text-2xl md:text-3xl items-start"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Alej-o"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir mon profil GitHub (nouvel onglet)"
            className="flex font-eb-garamond text-2xl md:text-3xl items-start"
          >
            GitHub
          </a>
          <a
            href="mailto:lejour.agathe@outlook.fr"
            aria-label="Envoyer un email à Agathe Lejour"
            className="flex font-eb-garamond text-2xl md:text-3xl items-start"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
