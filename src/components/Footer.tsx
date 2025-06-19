import SlideButton from "./SlideButton";
import FlipLink from "./FlipLink";
export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full text-black ${className}`}>
      <div className="w-full flex flex-col md:flex-row justify-between items-end gap-6 px-6 min-h-[200px]">
        {/* Colonne gauche : le titre */}
        <div className="flex items-end">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons<br />Connectés
          </h2>
        </div>

        {/* Colonne droite : contenu bas aligné */}
        <div className="flex flex-col justify-end flex-1 font-title">
          <div className="flex flex-wrap items-center gap-6">
            <p className="text-black text-4xl ">Une idée, un projet ?</p>
            <SlideButton
              href="mailto:agathe.lejour@email.com"
              className="px-6 py-3 text-beige text-3xl font-title rounded-md transition duration-300 flex items-center gap-2 uppercase"
              
            >
              Contact
            </SlideButton>
          </div>

          <hr className="w-full border-black my-4" />

          <div className="flex max-w-2xl text-2xl justify-between items-center text-black">
           <FlipLink
  href="#"
  hoverChildren={"LinkedIn"}
>
  LinkedIn
</FlipLink>
            <FlipLink
  href="#"
  hoverChildren={"GitHub"}
>GitHub</FlipLink >
            <FlipLink
  href="#"
  hoverChildren={"Annexe"}
> Annexe</FlipLink >
          </div>
        </div>
      </div>
    </footer>
  );
}
