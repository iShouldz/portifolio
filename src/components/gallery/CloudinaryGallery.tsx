import Lightbox from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"
import Video from "yet-another-react-lightbox/plugins/video"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import { useEffect, useMemo, useState } from "react"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"
import type { MediaItem } from "@/utils/enum/types"

export function ProjectGallery({ mediaList }: { mediaList: MediaItem[] }) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)")
    const handler = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(e.matches)
    }

    setIsMobile(mq.matches)
    if (mq.addEventListener) mq.addEventListener("change", handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener)
        mq.removeEventListener("change", handler as unknown as EventListener)
      else mq.removeListener(handler as unknown as EventListener)
    }
  }, [])

  const buttonPrev = useMemo(
    () => (isMobile ? () => null : undefined),
    [isMobile]
  )
  const buttonNext = useMemo(
    () => (isMobile ? () => null : undefined),
    [isMobile]
  )

  const plugins = useMemo(() => {
    return isMobile
      ? [Inline, Video, Fullscreen, Zoom]
      : [Inline, Video, Thumbnails, Fullscreen, Zoom]
  }, [isMobile])

  const inlineStyle = useMemo(() => {
    return {
      width: "100%",
      maxWidth: "100%",
      aspectRatio: isMobile ? "16/10" : "16/9",
    }
  }, [isMobile])

  const carouselProps = useMemo(() => {
    return {
      padding: 0,
      spacing: 0,
      preload: 1,
      imageFit: isMobile ? ("cover" as const) : ("contain" as const),
    }
  }, [isMobile])

  const thumbnailsProp = useMemo(() => {
    if (isMobile) return undefined
    return {
      position: "bottom" as const,
      width: 100,
      height: 60,
      gap: 12,
      vignette: false,
    }
  }, [isMobile])

  const stylesProp = useMemo(() => {
    return {
      container: { backgroundColor: "transparent" },
      thumbnail: {
        backgroundColor: "rgba(0,0,0,0.4)",
        borderColor: "rgba(16, 185, 129, 0.8)",
        borderRadius: "8px",
      },
      thumbnailsContainer: isMobile
        ? { display: "none" }
        : { backgroundColor: "rgba(0,0,0,0.3)", padding: "1rem 0" },
      toolbar: {
        display: "flex",
        justifyContent: isMobile ? "flex-end" : "center",
        gap: "6px",
      },
      button: isMobile
        ? {
            backgroundColor: "rgba(0,0,0,0.45)",
            borderRadius: "10%",
            padding: "6px",
            transform: "translateY(0)",
          }
        : {
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "20%",
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.8))",
          },
    }
  }, [isMobile])

  return (
    <div className="w-full overflow-hidden rounded-t-[2rem] border border-white/10 bg-black/20 shadow-2xl backdrop-blur-2xl lg:rounded-l-[2rem] lg:rounded-tr-none">
      <Lightbox
        plugins={plugins}
        styles={stylesProp}
        //eslint-disable-next-line @typescript-eslint/no-explicit-any
        slides={mediaList as any}
        carousel={carouselProps}
        thumbnails={thumbnailsProp}
        inline={{ style: inlineStyle }}
        render={{
          buttonPrev: buttonPrev,
          buttonNext: buttonNext,
          slide: ({ slide }) => {
            const currentSlide = slide as unknown as MediaItem

            if (currentSlide.type === "youtube") {
              return (
                <div className="flex h-full w-full items-center justify-center p-4">
                  <iframe
                    className="aspect-video w-full py-11 rounded-lg shadow-lg"
                    src={`https://www.youtube.com/embed/${currentSlide.videoId}?autoplay=0&rel=0`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )
            }

            return undefined
          },
        }}
      />
    </div>
  )
}
