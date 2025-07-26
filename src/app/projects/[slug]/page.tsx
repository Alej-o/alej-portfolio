import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HoverLink } from "@/components/animations/HoverLink";
import RevealTextOnScroll from "@/components/animations/RevealTextOnScroll";

type ProjectLink = string | { url: string; label: string };

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return notFound();

  const otherProjects = projectsData.filter((p) => p.slug !== slug);

  const delays = [0, 0.13, 0.26, 0.39, 0.52, 0.65];
  const hasGallery = !!project.images && project.images.length > 0;

  const links: { url: string; label: string }[] = (project.link ?? []).map((l: ProjectLink) =>
    typeof l === "string"
      ? { url: l, label: l.includes("github.com") ? "Voir le code sur GitHub" : "Visiter le site" }
      : l
  );

  return (
    <>
      <main
        className={`bg-beige text-black flex flex-col ${
          hasGallery ? "md:flex-row" : ""
        } px-4 md:px-10 xl:px-10 pt-28 xl:pt-40 gap-12`}
      >
        
        <div
          className={`flex flex-col gap-10 w-full ${
            hasGallery ? "flex-1 max-w-6xl" : ""
          }`}
        >
          <RevealTextOnScroll delay={delays[0]}>
            <div className="w-full">
              <h2 className="text-6xl xl:text-8xl font-title uppercase tracking-wider pb-2 text-left">
                {project.title}
              </h2>
              <div className="border-b border-black w-full" />
            </div>
          </RevealTextOnScroll>
          <p className="text-sm font-eb-garamond">(DESCRIPTION)</p>
          <RevealTextOnScroll delay={delays[1]}>
            <p className="text-3xl xl:text-4xl font-eb-garamond mb-2">
              {project.description}
            </p>
          </RevealTextOnScroll>

          <div className="border-t font-eb-garamond border-black pt-8 text-2xl xl:text-4xl space-y-8">
            <DetailRow label="(TYPE)">
              <RevealTextOnScroll delay={delays[2]}>
                {project.type}
              </RevealTextOnScroll>
            </DetailRow>
            <DetailRow label="(TECHNOLOGIES)">
              <RevealTextOnScroll delay={delays[3]}>
                {project.stack?.join(", ")}
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
              {links.length > 0 ? (
                <div className="flex gap-4 flex-col">
                  {links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-end items-end text-left font-eb-garamond text-2xl xl:text-4xl hover:text-[#8C0812] transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : (
                <span className="font-eb-garamond xl:text-4xl">En cours</span>
              )}
            </RevealTextOnScroll>
          </DetailRow>
        </div>

  
        {hasGallery && (
          <div className="flex-1 w-full pt-2 md:pt-0">
            <div className="pt-2 pb-2">
              <div className="flex flex-row flex-wrap md:flex-nowrap gap-6 w-full justify-center items-center">
                {project.images!.map((img, idx) => (
                  <div
                    key={img}
                    className="w-[370px] overflow-hidden"
                  >
                    <Image
                      src={img.startsWith("/") ? img : `/${img}`}
                      alt={`Capture d'écran ${idx + 1} - ${project.title}`}
                      width={600}
                      height={600}
                      className="object-cover w-full h-auto"
                      draggable={false}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

    
      <section className="flex flex-col justify-center px-4 md:px-10 xl:px-10 pt-20 pb-10">
        <h3 className="font-title uppercase mb-10 text-4xl xl:text-6xl text-black tracking-wider">
          autres projets
        </h3>
        <div className="flex flex-col border-t border-black">
          {otherProjects.map((p, index) => (
            <HoverLink
              key={p.slug}
              {...p}
              isFirst={index === 0}
              variant="compact"
              imgSrc={p.imgSrc || undefined}
            />
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
    <div className="flex border-b border-black pb-2 min-h-[64px]">
      <div className="flex flex-col items-start justify-start w-1/4">
        <span className="text-sm font-eb-garamond uppercase tracking-wider">
          {label}
        </span>
      </div>
      <div className="flex flex-1 items-end justify-end">
        <span className="font-title text-right">{children}</span>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
