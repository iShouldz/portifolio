import { renderHook, waitFor } from "@testing-library/react"
import { getRepoDetailedStats } from "@/hooks/use-github/use-github"
import { describe, expect, it, vi, beforeEach } from "vitest"
import useGithubData from "./use-github-data"

beforeEach(() => {
  vi.clearAllMocks()
})

describe("useGithubData", () => {
  it("returns base urls from the repo meta and updates them from repo details", async () => {
    vi.mocked(getRepoDetailedStats).mockResolvedValue({
      repo: {
        owner: "pedro",
        name: "portfolio",
        url: "https://github.com/pedro/portfolio",
        defaultBranch: "develop",
      },
      stats: {
        stars: 1,
        forks: 2,
        openIssues: 3,
        watchers: 4,
        sizeKb: 5,
        homepage: "https://example.com",
        license: "MIT",
      },
      languages: ["TypeScript"],
      readme: "# README",
    })

    const { result } = renderHook(() =>
      useGithubData({ repoMeta: { owner: "pedro", name: "portfolio" } })
    )

    expect(result.current.rawBase).toBe(
      "https://raw.githubusercontent.com/pedro/portfolio/main/"
    )

    await waitFor(() =>
      expect(result.current.rawBase).toBe(
        "https://raw.githubusercontent.com/pedro/portfolio/develop/"
      )
    )

    expect(result.current.blobBase).toBe(
      "https://github.com/pedro/portfolio/blob/develop/"
    )
    expect(getRepoDetailedStats).toHaveBeenCalledWith("pedro", "portfolio")
  })

  it("returns null bases and skips the fetch when repoMeta is missing", () => {
    const { result } = renderHook(() => useGithubData({ repoMeta: undefined }))

    expect(result.current.repoDetails).toBeNull()
    expect(result.current.rawBase).toBeNull()
    expect(result.current.blobBase).toBeNull()
    expect(getRepoDetailedStats).not.toHaveBeenCalled()
  })
})
