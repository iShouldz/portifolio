import Lightbox from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"
import Video from "yet-another-react-lightbox/plugins/video"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen" 
import Zoom from "yet-another-react-lightbox/plugins/zoom"

import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

export function ProjectGallery({ mediaArray }: { mediaArray: any[] }) {
  return (
    <div className="w-full overflow-hidden rounded-t-[2rem] border border-white/10 bg-black/20 shadow-2xl backdrop-blur-2xl lg:rounded-l-[2rem] lg:rounded-tr-none">
      <Lightbox
        slides={mediaArray}
        plugins={[Inline, Video, Thumbnails, Fullscreen, Zoom]} 
        inline={{
          style: {
            width: "100%",
            maxWidth: "100%",
            aspectRatio: "16/9",
          },
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "contain",
        }}
        thumbnails={{
          position: "bottom",
          width: 100,
          height: 60,
          gap: 12,
          vignette: false, 
        }}
        styles={{
          container: { backgroundColor: "transparent" },
          thumbnail: {
            backgroundColor: "rgba(0,0,0,0.4)", 
            borderColor: "rgba(16, 185, 129, 0.8)", 
            borderRadius: "8px",
          },
          thumbnailsContainer: {
            backgroundColor: "rgba(0,0,0,0.3)", 
            padding: "1rem 0",
          },
          button: {
            filter: "drop-shadow(0px 2px 4px rgba(0,0,0,0.8))",
          }
        }}
      />
    </div>
  )
}