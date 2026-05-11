import { motion, useScroll, useTransform, type Variants } from "motion/react"
import { WobbleCard } from "@/components/ui/wobble-card"
import { useNavigate } from "react-router"
import { useRef } from "react"
import { Download, MoveDown } from "lucide-react"
import { useTranslation } from "react-i18next"
import { RoutesUrl } from "@/utils/enum/routes.utils"
import type { ICardDisplayProps } from "../../types"
import { resumeFiles } from "../../utils/get-resume-file"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants | undefined = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25,
      mass: 0.5,
    },
  },
}

const CardDisplay = ({ cardsRef, cardsLift, cardsSkew }: ICardDisplayProps) => {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const currentLanguage = resumeFiles[i18n.language] || "Curriculum.pdf"

  const yFast = useTransform(scrollYProgress, [0, 1], [150, -150])
  const yFastSobreMim = useTransform(scrollYProgress, [0, 1], [120, -120])
  const yMedium = useTransform(scrollYProgress, [0, 1], [80, -80])
  const ySlow = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section
      ref={cardsRef}
      className="max-w-8xl relative mx-auto mt-48 mb-24 flex flex-col items-center justify-center gap-4"
      aria-label="Seção de cartões principais"
    >
      <motion.div
        style={{ y: cardsLift, opacity: cardsSkew }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h1 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            {t("landing-page.cards-section.title")}
          </h1>
        </motion.div>
      </motion.div>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-8xl mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-10"
      >
        <motion.div
          style={{ y: yFast, willChange: "transform" }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-1 lg:row-span-2"
        >
          <div
            tabIndex={0}
            role="button"
            aria-label="Ir para projetos"
            onClick={() => navigate(RoutesUrl.PROJECTS)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ")
                navigate(RoutesUrl.PROJECTS)
            }}
            className="h-full min-h-80 w-full cursor-pointer rounded-[2.5rem] bg-secondary lg:min-h-140"
          >
            <WobbleCard
              containerClassName="h-full w-full bg-secondary min-h-[320px] lg:min-h-[560px] rounded-[2.5rem] cursor-pointer"
              onClick={() => navigate(RoutesUrl.PROJECTS)}
            >
              <div className="group flex h-full w-full flex-col justify-between p-6">
                <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                  {t("landing-page.cards-section.cards.projects.title")}
                </h2>
                <div className="flex flex-col">
                  <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                    {t("landing-page.cards-section.cards.projects.description")}
                  </p>
                  <p className="mt-4 text-left text-4xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                    →
                  </p>
                </div>
              </div>
            </WobbleCard>
          </div>
        </motion.div>

        <motion.div
          style={{ y: yMedium, willChange: "transform" }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-2 lg:col-start-2"
        >
          <div
            tabIndex={0}
            role="button"
            aria-label="Ir para experiências"
            onClick={() => navigate(RoutesUrl.EXPERIENCIES)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ")
                navigate(RoutesUrl.EXPERIENCIES)
            }}
            className="rounded-[2.5rem] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <WobbleCard
              containerClassName="h-full w-full bg-primary/20 min-h-[320px] lg:min-h-[360px] cursor-pointer"
              onClick={() => navigate(RoutesUrl.EXPERIENCIES)}
            >
              <div className="group flex h-full flex-col justify-between p-6">
                <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                  {t("landing-page.cards-section.cards.experience.title")}
                </h2>
                <div className="flex flex-col">
                  <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                    {t(
                      "landing-page.cards-section.cards.experience.description"
                    )}
                  </p>
                  <p className="mt-4 text-left text-4xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                    →
                  </p>
                </div>
              </div>
            </WobbleCard>
          </div>
        </motion.div>

        <motion.div
          style={{ y: ySlow, willChange: "transform" }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-1"
        >
          <a href={`/${currentLanguage}`} download={currentLanguage}>
            <WobbleCard containerClassName="h-full w-full min-h-[320px] lg:min-h-[360px] bg-secondary cursor-pointer">
              <div className="group flex h-full flex-col items-center justify-center p-6 text-center">
                <h2 className="flex flex-col items-center justify-center gap-4 text-center text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                  <Download size={64} />
                  {t("landing-page.cards-section.cards.download.title")}
                </h2>
              </div>
            </WobbleCard>
          </a>
        </motion.div>

        <motion.div
          style={{ y: yFastSobreMim, willChange: "transform" }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-3 lg:col-start-2"
        >
          <div
            tabIndex={0}
            role="button"
            aria-label="Ir para sobre e contato"
            onClick={() => navigate(RoutesUrl.ABOUT)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === "Enter" || e.key === " ") navigate(RoutesUrl.ABOUT)
            }}
            className="rounded-[2.5rem] focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          >
            <WobbleCard
              containerClassName="h-full w-full bg-accent min-h-[160px] lg:min-h-[220px] cursor-pointer"
              onClick={() => navigate(RoutesUrl.ABOUT)}
            >
              <div className="group flex h-full max-w-sm flex-col justify-between p-6">
                <h2 className="max-w-80 text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                  {t("landing-page.cards-section.cards.about-me.title")}
                </h2>
                <div className="flex flex-col">
                  <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                    {t("landing-page.cards-section.cards.about-me.description")}
                  </p>
                  <p className="mt-4 text-left text-4xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                    →
                  </p>
                </div>
              </div>
            </WobbleCard>
          </div>
        </motion.div>
      </motion.div>
      <div className="absolute right-8 bottom-0 flex items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 2 }}
          className="flex flex-col-reverse items-center gap-2 text-sm text-muted-foreground md:inline-flex"
        >
          {t("landing-page.cards-section.scroll_down")}
          <MoveDown size={42} />
        </motion.div>
      </div>
    </section>
  )
}

export default CardDisplay
