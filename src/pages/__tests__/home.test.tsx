import { render, screen } from "@testing-library/react"
import Home from "@/pages/home/home"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/pages/home/components/front-page/front-page", () => ({
  default: () => <section data-testid="front-page" />, 
}))

vi.mock("@/pages/home/components/card-display/card-display", () => ({
  default: () => <section data-testid="card-display" />, 
}))

vi.mock("@/pages/home/components/recomendations/recomendations", () => ({
  default: () => <section data-testid="recomendations" />, 
}))

describe("Home page", () => {
  it("renders hero, cards, and recommendations", () => {
    render(<Home />)

    expect(screen.getByTestId("front-page")).toBeInTheDocument()
    expect(screen.getByTestId("card-display")).toBeInTheDocument()
    expect(screen.getByTestId("recomendations")).toBeInTheDocument()
  })
})
