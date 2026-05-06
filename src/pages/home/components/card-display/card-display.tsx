import { motion, useScroll, useTransform, type Variants } from "motion/react"
import { WobbleCard } from "@/components/ui/wobble-card"
import { useNavigate } from "react-router"
import { useRef } from "react"
import { MoveDown } from "lucide-react"
import { useTranslation } from "react-i18next"

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

const CardDisplay = ({ cardsRef, cardsLift, cardsSkew }: any) => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const yFast = useTransform(scrollYProgress, [0, 1], [300, -300])
  const yFastSobreMim = useTransform(scrollYProgress, [0, 1], [250, -250])
  const yMedium = useTransform(scrollYProgress, [0, 1], [120, -120])
  const ySlow = useTransform(scrollYProgress, [0, 1], [90, -90])

  return (
    <section
      ref={cardsRef}
      className="max-w-8xl relative mx-auto mt-48 mb-24 flex flex-col items-center justify-center gap-4"
    >
      <motion.div
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            {t("landing-page.cards-section.title")}
          </h2>
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
          style={{ y: yFast }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-1 lg:row-span-2"
        >
          <WobbleCard
            containerClassName="h-full w-full bg-secondary min-h-[320px] lg:min-h-[560px] rounded-[2.5rem] cursor-pointer"
            onClick={() => navigate("/projects")}
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
        </motion.div>

        <motion.div
          style={{ y: yMedium }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-2 lg:col-start-2"
        >
          <WobbleCard
            containerClassName="h-full w-full bg-primary/20 min-h-[320px] lg:min-h-[360px] cursor-pointer"
            onClick={() => navigate("/experience")}
          >
            <div className="group flex h-full flex-col justify-between p-6">
              <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                {t("landing-page.cards-section.cards.experience.title")}
              </h2>
              <div className="flex flex-col">
                <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                  {t("landing-page.cards-section.cards.experience.description")}
                </p>
                <p className="mt-4 text-left text-4xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                  →
                </p>
              </div>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div
          style={{ y: ySlow }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-1"
        >
          <WobbleCard
            containerClassName="h-full w-full min-h-[320px] lg:min-h-[360px] bg-secondary cursor-pointer"
            onClick={() => navigate("/contact")}
          >
            <div className="group flex h-full flex-col justify-between p-6">
              <h2 className="max-w-80 text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
                {t("landing-page.cards-section.cards.contact.title")}
              </h2>
              <div className="flex flex-col">
                <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                  {t("landing-page.cards-section.cards.contact.description")}
                </p>
                <p className="mt-4 text-left text-4xl transition-transform duration-300 ease-out group-hover:translate-x-3">
                  →
                </p>
              </div>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div
          style={{ y: yFastSobreMim }}
          variants={itemVariants}
          className="col-span-1 lg:col-span-3 lg:col-start-2"
        >
          <WobbleCard
            containerClassName="h-full w-full bg-accent min-h-[160px] lg:min-h-[220px] cursor-pointer"
            onClick={() => navigate("/about")}
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
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 flex right-8 items-end justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 3 }}
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
