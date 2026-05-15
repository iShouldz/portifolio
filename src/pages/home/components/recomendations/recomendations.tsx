import { Marquee } from "@/components/ui/marquee"
import { motion } from "motion/react"
import Card from "../card/card"
import { useTranslation } from "react-i18next"
import type { ICard, IRecomendationsProps } from "../../types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  CardDescription,
  CardHeader,
  Card as CardShadcn,
  CardTitle,
} from "@/components/ui/card"
import useIsMobile from "@/hooks/use-is-mobile"
import { LinkedinIcon } from "@/components/icons/LinkedinIcon"

const Recomendations = ({ cardsLift, cardsSkew }: IRecomendationsProps) => {
  const { t } = useTranslation()
  const isMobile = useIsMobile()

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

      {isMobile ? (
        <Carousel className="w-full">
          <CarouselContent className="w-full p-1">
            {recomendationsList.map((review, index) => (
              <CarouselItem key={index} className="min-h-80">
                <CardShadcn>
                  <CardHeader className="flex flex-col gap-2">
                    <CardTitle>{review.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                      <LinkedinIcon />
                      {review.username}
                    </CardDescription>
                    <CardDescription className="line-clamp-10 h-full min-h-80">
                      {review.body}
                    </CardDescription>
                  </CardHeader>
                </CardShadcn>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-3! z-50" />
          <CarouselNext className="right-3! z-50" />
        </Carousel>
      ) : (
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
      )}
    </section>
  )
}

export default Recomendations
