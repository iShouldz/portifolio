import { render, screen } from "@testing-library/react"
import Resume from "@/pages/resume/resume"
import { describe, expect, it } from "vitest"

describe("Resume page", () => {
  it("renders main content and buttons", () => {
    render(<Resume />)

    expect(screen.getByText("resume.title")).toBeInTheDocument()
    expect(screen.getByText("resume.description")).toBeInTheDocument()
    expect(screen.getByText("resume.blocks.btn.show-projects")).toBeInTheDocument()
    expect(screen.getByText("resume.blocks.btn.portifolio")).toBeInTheDocument()
  })
})
