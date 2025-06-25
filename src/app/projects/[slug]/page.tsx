import { notFound } from "next/navigation"
import { projectsData } from "@/data/projectsData"
import PageTransition from "@/components/animations/PageTransition"

export async function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projectsData.find((p) => p.slug === params.slug)

  if (!project) return notFound()

  return (
     <PageTransition>
    <main className="p-10">
      <h1 className="text-5xl font-title uppercase">{project.title}</h1>
      <p className="mt-6 text-xl">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.subheading.map((tag) => (
          <span
            key={tag}
            className="px-4 py-1 rounded-full border border-black text-black text-sm md:text-lg"
          >
            {tag}
          </span>
        ))}
      </div>

      <img src={project.imgSrc} alt={project.title} className="mt-10 w-full max-w-4xl" />
    </main>
    </PageTransition>
  )
}
