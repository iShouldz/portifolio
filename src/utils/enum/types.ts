export interface ProjectMedia {
  id: string
  mediaList: MediaItem[]
}

interface YoutubeMedia {
  type: "youtube"
  videoId: string
}

export type MediaItem = ImageMedia | VideoMedia | YoutubeMedia

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
