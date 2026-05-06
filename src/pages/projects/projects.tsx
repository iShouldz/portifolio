import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { getGithubRepos } from "@/hooks/use-github/use-github"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import currentProjects from "@/utils/projects.json"
import { useTranslation } from "react-i18next"

const Projects = () => {
  const { t } = useTranslation()
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [36, -24])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.7, 1, 1])

  const {} = getGithubRepos("iShouldz")
  return (
    <section
      ref={sectionRef}
      className="max-w-8xl relative mx-auto w-full px-4 py-12 sm:px-6 lg:px-10 lg:py-20"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mb-10 flex flex-col items-center gap-2"
      >
        <h2 className="text-3xl leading-tight font-bold md:text-5xl">
          {t("projects.title")}
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6">
        {currentProjects.map((project) => (
          <CardContainer className="inter-var" key={project.id}>
            <CardBody className="group/card relative h-120 w-120 rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                {project.title}
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
              >
                {project.description}
              </CardItem>
              <CardItem translateZ="100" className="mt-4 w-full">
                <img
                  src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="mt-20 flex items-center justify-between">
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
                >
                  {t("projects.cards.btn")} →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        ))}
      </div>
    </section>
  )
}

export default Projects
