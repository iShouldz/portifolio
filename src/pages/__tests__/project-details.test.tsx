import { render, screen } from "@testing-library/react"
import { useParams } from "react-router"
import ProjectDetails from "@/pages/project-details/project-details"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/pages/project-details/components/project-hero", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="project-hero">{title}</div>
  ),
}))

vi.mock("@/pages/project-details/components/gallery-showcase", () => ({
  default: () => <div data-testid="gallery-showcase" />,
}))

vi.mock("@/pages/project-details/components/readme-showcase", () => ({
  default: () => <div data-testid="readme-showcase" />,
}))

vi.mock("@/utils/enum/image-projects.json", () => ({
  default: [
    {
      id: "portifolio",
      mediaList: [],
    },
  ],
}))

describe("Project details page", () => {
  it("renders project details for a valid id", () => {
    vi.mocked(useParams).mockReturnValue({ id: "portifolio" })

    render(<ProjectDetails />)

    expect(screen.getByTestId("project-hero")).toHaveTextContent("Portifolio")
    expect(screen.getByTestId("gallery-showcase")).toBeInTheDocument()
    expect(screen.getByTestId("readme-showcase")).toBeInTheDocument()
  })

  it("falls back to default title when project is missing", () => {
    vi.mocked(useParams).mockReturnValue({ id: "missing" })

    render(<ProjectDetails />)

    expect(screen.getByTestId("project-hero")).toHaveTextContent("Projeto")
  })
})
