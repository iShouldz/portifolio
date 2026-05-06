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
