import SlideButton from "../animations/SlideButton";
import FlipLink from "../animations/FlipLink";

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full text-black ${className}`}>
      <div className="w-full grid grid-rows-2 md:grid-cols-[auto_1fr] gap-x-10 px-8 min-h-[300px] ">
        
       
        <div className="flex items-end">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons
          </h2>
        </div>

      
        <div className="flex items-center gap-6 mt-12">
          <p className="text-black text-4xl font-title ">Une idée, un projet ?</p>
          <SlideButton
            href="mailto:agathe.lejour@email.com"
            className="px-6 py-3 text-beige text-3xl font-title rounded-md transition duration-300 flex items-center gap-2 uppercase"
          >
            Contact
          </SlideButton>
        </div>

      
        <div className="flex items-start">
          <h2 className="text-[60px] sm:text-[90px] md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Connectés
          </h2>
        </div>

     
        <div className="flex flex-col">
          <hr className="w-full border-black mb-1" />
          <div className="flex gap-10 text-2xl font-title mt-6 justify-start text-black">
            <FlipLink href="#" hoverChildren="LinkedIn">LinkedIn</FlipLink>
            <FlipLink href="#" hoverChildren="GitHub">GitHub</FlipLink>
            <FlipLink href="#" hoverChildren="Annexe">Annexe</FlipLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

