import { Marquee } from "@/components/ui/marquee"
import { motion } from "motion/react"
import Card from "../card/card"
import { useTranslation } from "react-i18next"
import type { ICard, IRecomendationsProps } from "../../types"

const Recomendations = ({ cardsLift, cardsSkew }: IRecomendationsProps) => {
  const { t } = useTranslation()

  const recomendationsList = t("landing-page.recomendations.list", {
    returnObjects: true,
  }) as ICard[]

  const firstRow = recomendationsList.slice(0, recomendationsList.length / 2)
  const secondRow = recomendationsList.slice(recomendationsList.length / 2)

  return (
    <section className="relative mt-32 mb-20 flex min-h-[150vh] w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
        viewport={{ once: true }}
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div>
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            {t("landing-page.recomendations.title")}
          </h2>
        </div>
      </motion.div>

      <div className="w-full">
        <Marquee
          pauseOnHover
          className="[--duration:25s]"
          aria-label="Recomendações de colegas - linha 1"
        >
          {firstRow.map((review) => (
            <Card {...review} key={review.name} />
          ))}
        </Marquee>
        <Marquee
          pauseOnHover
          reverse
          className="[--duration:25s]"
          aria-label="Recomendações de colegas - linha 2"
        >
          {secondRow.map((review) => (
            <Card {...review} key={review.name} />
          ))}
        </Marquee>
      </div>
    </section>
  )
}

export default Recomendations
