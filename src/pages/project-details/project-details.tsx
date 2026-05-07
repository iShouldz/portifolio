import { motion, useScroll, useTransform } from "motion/react"
import { useMemo, useRef } from "react"
import { useTranslation } from "react-i18next"
import type { IProjectCard } from "../projects/types"
import { useParams } from "react-router"
import { ProjectGallery } from "@/components/gallery/CloudinaryGallery"
import projectMedia from "@/utils/enum/image-projects.json"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CircleDot, GitFork, Scale, Star } from "lucide-react"
import "github-markdown-css/github-markdown-dark.css"
import "highlight.js/styles/github-dark.css"
import { parseGithubRepo } from "./utils/git-extract"
import useGithubData from "./hooks/use-github-data"
import ReadmeView from "./components/readme-view"
import { Button } from "@/components/ui/button"

const ProjectDetails = () => {
  const { id } = useParams()
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement | null>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [36, -24])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.7, 1, 1])

  const projectsList = t("projects.list", {
    returnObjects: true,
  }) as IProjectCard[]

  const currentProject = projectsList.find((project) => project.id === id)

  const repoMeta = useMemo(
    () => parseGithubRepo(currentProject?.githubUrl),
    [currentProject?.githubUrl]
  )
  const { repoDetails } = useGithubData({ repoMeta })

  const projectMediaData = projectMedia.find((media) => media.id === id)
  const slides = projectMediaData?.mediaList || []

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex w-screen flex-col gap-10 px-4 py-12 sm:px-6 lg:px-10 lg:py-20"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mb-12 flex flex-col items-center gap-4 text-center"
      >
        <h2 className="text-4xl leading-tight font-bold md:text-6xl">
          {currentProject?.title || "Projeto"}
        </h2>
      </motion.div>

      <div className="xs:flex-col flex w-full lg:flex-row">
        <div className="w-[70%]">
          {slides.length > 0 ? (
            <ProjectGallery mediaArray={slides} />
          ) : (
            <div className="flex h-64 w-full items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <p className="text-muted-foreground">
                Nenhuma mídia disponível para este projeto.
              </p>
            </div>
          )}
        </div>

        <div className="w-[30%] pl-6">
          <Card>
            <CardHeader>
              <CardTitle>{currentProject?.title}</CardTitle>
              <CardDescription>{currentProject?.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  Estatísticas
                </h3>
                <div className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
                  <span className="flex items-center gap-3">
                    <Star size={18} className="text-emerald-500" />{" "}
                    {repoDetails?.stats.stars} Stars
                  </span>
                  <span className="flex items-center gap-3">
                    <GitFork size={18} className="text-emerald-500" />{" "}
                    {repoDetails?.stats.forks} Forks
                  </span>
                  <span className="flex items-center gap-3">
                    <CircleDot size={18} className="text-emerald-500" />{" "}
                    {repoDetails?.stats.openIssues} Issues Abertas
                  </span>
                  <span className="flex items-center gap-3">
                    <Scale size={18} className="text-emerald-500" />{" "}
                    {repoDetails?.stats.license}
                  </span>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                <h3 className="mb-4 text-lg font-bold text-foreground">
                  Linguagens
                </h3>
                <div className="flex flex-wrap gap-2">
                  {repoDetails?.languages.map((lang: string) => (
                    <span
                      key={lang}
                      className="rounded-lg bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400"
                    >
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                Repositorio
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      <div className="xs:flex-col flex w-full flex-1 gap-5 lg:flex-row">
        <div className="w-[40%]">
          <Card>
            <CardHeader>
              <CardTitle>{currentProject?.title}</CardTitle>
              <CardDescription>{currentProject?.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center"></CardContent>
          </Card>
        </div>

        <div className="h-full w-[60%]">
          <ReadmeView repoMeta={repoMeta} />
        </div>
      </div>
    </section>
  )
}

export default ProjectDetails
