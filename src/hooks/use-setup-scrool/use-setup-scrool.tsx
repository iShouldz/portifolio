import { useScroll, useTransform } from "motion/react"
import { useRef } from "react"

const useSetupScrool = () => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const titleY = useTransform(scrollYProgress, [0, 1], [36, -24])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25, 1], [0.7, 1, 1])

  return {
    titleY,
    sectionRef,
    titleOpacity,
  }
}

export default useSetupScrool
