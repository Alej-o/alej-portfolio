import dynamic from "next/dynamic";
import LazyInView from "./LazyInView";

const HeroBackgroundCanvas = dynamic(() => import("./HeroBackgroundCanvas"), {
  ssr: false
});

export default function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] overflow-hidden">
      <LazyInView
        idleDelay={500}
        fallback={<div className="absolute inset-0 bg-[url(/poster.jpg)] bg-cover bg-center" aria-hidden />}
      >
        <div className="absolute inset-0">
          <HeroBackgroundCanvas />
        </div>
      </LazyInView>
    </section>
  );
}
