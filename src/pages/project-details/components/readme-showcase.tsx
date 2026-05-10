import { motion } from "motion/react"
import ReadmeView from "./readme-view"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, Code2, Layers, Link2, Tags } from "lucide-react"
import type { IProjectCard } from "@/pages/projects/types"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { Badge } from "@/components/ui/badge"
import { memo, type ReactNode } from "react"
import type { IGitExtractProps } from "../utils/types"

interface ReadmeShowcaseProps {
  repoMeta?: IGitExtractProps
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

const ReadmeShowcase = memo(function ReadmeShowcase({
  repoMeta,
  currentProject,
}: ReadmeShowcaseProps) {
  const { t } = useTranslation()

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
          <h2 className="text-3xl font-bold md:text-4xl">
            {t("project-details.documentation.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("project-details.documentation.description")}
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

                {featureResources.length && (
                  <TopicSection
                    icon={<Layers size={18} />}
                    title={t("project-details.details.features")}
                  >
                    <div className="flex flex-col gap-1 space-y-3">
                      {featureResources.length > 0 &&
                        featureResources.map((resource, index) => (
                          <article key={resource.title}>
                            <h4 className="text-base leading-tight font-semibold text-foreground">
                              {index + 1}. {resource.title}
                            </h4>
                            <p className="text-md mt-1 leading-relaxed text-muted-foreground">
                              {resource.description}
                            </p>
                          </article>
                        ))}
                    </div>
                  </TopicSection>
                )}

                <TopicSection
                  icon={<Code2 size={18} />}
                  title={t("project-details.details.tecnical-details")}
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

                {currentProject?.tecnologies && (
                  <TopicSection
                    icon={<Code2 size={18} />}
                    title={t("project-details.details.tecnologies")}
                  >
                    <div className="flex flex-wrap gap-2">
                      {currentProject?.tecnologies?.length &&
                        currentProject.tecnologies.map((tech) => (
                          <Badge key={tech} variant="default">
                            {tech}
                          </Badge>
                        ))}
                    </div>
                  </TopicSection>
                )}

                {currentProject?.tags && (
                  <TopicSection
                    icon={<Tags size={18} />}
                    title={t("project-details.details.tags")}
                  >
                    <div className="flex flex-wrap gap-2">
                      {currentProject?.tags?.length &&
                        currentProject.tags.map((tag) => (
                          <Badge key={tag} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                    </div>
                  </TopicSection>
                )}

                <TopicSection
                  icon={<Link2 size={18} />}
                  title={t("project-details.details.links")}
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
            </Card>
          </div>
        </motion.div>
      </div>
    </section>
  )
})

export default ReadmeShowcase
