import { motion } from "motion/react"
import { useMemo } from "react"
import { useTranslation } from "react-i18next"
import type { IProjectCard } from "../projects/types"
import { useParams } from "react-router"
import projectMedia from "@/utils/enum/image-projects.json"
import "github-markdown-css/github-markdown-dark.css"
import "highlight.js/styles/github-dark.css"
import { parseGithubRepo } from "./utils/git-extract"
import ProjectHero from "./components/project-hero"
import GalleryShowcase from "./components/gallery-showcase"
import ReadmeShowcase from "./components/readme-showcase"
import type { ProjectMediaList } from "@/utils/enum/types"

const ProjectDetails = () => {
  const { id } = useParams()
  const { t } = useTranslation()

  const projectsList = t("projects.list", {
    returnObjects: true,
  }) as IProjectCard[]

  const currentProject = projectsList.find((project) => project.id === id)

  const repoMeta = useMemo(
    () => parseGithubRepo(currentProject?.githubUrl),
    [currentProject?.githubUrl]
  )

  const projectMediaTyped = projectMedia as unknown as ProjectMediaList

  const projectMediaData = projectMediaTyped.find((media) => media.id === id)
  const slides = projectMediaData?.mediaList || []

  return (
    <motion.div className="relative w-full overflow-hidden">
      <ProjectHero
        currentProject={currentProject}
        title={currentProject?.title || "Projeto"}
        description={currentProject?.description}
      />

      <GalleryShowcase slides={slides} />

      <ReadmeShowcase repoMeta={repoMeta} currentProject={currentProject} />
    </motion.div>
  )
}

export default ProjectDetails
