export interface ProjectMedia {
  id: string
  mediaList: MediaItem[]
}

export type MediaItem = ImageMedia | VideoMedia

interface ImageMedia {
  type: "image"
  src: string
}

interface VideoMedia {
  type: "video"
  autoPlay?: boolean
  muted?: boolean
  controls?: boolean
  sources: VideoSource[]
}

interface VideoSource {
  src: string
  type: string 
}

export type ProjectMediaList = ProjectMedia[]
