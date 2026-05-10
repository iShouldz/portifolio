import { motion } from "motion/react"
import { ProjectGallery } from "@/components/gallery/CloudinaryGallery"
import { useTranslation } from "react-i18next"
import type { MediaItem } from "@/utils/enum/types"

interface GalleryShowcaseProps {
  slides: MediaItem[]
}

const GalleryShowcase = ({ slides }: GalleryShowcaseProps) => {
  const { t } = useTranslation()
  return (
    <section className="relative min-h-screen py-20">
      <div className="mx-auto max-w-440 px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            {t("project-details.gallery.title")}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {t("project-details.gallery.description")}
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-[2rem] border border-white/10 bg-background/70 shadow-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <ProjectGallery mediaArray={slides} />
        </motion.div>
      </div>
    </section>
  )
}

export default GalleryShowcase
