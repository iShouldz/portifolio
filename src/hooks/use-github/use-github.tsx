import { Octokit } from "@octokit/rest"

const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
})

export async function getGithubProfile(username: string) {
  const { data } = await octokit.users.getByUsername({ username })
  return data
}

export async function getGithubRepos(username: string) {
  const { data } = await octokit.repos.listForUser({
    username,
    sort: "updated",
    per_page: 100,
  })

  return data
    .filter((repo) => !repo.fork)
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      language: repo.language,
      url: repo.html_url,
      updatedAt: repo.updated_at,
      topics: repo.topics,
    }))
}

export async function getRepoDetailedStats(
  owner: string | undefined,
  repo: string | undefined
) {
  if (!owner || !repo) return null
  try {
    const [repoData, languagesData, readmeData] = await Promise.all([
      octokit.repos.get({ owner, repo }),
      octokit.repos.listLanguages({ owner, repo }),
      octokit
        .request("GET /repos/{owner}/{repo}/readme", {
          owner,
          repo,
          headers: {
            accept: "application/vnd.github.v3.raw",
          },
        })
        .catch(() => ({ data: "" })),
    ])

    return {
      repo: {
        owner: repoData.data.owner.login,
        name: repoData.data.name,
        url: repoData.data.html_url,
        defaultBranch: repoData.data.default_branch,
      },
      stats: {
        stars: repoData.data.stargazers_count,
        forks: repoData.data.forks_count,
        openIssues: repoData.data.open_issues_count,
        watchers: repoData.data.watchers_count,
        sizeKb: repoData.data.size,
        homepage: repoData.data.homepage,
        license: repoData.data.license?.name ?? "Sem licença",
      },
      languages: Object.keys(languagesData.data),
      readme: readmeData.data,
    }
  } catch (error) {
    console.error(`Erro ao buscar detalhes do repositório ${repo}:`, error)
    return null
  }
}
