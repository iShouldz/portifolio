import { Button } from "@/components/ui/button"
import type { IProjectCard } from "@/pages/projects/types"
import { ArrowUpRight, MoveDown } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

interface ProjectHeroProps {
  title: string
  description?: string
  currentProject: IProjectCard | undefined
}

const ProjectHero = ({
  title,
  description,
  currentProject,
}: ProjectHeroProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ scale }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <motion.h1
          className="max-w-4xl text-5xl leading-tight font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              {currentProject?.githubUrl && (
                <Button asChild className="flex items-center gap-2" size="lg">
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
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
                    {t("project-details.btn.repository")}
                  </a>
                </Button>
              )}

              {currentProject?.deployLink && (
                <Button
                  asChild
                  className="flex items-center gap-2"
                  size="lg"
                  variant="secondary"
                >
                  <a
                    href={currentProject.deployLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ArrowUpRight />
                    {t("project-details.btn.deploy")}
                  </a>
                </Button>
              )}
            </div>
          </motion.p>
        )}
      </motion.div>

      <div className="absolute bottom-23 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col-reverse items-center gap-2 text-sm text-muted-foreground md:inline-flex"
        >
          {t("landing-page.home.front-page.scroll_down")}
          <MoveDown size={42} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectHero
