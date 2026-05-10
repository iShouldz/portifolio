import { useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import FrontPageComponent from "./components/front-page/front-page"
import CardDisplay from "./components/card-display/card-display"
import Recomendations from "./components/recomendations/recomendations"

const Home = () => {
  const introRef = useRef<HTMLElement | null>(null)
  const cardsRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end start"],
  })
  const { scrollYProgress: cardsProgress } = useScroll({
    target: cardsRef,
    offset: ["start end", "end start"],
  })

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94])
  const cardsLift = useTransform(cardsProgress, [0, 0.5, 1], [80, 0, -60])
  const cardsSkew = useTransform(cardsProgress, [0, 0.5, 1], [8, 0, -6])

  return (
    <>
      <FrontPageComponent introRef={introRef} heroScale={heroScale} />

      <CardDisplay cardsLift={cardsLift} cardsSkew={cardsSkew} />

      <Recomendations cardsLift={cardsLift} cardsSkew={cardsSkew} />
    </>
  )
}

export default Home
