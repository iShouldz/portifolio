import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"

const useGithubDataMock = vi.hoisted(() => vi.fn())
const ReactMarkdownMock = vi.hoisted(() => vi.fn())

vi.mock("../hooks/use-github-data", () => ({
  default: useGithubDataMock,
}))

vi.mock("react-markdown", () => ({
  default: (props: any) => {
    ReactMarkdownMock(props)
    props.urlTransform("./public/images/photo.png", "src", { tagName: "img" })
    props.urlTransform("docs/README.md", "href", { tagName: "a" })
    props.urlTransform("https://example.com", "href", { tagName: "a" })
    props.urlTransform("mailto:test@example.com", "href", { tagName: "a" })
    props.components.a({ href: "https://example.com", children: "external" })
    props.components.img({ src: "image.png", alt: "image" })
    return <div data-testid="markdown">{String(props.children)}</div>
  },
}))

import ReadmeView from "./readme-view"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("ReadmeView", () => {
  it("renders the readme content when github data is available", () => {
    useGithubDataMock.mockReturnValue({
      repoDetails: {
        readme: "# Title\n\n[link](docs/README.md)",
      },
      rawBase: "https://raw.githubusercontent.com/pedro/portfolio/main/",
      blobBase: "https://github.com/pedro/portfolio/blob/main/",
    })

    render(<ReadmeView repoMeta={{ owner: "pedro", name: "portfolio" }} />)

    expect(screen.getByTestId("markdown")).toHaveTextContent("# Title")
    expect(screen.getByTestId("markdown")).toHaveTextContent("[link](docs/README.md)")
    expect(ReactMarkdownMock).toHaveBeenCalled()
  })

  it("renders nothing when there is no repo details", () => {
    useGithubDataMock.mockReturnValue({
      repoDetails: null,
      rawBase: null,
      blobBase: null,
    })

    const { container } = render(
      <ReadmeView repoMeta={{ owner: "pedro", name: "portfolio" }} />
    )

    expect(container).toBeEmptyDOMElement()
  })
})
