import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

const lightboxMock = vi.hoisted(() => vi.fn())

vi.mock("yet-another-react-lightbox", () => ({
  default: (props: any) => {
    lightboxMock(props)
    const slideContent = props.render?.slide?.({ slide: props.slides[0] })
    return (
      <div
        data-testid="lightbox"
        data-image-fit={props.carousel.imageFit}
        data-has-thumbnails={String(Boolean(props.thumbnails))}
        data-duration={props.inline?.style?.aspectRatio}
      >
        {slideContent}
      </div>
    )
  },
}))

vi.mock("yet-another-react-lightbox/plugins/inline", () => ({ default: {} }))
vi.mock("yet-another-react-lightbox/plugins/video", () => ({ default: {} }))
vi.mock("yet-another-react-lightbox/plugins/thumbnails", () => ({ default: {} }))
vi.mock("yet-another-react-lightbox/plugins/fullscreen", () => ({ default: {} }))
vi.mock("yet-another-react-lightbox/plugins/zoom", () => ({ default: {} }))

import { ProjectGallery } from "./CloudinaryGallery"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("ProjectGallery", () => {
  it("uses desktop gallery settings and renders youtube slides", () => {
    window.matchMedia = vi.fn(() => ({
      matches: false,
      media: "(max-width: 768px)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia

    render(
      <ProjectGallery
        mediaList={[{ type: "youtube", videoId: "abc123" }]}
      />
    )

    expect(screen.getByTestId("lightbox")).toHaveAttribute("data-image-fit", "contain")
    expect(screen.getByTestId("lightbox")).toHaveAttribute("data-has-thumbnails", "true")
    expect(screen.getByTitle("YouTube video player")).toHaveAttribute(
      "src",
      "https://www.youtube.com/embed/abc123?autoplay=0&rel=0"
    )
  })

  it("switches to mobile settings when matchMedia matches", () => {
    window.matchMedia = vi.fn(() => ({
      matches: true,
      media: "(max-width: 768px)",
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })) as unknown as typeof window.matchMedia

    render(<ProjectGallery mediaList={[{ type: "image", src: "cover.png" }]} />)

    expect(screen.getByTestId("lightbox")).toHaveAttribute("data-image-fit", "cover")
    expect(screen.getByTestId("lightbox")).toHaveAttribute("data-has-thumbnails", "false")
  })
})
