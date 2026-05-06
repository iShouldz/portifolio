import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import { getGithubRepos } from "@/hooks/use-github/use-github"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

type Project = {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  repoUrl: string
}

const projects: Project[] = [
  {
    id: "one-pace-br",
    title: "One Pace BR",
    description:
      "Plataforma em portugues para catalogo e navegacao de episodios com foco em performance e usabilidade.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop",
    tags: ["React", "Next.js", "SEO", "UX"],
    repoUrl: "https://github.com/",
  },
  {
    id: "simulador-cdb",
    title: "Simulador de Juros & CDB",
    description:
      "Interface para calculos financeiros com simulacoes em tempo real e visualizacao clara dos cenarios.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400&auto=format&fit=crop",
    tags: ["TypeScript", "Fintech", "Data Viz"],
    repoUrl: "https://github.com/",
  },
  {
    id: "jellyfin-theme",
    title: "Jellyfin Custom UI",
    description:
      "Sistema de temas e refinamento visual para media server com foco em TV e dispositivos de streaming.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4e7064f3acf?q=80&w=1400&auto=format&fit=crop",
    tags: ["CSS", "Theming", "Media"],
    repoUrl: "https://github.com/",
  },
  {
    id: "one-pace-br",
    title: "One Pace BR",
    description:
      "Plataforma em portugues para catalogo e navegacao de episodios com foco em performance e usabilidade.",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1400&auto=format&fit=crop",
    tags: ["React", "Next.js", "SEO", "UX"],
    repoUrl: "https://github.com/",
  },
  {
    id: "simulador-cdb",
    title: "Simulador de Juros & CDB",
    description:
      "Interface para calculos financeiros com simulacoes em tempo real e visualizacao clara dos cenarios.",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1400&auto=format&fit=crop",
    tags: ["TypeScript", "Fintech", "Data Viz"],
    repoUrl: "https://github.com/",
  },
  {
    id: "jellyfin-theme",
    title: "Jellyfin Custom UI",
    description:
      "Sistema de temas e refinamento visual para media server com foco em TV e dispositivos de streaming.",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4e7064f3acf?q=80&w=1400&auto=format&fit=crop",
    tags: ["CSS", "Theming", "Media"],
    repoUrl: "https://github.com/",
  },
]

type ProjectCardProps = {
  project: Project
  index: number
  progress: ReturnType<typeof useScroll>["scrollYProgress"]
}

const Projects = () => {
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
          Meus projetos, a sua disposição.
        </h2>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-6">
        {projects.map((project, index) => (
          <CardContainer className="inter-var">
            <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-white"
              >
                Make things float in air
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
              >
                Hover over this card to unleash the power of CSS perspective
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
                  Try now →
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
                >
                  Sign up
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
