import { motion } from "motion/react"
import { ProjectGallery } from "@/components/gallery/CloudinaryGallery"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { IProjectCard } from "@/pages/projects/types"
import { useTranslation } from "react-i18next"
import { Code2, Layers } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useState } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface GalleryShowcaseProps {
  slides: any[]
  currentProject: IProjectCard | undefined
}

const GalleryShowcase = ({ slides, currentProject }: GalleryShowcaseProps) => {
  const { t } = useTranslation()

  const ITEMS_PER_PAGE = 5
  const [currentPage, setCurrentPage] = useState(1)

  const resources = currentProject?.resources || []
  const totalPages = Math.ceil(resources.length / ITEMS_PER_PAGE)

  const paginatedResources = resources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  return (
    <section className="relative min-h-screen py-20">
      <div className="mx-auto max-w-440 px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Galeria</h2>
          <p className="mt-2 text-muted-foreground">
            Explore os visuais do projeto
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-background/70 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {slides.length > 0 ? (
            <div className="grid gap-0 overflow-hidden lg:grid-cols-[7fr_3fr]">
              <div className="min-h-112 lg:min-h-168">
                <ProjectGallery mediaArray={slides} />
              </div>
              <Card className="flex h-full flex-col overflow-hidden rounded-none border-0 border-t border-border/60 bg-muted/30 shadow-none lg:min-h-168 lg:border-t-0 lg:border-l">
                <CardContent className="flex min-h-0 flex-1 flex-col gap-6 p-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <Code2 className="text-emerald-500" size={20} />
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        Tecnologias Utilizadas
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {currentProject?.tecnologies &&
                        currentProject.tecnologies.map((tech, index) => (
                          <Badge key={index}>{tech}</Badge>
                        ))}
                    </div>
                  </div>

                  <div className="flex min-h-0 flex-1 flex-col gap-4">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                      <Layers className="text-emerald-500" size={20} />
                      <h3 className="text-xl font-bold tracking-tight text-foreground">
                        Features & Negócio
                      </h3>
                    </div>

                    <div className="min-h-0 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-500/50 [&::-webkit-scrollbar-track]:bg-transparent">
                      <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className="flex max-w-lg flex-col gap-2"
                      >
                        {paginatedResources.map((resource, index) => {
                          const absoluteIndex =
                            (currentPage - 1) * ITEMS_PER_PAGE + index + 1

                          return (
                            <AccordionItem
                              key={resource.title}
                              value={resource.title}
                              className="rounded-lg border border-border/60 bg-background/40 px-3"
                            >
                              <AccordionTrigger className="text-left text-sm font-medium hover:no-underline">
                                <span className="truncate">
                                  {absoluteIndex}. {resource.title}
                                </span>
                              </AccordionTrigger>
                              <AccordionContent className="leading-relaxed text-muted-foreground">
                                {resource.description}
                              </AccordionContent>
                            </AccordionItem>
                          )
                        })}
                      </Accordion>
                    </div>

                    {totalPages > 1 && (
                      <Pagination className="mt-auto pt-2">
                        <PaginationContent>
                          <PaginationItem>
                            <PaginationPrevious
                              onClick={() =>
                                setCurrentPage((p) => Math.max(1, p - 1))
                              }
                              className={
                                currentPage === 1
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>

                          {Array.from({ length: totalPages }).map((_, i) => (
                            <PaginationItem key={i}>
                              <PaginationLink
                                onClick={() => setCurrentPage(i + 1)}
                                isActive={currentPage === i + 1}
                                className="cursor-pointer"
                              >
                                {i + 1}
                              </PaginationLink>
                            </PaginationItem>
                          ))}

                          <PaginationItem>
                            <PaginationNext
                              onClick={() =>
                                setCurrentPage((p) =>
                                  Math.min(totalPages, p + 1)
                                )
                              }
                              className={
                                currentPage === totalPages
                                  ? "pointer-events-none opacity-50"
                                  : "cursor-pointer"
                              }
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </div>
                </CardContent>

                <CardFooter className="flex shrink-0 gap-2 border-t border-border/60 bg-background/20 p-6">
                  <Button className="flex items-center gap-2">
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
                  </Button>

                  <Button
                    className="flex items-center gap-2"
                    variant="secondary"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 1.5H8.5C6.567 1.5 5 3.067 5 5C5 6.933 6.567 8.5 8.5 8.5M12 1.5V8.5M12 1.5H15.5C17.433 1.5 19 3.067 19 5C19 6.933 17.433 8.5 15.5 8.5M12 8.5H8.5M12 8.5V15.5M12 8.5H15.5M8.5 8.5C6.567 8.5 5 10.067 5 12C5 13.933 6.567 15.5 8.5 15.5M12 15.5H8.5M12 15.5V19C12 20.933 10.433 22.5 8.5 22.5C6.567 22.5 5 20.933 5 19C5 17.067 6.567 15.5 8.5 15.5M15.5 8.5C17.433 8.5 19 10.067 19 12C19 13.933 17.433 15.5 15.5 15.5C13.567 15.5 12 13.933 12 12C12 10.067 13.567 8.5 15.5 8.5Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {t("project-details.btn.figma")}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="flex min-h-64 items-center justify-center">
              <p className="text-muted-foreground">
                Nenhuma mídia disponível para este projeto.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

export default GalleryShowcase
