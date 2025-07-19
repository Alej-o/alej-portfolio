import SlideButton from "../animations/SlideButton";
import FlipLink from "../animations/FlipLink";

export default function Footer({ className = "" }) {
  return (
    <footer className={`w-full text-black ${className}`}>
      <div className="w-full grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-x-4 xl:gap-x-10 px-4 xl:px-8 xl:min-h-[300px]">

        
       
        <div className="flex items-end">
          <h2 className="text-4xl  md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Restons
          </h2>
        </div>

      
        <div className="flex items-center xl:gap-6 xl:mt-12">
          <p className="text-black text-xl xl:text-4xl font-title ">Une idée, un projet ?</p>
          <SlideButton
            href="mailto:agathe.lejour@email.com"
            className=" px-2 py-2 xl:px-6 xl:py-3 text-beige text-xl xl:text-3xl font-title rounded-md transition duration-300 flex items-center xl:gap-2 uppercase"
          >
            Contact
          </SlideButton>
        </div>

      
        <div className="flex items-start">
          <h2 className="text-4xl md:text-[110px] leading-[0.85] font-title uppercase text-left">
            Connectés 
          </h2>
        </div>

     
        <div className="flex flex-col">
          <hr className="w-full border-black mb-1" />
          <div className="flex gap-2 xl:gap-10 text-xl xl:text-2xl font-title mt-6 justify-start text-black">
            <FlipLink href="#" hoverChildren="LinkedIn">LinkedIn</FlipLink>
            <FlipLink href="#" hoverChildren="GitHub">GitHub</FlipLink>
            <FlipLink href="#" hoverChildren="Annexe">Annexe</FlipLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

