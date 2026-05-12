import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import Home from "./home"

const navigateMock = vi.hoisted(() => vi.fn())

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

describe("Home integration", () => {
  it("renders the main sections and routes through the cards", () => {
    render(<Home />)

    expect(screen.getByText("landing-page.home.role")).toBeInTheDocument()
    expect(screen.getAllByText("Alice").length).toBeGreaterThan(0)
    expect(screen.getAllByText("Bruno").length).toBeGreaterThan(0)

    fireEvent.click(screen.getByLabelText("Ir para projetos"))
    fireEvent.click(screen.getByLabelText("Ir para experiências"))
    fireEvent.click(screen.getByLabelText("Ir para sobre e contato"))

    expect(navigateMock).toHaveBeenCalledWith("/projects")
    expect(navigateMock).toHaveBeenCalledWith("/experiences")
    expect(navigateMock).toHaveBeenCalledWith("/about")
  })
})
