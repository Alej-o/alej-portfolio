import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HoverLink } from "@/components/animations/HoverLink";
import SlideButton from "@/components/animations/SlideButton";
import RevealTextOnScroll from "@/components/animations/RevealTextOnScroll";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return notFound();

  const otherProjects = projectsData.filter((p) => p.slug !== slug);

 
  const delays = [0, 0.13, 0.26, 0.39, 0.52, 0.65];

  return (
    <>
      <main className="bg-beige text-black flex flex-col md:flex-row px-4 md:px-10 xl:px-10 pt-28 xl:pt-40 gap-12">
        <div className="flex-1 flex flex-col gap-10 max-w-6xl">
         
          <RevealTextOnScroll delay={delays[0]}>
            <h2 className="text-6xl xl:text-8xl font-title leading-tight uppercase tracking-wider border-b border-black pb-4">
              {project.title}
            </h2>
          </RevealTextOnScroll>
         
          <p className="text-xl font-eb-garamond">(DESCRIPTION)</p>
          
          <RevealTextOnScroll delay={delays[1]}>
            <p className="text-3xl xl:text-4xl font-eb-garamond">{project.description}</p>
          </RevealTextOnScroll>

          <div className="border-t border-black pt-10 text-2xl xl:text-4xl space-y-8">
          
            <DetailRow label="(TYPE)">
              <RevealTextOnScroll delay={delays[2]}>
                {project.type}
              </RevealTextOnScroll>
            </DetailRow>
            <DetailRow label="(TECHNOLOGIES)">
              <RevealTextOnScroll delay={delays[3]}>
                {project.subheading.join(", ")}
              </RevealTextOnScroll>
            </DetailRow>
            <DetailRow label="(STATUS)">
              <RevealTextOnScroll delay={delays[4]}>
                {project.status}
              </RevealTextOnScroll>
            </DetailRow>
            <DetailRow label="(ANNÉE)">
              <RevealTextOnScroll delay={delays[5]}>
                {project.annee}
              </RevealTextOnScroll>
            </DetailRow>
          </div>

          <DetailRow label="(LIEN)">
            <RevealTextOnScroll delay={0.78}>
              {project.link ? (
                <SlideButton
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="uppercase flex justify-center items-center"
                >
                  {project.link.includes("github.com") ? "Voir le code sur GitHub" : "Visiter le site"}
                </SlideButton>
              ) : (
                <span className="font-title">Non disponible</span>
              )}
            </RevealTextOnScroll>
          </DetailRow>
        </div>

       
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 justify-center items-center">
          <Image
            src={project.imgSrc}
            alt={project.title}
            width={300}
            height={200}
            className="object-cover rounded-lg"
          />
        </div>
      </main>

      <section className="flex flex-col justify-center px-4 md:px-10 xl:px-10 pt-20 pb-10">
        <h3 className="font-title uppercase mb-10 text-4xl xl:text-6xl  text-black tracking-wider">
          autres projets
        </h3>
        <div className="flex flex-col border-t border-black">
          {otherProjects.map((p, index) => (
            <HoverLink key={p.slug} {...p} isFirst={index === 0} variant="compact" />
          ))}
        </div>
      </section>
    </>
  );
}

function DetailRow({
  label,
  children,
}: {
  label: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b border-black pb-2">
      <span className="text-sm uppercase tracking-wider">{label}</span>
      <span className="font-title text-right">{children}</span>
    </div>
  );
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
