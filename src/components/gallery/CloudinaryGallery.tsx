import Lightbox from "yet-another-react-lightbox"
import Inline from "yet-another-react-lightbox/plugins/inline"
import Video from "yet-another-react-lightbox/plugins/video"
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails"
import "yet-another-react-lightbox/styles.css"
import "yet-another-react-lightbox/plugins/thumbnails.css"

export function ProjectGallery({ mediaArray }: { mediaArray: any[] }) {
  return (
    <div className="w-full overflow-hidden rounded-l-[2rem] border border-white/10 shadow-2xl backdrop-blur-2xl">
      <Lightbox
        slides={mediaArray}
        plugins={[Inline, Video, Thumbnails]}
        inline={{
          style: {
            width: "100%",
            maxWidth: "100%",
            aspectRatio: "16/9",
          },
        }}
        styles={{
          container: { backgroundColor: "transparent" },
          thumbnail: {
            backgroundColor: "transparent",
            borderColor: "rgba(16, 185, 129, 0.5)",
          },
        }}
        carousel={{
          padding: 0,
          spacing: 0,
          imageFit: "cover",
        }}
      />
    </div>
  )
}
