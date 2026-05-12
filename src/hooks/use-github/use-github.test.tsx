import { describe, expect, it, vi } from "vitest"

vi.unmock("@/hooks/use-github/use-github")

const getByUsernameMock = vi.hoisted(() => vi.fn())
const listForUserMock = vi.hoisted(() => vi.fn())
const getRepoMock = vi.hoisted(() => vi.fn())
const listLanguagesMock = vi.hoisted(() => vi.fn())
const requestMock = vi.hoisted(() => vi.fn())

vi.mock("@octokit/rest", () => ({
  Octokit: class {
    users = { getByUsername: getByUsernameMock }
    repos = {
      listForUser: listForUserMock,
      get: getRepoMock,
      listLanguages: listLanguagesMock,
    }
    request = requestMock
  },
}))

import {
  getGithubProfile,
  getGithubRepos,
  getRepoDetailedStats,
} from "@/hooks/use-github/use-github"

describe("useGithub helpers", () => {
  it("fetches the github profile", async () => {
    getByUsernameMock.mockResolvedValue({ data: { login: "pedro" } })

    await expect(getGithubProfile("pedro")).resolves.toEqual({ login: "pedro" })
    expect(getByUsernameMock).toHaveBeenCalledWith({ username: "pedro" })
  })

  it("filters forked repos and maps the fields", async () => {
    listForUserMock.mockResolvedValue({
      data: [
        {
          fork: false,
          name: "portfolio",
          description: "desc",
          stargazers_count: 5,
          language: "TypeScript",
          html_url: "https://github.com/pedro/portfolio",
          updated_at: "2026-05-11",
          topics: ["react"],
        },
        {
          fork: true,
          name: "forked",
          description: "fork",
          stargazers_count: 0,
          language: "TypeScript",
          html_url: "https://github.com/pedro/forked",
          updated_at: "2026-05-11",
          topics: [],
        },
      ],
    })

    const repos = await getGithubRepos("pedro")

    expect(repos).toEqual([
      {
        name: "portfolio",
        description: "desc",
        stars: 5,
        language: "TypeScript",
        url: "https://github.com/pedro/portfolio",
        updatedAt: "2026-05-11",
        topics: ["react"],
      },
    ])
  })

  it("returns null when the repo slug is missing", async () => {
    await expect(getRepoDetailedStats(undefined, "repo")).resolves.toBeNull()
    await expect(getRepoDetailedStats("owner", undefined)).resolves.toBeNull()
  })

  it("builds the detailed repo stats payload", async () => {
    getRepoMock.mockResolvedValue({
      data: {
        owner: { login: "pedro" },
        name: "portfolio",
        html_url: "https://github.com/pedro/portfolio",
        default_branch: "main",
        stargazers_count: 10,
        forks_count: 2,
        open_issues_count: 1,
        watchers_count: 4,
        size: 128,
        homepage: "https://example.com",
        license: { name: "MIT" },
      },
    })
    listLanguagesMock.mockResolvedValue({ data: { TypeScript: 1, CSS: 2 } })
    requestMock.mockResolvedValue({ data: "# README" })

    const stats = await getRepoDetailedStats("pedro", "portfolio")

    expect(stats).toEqual({
      repo: {
        owner: "pedro",
        name: "portfolio",
        url: "https://github.com/pedro/portfolio",
        defaultBranch: "main",
      },
      stats: {
        stars: 10,
        forks: 2,
        openIssues: 1,
        watchers: 4,
        sizeKb: 128,
        homepage: "https://example.com",
        license: "MIT",
      },
      languages: ["TypeScript", "CSS"],
      readme: "# README",
    })
  })

  it("returns null when github requests fail", async () => {
    getRepoMock.mockRejectedValue(new Error("boom"))

    await expect(getRepoDetailedStats("pedro", "portfolio")).resolves.toBeNull()
  })
})
