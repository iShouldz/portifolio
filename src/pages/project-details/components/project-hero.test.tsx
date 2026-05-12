import { render, screen } from "@testing-library/react"
import type { IProjectCard } from "@/pages/projects/types"
import { describe, expect, it } from "vitest"
import ProjectHero from "./project-hero"

const projectWithLinks: IProjectCard = {
  id: "portifolio",
  title: "Portifolio",
  description: "Showcase project",
  githubUrl: "https://github.com/iShouldz/portifolio",
  deployLink: "https://example.com",
  tecnologies: ["React"],
  tags: ["Web"],
  resources: [],
}

describe("ProjectHero", () => {
  it("renders title, description and project links", () => {
    render(
      <ProjectHero
        title={projectWithLinks.title}
        description={projectWithLinks.description}
        currentProject={projectWithLinks}
      />
    )

    expect(screen.getByRole("heading", { name: "Portifolio" })).toBeInTheDocument()
    expect(screen.getByText("Showcase project")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "project-details.btn.repository" })
    ).toHaveAttribute("href", projectWithLinks.githubUrl)
    expect(
      screen.getByRole("link", { name: "project-details.btn.deploy" })
    ).toHaveAttribute("href", projectWithLinks.deployLink)
  })

  it("renders only the title when description is missing", () => {
    render(
      <ProjectHero
        title="Standalone title"
        currentProject={{
          ...projectWithLinks,
          description: "",
          githubUrl: "",
          deployLink: undefined,
        }}
      />
    )

    expect(
      screen.getByRole("heading", { name: "Standalone title" })
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("link", { name: "project-details.btn.repository" })
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Showcase project")).not.toBeInTheDocument()
  })
})
