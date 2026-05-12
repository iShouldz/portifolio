import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import useSetupScrool from "./use-setup-scrool"

const { useScrollMock, useTransformMock } = vi.hoisted(() => ({
  useScrollMock: vi.fn(() => ({ scrollYProgress: 0 })),
  useTransformMock: vi.fn((_value: unknown, _input: number[], output: number[]) => output[0]),
}))

vi.mock("motion/react", () => ({
  useScroll: useScrollMock,
  useTransform: useTransformMock,
}))

const TestComponent = () => {
  const { sectionRef, titleOpacity, titleY } = useSetupScrool()

  return (
    <section
      ref={sectionRef}
      data-testid="section"
      data-title-y={String(titleY)}
      data-title-opacity={String(titleOpacity)}
    />
  )
}

describe("useSetupScrool", () => {
  it("returns the section ref and transform values", () => {
    render(<TestComponent />)

    expect(screen.getByTestId("section")).toHaveAttribute("data-title-y", "0")
    expect(screen.getByTestId("section")).toHaveAttribute(
      "data-title-opacity",
      "1"
    )
  })
})
