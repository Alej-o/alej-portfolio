import { projectsData } from "@/data/projectsData";
import { notFound } from "next/navigation";
import Image from "next/image";
import { HoverLink } from "@/components/animations/HoverLink";
import SlideButton from "@/components/animations/SlideButton";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;

  const project = projectsData.find((p) => p.slug === slug);
  if (!project) return notFound();

  const otherProjects = projectsData.filter((p) => p.slug !== slug);

  return (
    <>
      <main className="bg-beige text-black flex flex-col md:flex-row px-10 pt-40 gap-12">
        <div className="flex-1 flex flex-col gap-10 max-w-6xl">
          <h2 className="text-8xl font-title leading-tight uppercase tracking-wider border-b border-black pb-4">
            {project.title}
          </h2>
          <p className="text-xl font-eb-garamond">(DESCRIPTION)</p>
          <p className="text-4xl font-eb-garamond">{project.description}</p>

          <div className="border-t border-black pt-10 text-4xl space-y-8">
            <DetailRow label="(TYPE)" value={project.type} />
            <DetailRow label="(TECHNOLOGIES)" value={project.subheading.join(", ")} />
            <DetailRow label="(STATUS)" value={project.status} />
            <DetailRow label="(ANNÉE)" value={project.annee} />
          </div>

          <DetailRow label="(LIEN)" value="">
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

      <section className="flex flex-col justify-center px-10 pt-20 pb-10">
        <h3 className="font-title uppercase mb-10 text-6xl text-black tracking-wider">
          Autres projets
        </h3>
        <div className="flex flex-col font-title text-2xl">
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
  value,
  children,
}: {
  label: string;
  value: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex justify-between border-b border-black pb-2">
      <span className="text-sm uppercase tracking-wider">{label}</span>
      {children ? (
        <span className="font-title">{children}</span>
      ) : (
        <span className="font-title">{value}</span>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }));
}
