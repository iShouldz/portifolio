export interface IProjectCard {
  id: string
  title: string
  description: string
  githubUrl: string
  figmaUrl?: string
  deployLink?: string
  tecnologies: string[]
  tags: string[]
  img?: string
  resources: ResourceType[]
}

interface ResourceType {
  type: "feature" | "product"
  title: string
  description: string
}
