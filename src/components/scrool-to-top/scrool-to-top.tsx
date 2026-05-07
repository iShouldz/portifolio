import { useLenis } from "lenis/react"
import { useEffect } from "react"
import { useLocation } from "react-router"

const ScroolToTop = () => {
  const { pathname } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true })
  }, [pathname, lenis])
  return null
}

export default ScroolToTop
