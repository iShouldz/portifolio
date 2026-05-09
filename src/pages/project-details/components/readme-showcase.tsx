import { motion } from "motion/react"
import ReadmeView from "./readme-view"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import {
  ArrowUpRight,
  Code2,
  Layers,
  Link2,
  MessageSquareQuote,
  Tags,
} from "lucide-react"
import type { IProjectCard } from "@/pages/projects/types"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import type { ReactNode } from "react"

interface ReadmeShowcaseProps {
  repoMeta?: any
  currentProject: IProjectCard | undefined
}

const TopicSection = ({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) => (
  <section className="flex flex-col space-y-3 rounded-2xl border border-border/60 bg-background/35 p-4">
    <div className="flex items-center gap-2 border-b border-border/50 pb-2">
      <span className="text-emerald-500">{icon}</span>
      <h3 className="text-sm font-semibold tracking-tight text-foreground md:text-base">
        {title}
      </h3>
    </div>

    {children}
  </section>
)

const ReadmeShowcase = ({ repoMeta, currentProject }: ReadmeShowcaseProps) => {
  const { t } = useTranslation()
  const projectDetails = t("project-details.details", {
    returnObjects: true,
  }) as Record<string, string>

  const featureResources =
    currentProject?.resources?.filter(
      (resource) => resource.type === "feature"
    ) ?? []
  const productResources =
    currentProject?.resources?.filter(
      (resource) => resource.type === "product"
    ) ?? []

  return (
    <section className="relative py-20">
      <div className="max-w-8xl mx-auto px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Documentação</h2>
          <p className="mt-2 text-muted-foreground">
            Detalhes e informações do projeto
          </p>
        </motion.div>
        <motion.div
          className="mx-auto grid w-full gap-8 px-4 backdrop-blur-xl lg:grid-cols-[minmax(0,1.0fr)_minmax(0,1.0fr)] lg:items-stretch"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="h-full min-h-0">
            <ReadmeView repoMeta={repoMeta} />
          </div>

          <div className="relative h-full min-h-0 w-full">
            <Card className="flex w-full flex-col overflow-hidden rounded-3xl border border-border/60 bg-background/80 shadow-2xl lg:absolute lg:inset-0">
              <CardTitle className="px-6 pt-6 text-2xl font-bold md:text-3xl">
                {t("project-details.title")}
              </CardTitle>

              <CardContent
                className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 pt-0 pb-6"
                data-lenis-prevent="true"
              >
                <p className="text-lg leading-relaxed text-muted-foreground">
                  {currentProject?.description}
                </p>

                <TopicSection
                  icon={<Layers size={18} />}
                  title={projectDetails.features}
                >
                  <div className="flex flex-col gap-1 space-y-3">
                    {featureResources.length > 0 ? (
                      featureResources.map((resource, index) => (
                        <article key={resource.title}>
                          <h4 className="text-base leading-tight font-semibold text-foreground">
                            {index + 1}. {resource.title}
                          </h4>
                          <p className="text-md mt-1 leading-relaxed text-muted-foreground">
                            {resource.description}
                          </p>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma feature adicional cadastrada.
                      </p>
                    )}
                  </div>
                </TopicSection>

                <TopicSection
                  icon={<Code2 size={18} />}
                  title={projectDetails["tecnical-details"]}
                >
                  <div className="space-y-3">
                    {productResources.length > 0 ? (
                      productResources.map((resource, index) => (
                        <article key={resource.title}>
                          <h4 className="text-base leading-tight font-semibold text-foreground">
                            {index + 1}. {resource.title}
                          </h4>
                          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                            {resource.description}
                          </p>
                        </article>
                      ))
                    ) : (
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {currentProject?.description}
                      </p>
                    )}
                  </div>
                </TopicSection>

                <TopicSection
                  icon={<Code2 size={18} />}
                  title={projectDetails.tecnologies}
                >
                  <div className="flex flex-wrap gap-2">
                    {currentProject?.tecnologies?.length ? (
                      currentProject.tecnologies.map((tech) => (
                        <Badge key={tech} variant="default">
                          {tech}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma tecnologia cadastrada.
                      </p>
                    )}
                  </div>
                </TopicSection>

                <TopicSection
                  icon={<Tags size={18} />}
                  title={projectDetails.tags}
                >
                  <div className="flex flex-wrap gap-2">
                    {currentProject?.tags?.length ? (
                      currentProject.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Nenhuma tag cadastrada.
                      </p>
                    )}
                  </div>
                </TopicSection>

                <TopicSection
                  icon={<MessageSquareQuote size={18} />}
                  title={projectDetails.comments}
                >
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Nenhum comentário adicional foi cadastrado para este
                    projeto.
                  </p>
                </TopicSection>

                <TopicSection
                  icon={<Link2 size={18} />}
                  title={projectDetails.links}
                >
                  <div className="flex flex-wrap gap-2">
                    {currentProject?.githubUrl && (
                      <Button asChild variant="outline" size="sm">
                        <a
                          href={currentProject.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ArrowUpRight className="mr-1.5" />
                          {t("project-details.btn.repository")}
                        </a>
                      </Button>
                    )}

                    {currentProject?.figmaUrl && (
                      <Button asChild variant="secondary" size="sm">
                        <a
                          href={currentProject.figmaUrl}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ArrowUpRight className="mr-1.5" />
                          {t("project-details.btn.figma")}
                        </a>
                      </Button>
                    )}

                    {currentProject?.deployLink && (
                      <Button asChild variant="secondary" size="sm">
                        <a
                          href={currentProject.deployLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ArrowUpRight className="mr-1.5" />
                          {t("project-details.btn.deploy")}
                        </a>
                      </Button>
                    )}
                  </div>
                </TopicSection>
              </CardContent>

              <CardFooter className="flex flex-wrap gap-2 border-t border-border/60 bg-background/35 px-6 py-4">
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
              </CardFooter>
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReadmeShowcase
