import { getRepoDetailedStats } from "@/hooks/use-github/use-github"
import { useEffect, useState } from "react"
import type { IReadmeView } from "../components/types"

const useGithubData = ({ repoMeta }: IReadmeView) => {
  const [repoDetails, setRepoDetails] = useState<any>(null)

  const readmeOwner = repoDetails?.repo?.owner ?? repoMeta?.owner
  const readmeName = repoDetails?.repo?.name ?? repoMeta?.name
  const readmeBranch = repoDetails?.repo?.defaultBranch || "main"
  const rawBase =
    readmeOwner && readmeName
      ? `https://raw.githubusercontent.com/${readmeOwner}/${readmeName}/${readmeBranch}/`
      : null
  const blobBase =
    readmeOwner && readmeName
      ? `https://github.com/${readmeOwner}/${readmeName}/blob/${readmeBranch}/`
      : null

  useEffect(() => {
    if (!repoMeta) return

    getRepoDetailedStats(repoMeta.owner, repoMeta.name).then((data) => {
      setRepoDetails(data)
    })
  }, [repoMeta])

  return { repoDetails, blobBase, rawBase }
}

export default useGithubData
