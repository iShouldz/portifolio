import ReactMarkdown from "react-markdown"
import rehypeSanitize from "rehype-sanitize"
import remarkGfm from "remark-gfm"
import { readmeSanitizeSchema } from "../utils/readme.utils"
import rehypeHighlight from "rehype-highlight"
import rehypeRaw from "rehype-raw"
import {
  isExternalUrl,
  normalizeReadmeText,
  toGithubRawUrl,
  toLocalPublicPath,
} from "../utils/git-extract"
import useGithubData from "../hooks/use-github-data"
import type { IReadmeView } from "./types"

const ReadmeView = ({ repoMeta }: IReadmeView) => {
  const { repoDetails, blobBase, rawBase } = useGithubData({ repoMeta })

  const urlTransform = (url: string, key: string, node: unknown) => {
    if (!url) return url
    if (
      url.startsWith("#") ||
      url.startsWith("mailto:") ||
      url.startsWith("tel:") ||
      url.startsWith("data:")
    ) {
      return url
    }

    const isImage =
      key === "src" || (node as { tagName?: string }).tagName === "img"

    if (isImage) {
      const githubRaw = toGithubRawUrl(url)
      if (githubRaw) return githubRaw
    }

    if (isExternalUrl(url)) return url

    if (
      url.startsWith("public/") ||
      url.startsWith("./public/") ||
      url.startsWith("/public/")
    ) {
      if (rawBase) {
        const normalized = url.replace(/^\.\//, "").replace(/^\//, "")
        try {
          return new URL(normalized, rawBase).toString()
        } catch {
          return toLocalPublicPath(url)
        }
      }

      return toLocalPublicPath(url)
    }

    if (!rawBase || !blobBase) return url

    const base = isImage ? rawBase : blobBase
    const normalized = url.startsWith("/") ? url.slice(1) : url

    try {
      return new URL(normalized, base).toString()
    } catch {
      return url
    }
  }

  return (
    repoDetails && (
      <div className="h-full w-full">
        <div className="rounded-2xl border border-[#30363d] bg-[#f6f8fa] p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] md:p-10 lg:col-span-3 dark:bg-[#0d1117]">
          <article className="markdown-body max-w-none">
            {repoDetails.readme ? (
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeRaw,
                  [rehypeSanitize, readmeSanitizeSchema],
                  rehypeHighlight,
                ]}
                urlTransform={urlTransform}
                components={{
                  a: ({ node, ...props }) => {
                    const href =
                      typeof props.href === "string" ? props.href : ""
                    const external = /^https?:\/\//i.test(href)
                    return (
                      <a
                        {...props}
                        rel={external ? "noreferrer noopener" : undefined}
                        target={external ? "_blank" : undefined}
                      />
                    )
                  },
                  img: ({ node, ...props }) => (
                    <img {...props} loading="lazy" decoding="async" />
                  ),
                }}
              >
                {normalizeReadmeText(String(repoDetails.readme))}
              </ReactMarkdown>
            ) : (
              <p className="text-muted-foreground italic">
                Nenhum README encontrado para este repositório.
              </p>
            )}
          </article>
        </div>
      </div>
    )
  )
}

export default ReadmeView
