import { Marquee } from "@/components/ui/marquee"
import { motion } from "motion/react"
import Card from "../card/card"
import reviews from "@/utils/reviews.json"

const Recomendations = ({ cardsLift, cardsSkew }: any) => {
  return (
    <div className="relative mt-32 mb-20 flex min-h-[120vh] w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <motion.div
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div>
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            Algumas recomendações de colegas.
          </h2>
        </div>
      </motion.div>

      <div>
        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review) => (
            <Card {...review} key={review.name} />
          ))}
        </Marquee>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
    </div>
  )
}

export default Recomendations
