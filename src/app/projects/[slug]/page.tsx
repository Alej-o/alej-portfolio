import { projectsData } from "@/data/projectsData"
import { notFound } from "next/navigation"
import Image from "next/image"
import { HoverLink } from "@/components/animations/HoverLink"
import RevealTextOnScroll from "@/components/animations/RevealTextOnScroll"
import { ArrowUpRight } from "lucide-react"
import type { Metadata } from "next"

type ProjectLink = string | { url: string; label: string }

type Props = {
  params: { slug: string }
  searchParams?: { [key: string]: string | string[] | undefined }
}

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projectsData.find((p) => p.slug === params.slug)
  if (!project) return {}

  return {
    title: `${project.title} – Agathe Lejour`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images?.length ? [project.images[0]] : [],
    },
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = projectsData.find((p) => p.slug === params.slug)
  if (!project) return notFound()

  const otherProjects = projectsData.filter((p) => p.slug !== params.slug)
  const links: { url: string; label: string }[] = (project.link ?? []).map((l: ProjectLink) =>
    typeof l === "string"
      ? { url: l, label: l.includes("github.com") ? "Voir le code sur GitHub" : "Visiter le site" }
      : l
  )

  const delays = [0, 0.13, 0.26, 0.39, 0.52, 0.65]
  const hasGallery = !!project.images?.length

  return (
    <>
      <main
        className={`bg-beige text-black flex flex-col ${
          hasGallery ? "md:flex-row" : ""
        } px-4 md:px-10 xl:px-10 pt-28 xl:pt-40 gap-12`}
        aria-labelledby="project-title"
      >
        <section className={`flex flex-col gap-10 w-full ${hasGallery ? "flex-1 max-w-6xl" : ""}`}>
          <RevealTextOnScroll delay={delays[0]}>
            <header>
              <h1 id="project-title" className="text-6xl xl:text-8xl font-title uppercase tracking-wider pb-2">
                {project.title}
              </h1>
              <hr className="border-black" />
            </header>
          </RevealTextOnScroll>

          <p className="text-sm font-eb-garamond ">(DESCRIPTION)</p>
          <RevealTextOnScroll delay={delays[1]}>
            <p className="text-3xl xl:text-4xl font-eb-garamond xl:pb-4">{project.description}</p>
          </RevealTextOnScroll>

          <dl className="border-t font-eb-garamond border-black pt-8 text-2xl xl:text-4xl space-y-8">
            <DetailRow label="(Type)" delay={delays[2]}>{project.type}</DetailRow>
            <DetailRow label="(Technologies)" delay={delays[3]}>
              {project.stack?.join(", ")}
            </DetailRow>
            <DetailRow label="(Statut)" delay={delays[4]}>{project.status}</DetailRow>
            <DetailRow label="(Année)" delay={delays[5]}>{project.annee}</DetailRow>
          </dl>

          <DetailRow label="(Lien)">
            <RevealTextOnScroll delay={0.78}>
              {links.length > 0 ? (
                <ul className="flex gap-4 flex-col">
                  {links.map((link) => (
                    <li key={link.url}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 font-eb-garamond text-2xl xl:text-4xl hover:text-[#8C0812] transition-colors"
                        aria-label={link.label}
                      >
                        {link.label}
                        <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="font-eb-garamond xl:text-4xl">En cours</span>
              )}
            </RevealTextOnScroll>
          </DetailRow>
        </section>

        {hasGallery && (
          <section className="flex-1 w-full xl:pt-[120px] md:pt-0" aria-label="Galerie d’images du projet">
            <div className="flex flex-wrap md:flex-nowrap gap-6 justify-center items-center">
              {project.images?.map((img, idx) => (
                <div key={img} className="w-[370px] overflow-hidden">
                  <Image
                    src={img.startsWith("/") ? img : `/${img}`}
                    alt={`Capture ${idx + 1} du projet ${project.title}`}
                    width={600}
                    height={600}
                    className="object-cover w-full h-auto"
                    draggable={false}
                    priority={idx === 0}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <section className="flex flex-col justify-center px-4 md:px-10 xl:px-10 pt-20 pb-10" aria-label="Autres projets">
        <h2 className="font-title uppercase mb-10 text-4xl xl:text-6xl text-black tracking-wider">
          Autres projets
        </h2>
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
  )
}

function DetailRow({
  label,
  children,
  delay = 0,
}: {
  label: string
  children?: React.ReactNode
  delay?: number
}) {
  return (
    <div className="flex border-b border-black pb-2 min-h-[64px]">
      <dt className="w-1/4 text-sm uppercase font-eb-garamond tracking-wider">{label}</dt>
      <dd className="flex-1 text-right font-title">
        <RevealTextOnScroll delay={delay}>{children}</RevealTextOnScroll>
      </dd>
    </div>
  )
}
