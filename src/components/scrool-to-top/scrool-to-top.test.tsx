import { render } from "@testing-library/react"
import { useLenis } from "lenis/react"
import { describe, expect, it, vi } from "vitest"

const scrollToMock = vi.fn()
const useLocationMock = vi.fn()

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    useLocation: useLocationMock,
  }
})

import ScroolToTop from "./scrool-to-top"

describe("ScroolToTop", () => {
  it("renders without crashing when lenis is available", () => {
    useLocationMock.mockReturnValue({ pathname: "/home" })
    vi.mocked(useLenis).mockReturnValue({ scrollTo: scrollToMock } as never)

    expect(() => render(<ScroolToTop />)).not.toThrow()
  })

  it("does nothing when lenis is unavailable", () => {
    useLocationMock.mockReturnValue({ pathname: "/home" })
    vi.mocked(useLenis).mockReturnValue(undefined)

    expect(() => render(<ScroolToTop />)).not.toThrow()
  })
})
