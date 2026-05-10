export interface IUrlTransform {
  url: string
  key: string
  node: unknown
  rawBase: string | null
  blobBase: string | null
}

export type IGitExtractProps = {
  owner?: string
  name?: string
} | null
