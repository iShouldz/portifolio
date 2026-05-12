import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

vi.mock("@/components/gallery/CloudinaryGallery", () => ({
  ProjectGallery: ({ mediaList }: { mediaList: Array<unknown> }) => (
    <div data-testid="project-gallery" data-count={mediaList.length} />
  ),
}))

import GalleryShowcase from "./gallery-showcase"

describe("GalleryShowcase", () => {
  it("renders the gallery title and passes the slides", () => {
    render(<GalleryShowcase slides={[{ type: "image", src: "a.png" }]} />)

    expect(screen.getByText("project-details.gallery.title")).toBeInTheDocument()
    expect(screen.getByText("project-details.gallery.description")).toBeInTheDocument()
    expect(screen.getByTestId("project-gallery")).toHaveAttribute("data-count", "1")
  })
})
