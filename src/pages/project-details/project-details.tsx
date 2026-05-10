import { motion } from "motion/react"
import { useMemo, lazy, Suspense, memo } from "react"
import { useTranslation } from "react-i18next"
import type { IProjectCard } from "../projects/types"
import { useParams } from "react-router"
import projectMedia from "@/utils/enum/image-projects.json"
import { parseGithubRepo } from "./utils/git-extract"
import { ProjectMetaHelmet } from "./hooks/useProjectMeta"
import type { ProjectMediaList } from "@/utils/enum/types"

const ProjectHero = lazy(() => import("./components/project-hero"))
const GalleryShowcase = lazy(() => import("./components/gallery-showcase"))
const ReadmeShowcase = lazy(() => import("./components/readme-showcase"))

const loadMarkdownStyles = async () => {
  await Promise.all([
    import("github-markdown-css/github-markdown-dark.css"),
    import("highlight.js/styles/github-dark.css"),
  ])
}

const SectionSkeleton = () => (
  <div className="relative flex min-h-screen w-full items-center justify-center">
    <div className="animate-pulse">Loading...</div>
  </div>
)

const ProjectDetails = memo(function ProjectDetails() {
  const { id } = useParams()
  const { t } = useTranslation()

  const projectsList = useMemo(
    () =>
      t("projects.list", {
        returnObjects: true,
      }) as IProjectCard[],
    [t]
  )

  const currentProject = useMemo(
    () => projectsList.find((project) => project.id === id),
    [projectsList, id]
  )

  const repoMeta = useMemo(
    () => parseGithubRepo(currentProject?.githubUrl),
    [currentProject?.githubUrl]
  )

  const projectMediaTyped = useMemo(
    () => projectMedia as unknown as ProjectMediaList,
    []
  )

  const projectMediaData = useMemo(
    () => projectMediaTyped.find((media) => media.id === id),
    [projectMediaTyped, id]
  )

  const slides = useMemo(
    () => projectMediaData?.mediaList || [],
    [projectMediaData]
  )

  useMemo(() => {
    loadMarkdownStyles()
  }, [])

  return (
    <>
      <ProjectMetaHelmet currentProject={currentProject} />

      <motion.div className="relative w-full overflow-hidden">
        <Suspense fallback={<SectionSkeleton />}>
          <ProjectHero
            currentProject={currentProject}
            title={currentProject?.title || "Projeto"}
            description={currentProject?.description}
          />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <GalleryShowcase slides={slides} />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <ReadmeShowcase repoMeta={repoMeta} currentProject={currentProject} />
        </Suspense>
      </motion.div>
    </>
  )
})

export default ProjectDetails
