export const normalizeReadmeText = (value: string) =>
  value
    .replace(/src=("|')public\//g, "src=$1/")
    .replace(/href=("|')public\//g, "href=$1/")

export const parseGithubRepo = (url?: string | null) => {
  if (!url) return null
  const cleaned = url
    .replace(/^git\+/, "")
    .replace(/^https?:\/\/github\.com\//, "")
    .replace(/^git@github\.com:/, "")
    .replace(/\.git$/, "")
    .split(/[?#]/)[0]

  const [owner, name] = cleaned.split("/")
  if (!owner || !name) return null

  return { owner, name }
}

export const isExternalUrl = (value: string) => /^(https?:)?\/\//i.test(value)

export const toGithubRawUrl = (value: string) => {
  const match = value.match(
    /^https?:\/\/github\.com\/([^/]+)\/([^/]+)\/(?:blob|raw)\/([^/]+)\/(.+)$/i
  )

  if (!match) return null

  const [, owner, repo, branch, rest] = match
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${rest}`
}

export const toLocalPublicPath = (value: string) => {
  const trimmed = value.replace(/^\.*\/?public\//, "")
  return `/${trimmed}`
}

