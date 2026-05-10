import { render, screen } from "@testing-library/react"
import Experiences from "@/pages/experiencies/experiencies"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/pages/experiencies/components/experiences-list.component", () => ({
  default: ({ experienciesList }: { experienciesList: unknown[] }) => (
    <div data-testid="experiences-list">{experienciesList.length}</div>
  ),
}))

describe("Experiences page", () => {
  it("renders title, description, and list", () => {
    render(<Experiences />)

    expect(screen.getByText("experiences.title")).toBeInTheDocument()
    expect(screen.getByText("experiences.description")).toBeInTheDocument()
    expect(screen.getByTestId("experiences-list")).toHaveTextContent("1")
  })
})
