import dynamic from "next/dynamic";

const HeroBackgroundSwitch = dynamic(() => import("./HeroBackgroundSwitch"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[url(/poster.jpg)] bg-cover bg-center" aria-hidden />
});

export default function Hero() {
  return (
    <section id="hero" className="relative h-[100svh] overflow-hidden">
      <HeroBackgroundSwitch />
    </section>
  );
}
