import { ScrollProgress } from "@/components/ui/scroll-progress"
import ReactLenis from "lenis/react"
import { Outlet } from "react-router"

const OutletPage = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollProgress className="h-2" />
      <Outlet />
    </ReactLenis>
  )
}

export default OutletPage
