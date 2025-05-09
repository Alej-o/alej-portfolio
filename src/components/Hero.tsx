"use client";


export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Overlay strié + blur sur 50 % largeur */}
      <div
        className={`
          absolute inset-y-0 left-0 w-1/2   
          pointer-events-none             
          bg-[repeating-linear-gradient(
            90deg,
            rgba(255,255,255,0.2)_0,
            rgba(255,255,255,0.2)_1px,
            transparent_1px,
            transparent_7px
          )]                               
          backdrop-blur-lg                
          z-0                              
        `}
      />

      {/* Contenu au-dessus */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-left">
        <h1 className="text-7xl font-milk-honey text-white">Agathe Lejour</h1>
        <p className="mt-4 text-xl font-milk-honey text-white">
          Développeuse web et mobile
        </p>
      </div>
    </section>
  );
}





// import { Canvas } from "@react-three/fiber";
// import { HeroBackground } from "../components/HeroBackground";


      {/* <div className="absolute inset-0 z-0 pointer-events-auto">
        <Canvas
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          className="w-full h-full" 
        >
          <HeroBackground />
        </Canvas>
      </div> */}