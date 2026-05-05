import ReactLenis from "lenis/react"
import { useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import FrontPageComponent from "./components/front-page/front-page"
import CardDisplay from "./components/card-display/card-display"

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
  //   const gridShift = useTransform(scrollYProgress, [0, 1], [0, -120])
  //   const gridGlow = useTransform(scrollYProgress, [0, 1], [0.28, 0.58])
  const cardsLift = useTransform(cardsProgress, [0, 0.5, 1], [80, 0, -60])
  const cardsSkew = useTransform(cardsProgress, [0, 0.5, 1], [8, 0, -6])

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(169,124,248,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(143,213,189,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,243,236,0.96))] text-foreground">
        <FrontPageComponent introRef={introRef} heroScale={heroScale} />
        <CardDisplay
          cardsRef={cardsRef}
          cardsLift={cardsLift}
          cardsSkew={cardsSkew}
        />
      </main>
    </ReactLenis>
  )
}

export default Home
