import { render } from "@testing-library/react"
import { HelmetProvider } from "react-helmet-async"
import { describe, expect, it } from "vitest"
import { ProjectMetaHelmet } from "./useProjectMeta"

const project = {
  id: "portifolio",
  title: "Portifolio",
  description: "Portfolio description",
  githubUrl: "https://github.com/iShouldz/portifolio",
  img: "https://example.com/cover.png",
  tecnologies: ["React"],
  tags: ["Web"],
  resources: [],
}

describe("ProjectMetaHelmet", () => {
  it("writes meta tags and json-ld for a project", () => {
    document.head.innerHTML = ""

    render(
      <HelmetProvider>
        <ProjectMetaHelmet currentProject={project} />
      </HelmetProvider>
    )

    expect(document.title).toBe("Portifolio | Portfolio")
    expect(document.querySelector('meta[name="description"]')).toHaveAttribute(
      "content",
      "Portfolio description"
    )
    expect(document.querySelector('meta[property="og:image"]')).toHaveAttribute(
      "content",
      "https://example.com/cover.png"
    )
    expect(document.querySelector('script[type="application/ld+json"]')).toHaveTextContent(
      "Portifolio"
    )
  })

  it("renders nothing when there is no project", () => {
    document.head.innerHTML = ""
    document.title = ""

    render(
      <HelmetProvider>
        <ProjectMetaHelmet currentProject={undefined} />
      </HelmetProvider>
    )

    expect(document.title).toBe("")
    expect(document.querySelector('meta[name="description"]')).toBeNull()
  })
})
