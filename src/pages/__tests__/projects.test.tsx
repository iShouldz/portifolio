import { render, screen } from "@testing-library/react"
import Projects from "@/pages/projects/projects"
import { describe, expect, it } from "vitest"

describe("Projects page", () => {
  it("renders projects and handles image fallback", () => {
    render(<Projects />)

    expect(screen.getByText("projects.title")).toBeInTheDocument()
    expect(screen.getByText("Portifolio")).toBeInTheDocument()
    expect(screen.getAllByText("No Image").length).toBeGreaterThan(0)

    expect(screen.getAllByRole("img")).toHaveLength(1)
    expect(screen.getAllByText(/projects\.cards\.btn/)).toHaveLength(2)
  })
})
