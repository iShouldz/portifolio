import { useRef } from "react"
import { motion, useScroll, useTransform } from "motion/react"
import { useTranslation } from "react-i18next"
import type { IExperience } from "./types"
import ExperiencesList from "./components/experiences-list.component"

const Experiences = () => {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 80%"],
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  const experienciesList = t("experiences.experiences-list", {
    returnObjects: true,
  }) as IExperience[]

  return (
    <section className="relative mx-auto w-full max-w-6xl px-6 py-24 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: -80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mb-20 text-center"
      >
        <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-6xl">
          {t("experiences.title")}
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          {t("experiences.description")}
        </p>
      </motion.div>

      <div ref={containerRef} className="relative space-y-12 md:space-y-24">
        <div className="absolute top-0 bottom-0 left-5 w-0.5 bg-white/5 md:left-1/2 md:-translate-x-1/2" />

        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-5 w-0.5 origin-top bg-linear-to-b from-emerald-500 via-emerald-400 to-transparent shadow-[0_0_10px_rgba(16,185,129,0.5)] md:left-1/2 md:-translate-x-1/2"
        />

        <ExperiencesList experienciesList={experienciesList} />
      </div>
    </section>
  )
}

export default Experiences
