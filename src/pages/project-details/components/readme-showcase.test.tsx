import { render, screen } from "@testing-library/react"
import type { IProjectCard } from "@/pages/projects/types"
import { describe, expect, it, vi } from "vitest"

vi.mock("./readme-view", () => ({
  default: () => <div data-testid="readme-view" />,
}))

import ReadmeShowcase from "./readme-showcase"

const projectWithResources: IProjectCard = {
  id: "portifolio",
  title: "Portifolio",
  description: "Portfolio description",
  githubUrl: "https://github.com/iShouldz/portifolio",
  figmaUrl: "https://figma.com/file/test",
  deployLink: "https://example.com",
  tecnologies: ["React", "TypeScript"],
  tags: ["Web", "SPA"],
  resources: [
    { type: "feature", title: "Feature A", description: "Feature description" },
    { type: "product", title: "Product A", description: "Product description" },
  ],
}

describe("ReadmeShowcase", () => {
  it("renders resources, tags, technologies and links", () => {
    render(
      <ReadmeShowcase
        currentProject={projectWithResources}
        repoMeta={{ owner: "pedro", name: "repo" }}
      />
    )

    expect(screen.getByTestId("readme-view")).toBeInTheDocument()
    expect(screen.getByText("project-details.title")).toBeInTheDocument()
    expect(screen.getByText("project-details.details.features")).toBeInTheDocument()
    expect(
      screen.getByText("project-details.details.tecnical-details")
    ).toBeInTheDocument()
    expect(screen.getByText("project-details.details.tecnologies")).toBeInTheDocument()
    expect(screen.getByText("project-details.details.tags")).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "project-details.btn.repository" })
    ).toHaveAttribute("href", projectWithResources.githubUrl)
    expect(
      screen.getByRole("link", { name: "project-details.btn.figma" })
    ).toHaveAttribute("href", projectWithResources.figmaUrl)
    expect(
      screen.getByRole("link", { name: "project-details.btn.deploy" })
    ).toHaveAttribute("href", projectWithResources.deployLink)
  })

  it("renders fallback technical details when there are no resources", () => {
    render(
      <ReadmeShowcase
        currentProject={{
          ...projectWithResources,
          resources: [],
          figmaUrl: undefined,
          deployLink: undefined,
        }}
        repoMeta={{ owner: "pedro", name: "repo" }}
      />
    )

    expect(
      screen.queryAllByText("Portfolio description").length
    ).toBeGreaterThanOrEqual(1)
    expect(screen.queryByText("project-details.details.features")).not.toBeInTheDocument()
  })
})
