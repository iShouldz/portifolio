import { getGithubRepos } from "@/hooks/use-github/use-github"
import { motion, useScroll, useTransform } from "motion/react"
import { useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { IProjectCard } from "./types"
import { useNavigate } from "react-router"

const Projects = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
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

  const handleRedirectToProjectDetails = useCallback(
    (id: string) => {
      navigate(`/projects/${id}`)
    },
    [navigate]
  )

  const {} = getGithubRepos("iShouldz")
  return (
    <section
      ref={sectionRef}
      className="max-w-8xl relative mx-auto w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-20"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mb-20 flex flex-col items-center gap-2"
      >
        <h2 className="text-3xl leading-tight font-bold md:text-5xl">
          {t("projects.title")}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 justify-center gap-6 lg:grid-cols-3">
        {projectsList.map((project) => (
          <Card>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col justify-center">
              {project.img ? (
                <img
                  src={project.img}
                  alt={project.title}
                  className="aspect-video w-full rounded-xl object-cover transition-transform duration-500 group-hover/card:scale-105 group-hover/card:shadow-xl"
                />
              ) : (
                <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border border-white/5 bg-gradient-to-br from-neutral-800 to-black transition-transform duration-500 group-hover/card:scale-105">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    fill="currentColor"
                    className="mb-4 text-emerald-500/40 drop-shadow-lg transition-transform duration-500 group-hover/card:scale-110 group-hover/card:text-emerald-500/80"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                  </svg>
                  <span className="px-4 text-center text-xl font-bold tracking-widest text-white/50 uppercase">
                    {project.title}
                  </span>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button
                variant={"ghost"}
                onClick={() => handleRedirectToProjectDetails(project.id)}
              >
                {t("projects.cards.btn")} →
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Projects
