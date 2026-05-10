import { render, screen } from "@testing-library/react"
import OutletPage from "@/pages/outlet/outlet-page"
import { describe, expect, it } from "vitest"

describe("Outlet page", () => {
  it("renders dock labels and outlet", () => {
    render(<OutletPage />)

    expect(screen.getByTestId("outlet")).toBeInTheDocument()
    expect(screen.getByText("dock.home")).toBeInTheDocument()
    expect(screen.getByText("dock.theme")).toBeInTheDocument()
  })
})
