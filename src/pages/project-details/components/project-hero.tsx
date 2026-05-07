import { MoveDown } from "lucide-react"
import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { useTranslation } from "react-i18next"

interface ProjectHeroProps {
  title: string
  description?: string
}

const ProjectHero = ({ title, description }: ProjectHeroProps) => {
  const { t } = useTranslation()
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95])

  return (
    <motion.div
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
      style={{ scale }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent" />

      <motion.div
        style={{ y, opacity }}
        className="relative flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center"
      >
        <motion.h1
          className="max-w-4xl text-5xl leading-tight font-bold md:text-7xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            className="max-w-2xl text-lg text-muted-foreground md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>

      <div className="absolute bottom-23 left-1/2 flex -translate-x-1/2 flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="flex flex-col-reverse items-center gap-2 text-sm text-muted-foreground md:inline-flex"
        >
          {t("landing-page.home.front-page.scroll_down")}
          <MoveDown size={42} />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ProjectHero
