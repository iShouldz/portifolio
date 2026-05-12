import * as React from "react"
import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { useIsInView } from "./use-is-in-view"

const { useInViewMock } = vi.hoisted(() => ({
  useInViewMock: vi.fn(),
}))

vi.mock("motion/react", () => ({
  useInView: useInViewMock,
}))

type TestProps = {
  options?: Parameters<typeof useIsInView>[1]
}

const TestComponent = React.forwardRef<HTMLDivElement, TestProps>(
  function TestComponent({ options }, ref) {
    const { ref: innerRef, isInView } = useIsInView(ref, options)

    return (
      <div ref={innerRef} data-testid="target" data-visible={String(isInView)} />
    )
  }
)

describe("useIsInView", () => {
  it("passes the default options to motion and returns the view state", () => {
    const outerRef = React.createRef<HTMLDivElement>()
    useInViewMock.mockReturnValue(true)

    render(<TestComponent ref={outerRef} />)

    expect(useInViewMock).toHaveBeenCalledWith(expect.any(Object), {
      once: false,
      margin: "0px",
    })
    expect(screen.getByTestId("target")).toHaveAttribute(
      "data-visible",
      "true"
    )
    expect(outerRef.current).toBe(screen.getByTestId("target"))
  })

  it("forces visibility off when inView is false and forwards custom options", () => {
    useInViewMock.mockReturnValue(false)

    render(
      <TestComponent
        options={{ inView: false, inViewOnce: true, inViewMargin: "20px" }}
      />
    )

    expect(useInViewMock).toHaveBeenCalledWith(expect.any(Object), {
      once: true,
      margin: "20px",
    })
    expect(screen.getByTestId("target")).toHaveAttribute(
      "data-visible",
      "true"
    )
  })
})
