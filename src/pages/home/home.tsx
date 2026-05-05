import ReactLenis from "lenis/react"
import { useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import FrontPageComponent from "./components/front-page/front-page"
import CardDisplay from "./components/card-display/card-display"
import Recomendations from "./components/recomendations/recomendations"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import { Dock, DockIcon } from "@/components/ui/dock"
import { Search, Settings } from "lucide-react"
import { motion } from "motion/react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

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
    <>
      <ReactLenis
        root
        options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}
      >
        <ScrollProgress className="h-2" />
        <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(169,124,248,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(143,213,189,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,243,236,0.96))] text-foreground">
          <FrontPageComponent introRef={introRef} heroScale={heroScale} />

          <Recomendations
            cardsRef={cardsRef}
            cardsLift={cardsLift}
            cardsSkew={cardsSkew}
          />

          <CardDisplay cardsLift={cardsLift} cardsSkew={cardsSkew} />
        </main>
      </ReactLenis>
      <motion.div
        initial={{ opacity: 0, x: 0, y: 600, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{
          duration: 3,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed bottom-4 left-1/2 z-50 w-auto -translate-x-1/2 rounded-full"
      >
        <Dock>
          <DockIcon>{/* <Home /> */}</DockIcon>
          <DockIcon>
            <Settings />
          </DockIcon>

          <DockIcon>
            <AnimatedThemeToggler />
          </DockIcon>

          <DockIcon>
            <Search />
          </DockIcon>
        </Dock>
      </motion.div>
    </>
  )
}

export default Home
