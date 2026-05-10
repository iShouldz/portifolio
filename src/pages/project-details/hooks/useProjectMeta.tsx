import { Helmet } from "react-helmet-async"
import type { IProjectCard } from "@/pages/projects/types"

interface UseProjectMetaProps {
  currentProject: IProjectCard | undefined
}

export const ProjectMetaHelmet = ({ currentProject }: UseProjectMetaProps) => {
  if (!currentProject) return null

  const pageTitle = `${currentProject.title} | Portfolio`
  const description =
    currentProject.description || `${currentProject.title} - Project Details`

  const jsonLdData = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: currentProject.title,
    description,
    url: typeof window !== "undefined" ? window.location.href : "",
    image: currentProject.img || undefined,
    creator: {
      "@type": "Person",
      name: "Pedro Souza",
    },
    keywords: currentProject.tags?.join(", ") || "",
    technologies: currentProject.tecnologies?.join(", ") || "",
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={currentProject.title} />
      <meta property="og:description" content={description} />
      {currentProject.img && (
        <meta property="og:image" content={currentProject.img} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentProject.title} />
      <meta name="twitter:description" content={description} />

      <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
    </Helmet>
  )
}
