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

const SectionSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-12">
      {/* Hero skeleton */}
      <div className="animate-pulse">
        <div className="h-8 w-1/3 rounded-lg bg-muted mb-4" />
        <div className="h-6 w-2/3 rounded-lg bg-muted mb-2" />
        <div className="h-4 w-1/4 rounded-lg bg-muted" />
      </div>

      {/* Gallery skeleton */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 animate-pulse">
        <div className="col-span-2 h-48 rounded-xl bg-muted" />
        <div className="h-48 rounded-xl bg-muted" />
      </div>

      {/* Readme / content skeleton */}
      <div className="space-y-3 animate-pulse">
        <div className="h-4 w-3/4 rounded-lg bg-muted" />
        <div className="h-4 w-full rounded-lg bg-muted" />
        <div className="h-4 w-5/6 rounded-lg bg-muted" />
        <div className="h-40 w-full rounded-lg bg-muted" />
      </div>
    </div>
  )
}

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
            title={currentProject?.title ?? "Project Title"}
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
