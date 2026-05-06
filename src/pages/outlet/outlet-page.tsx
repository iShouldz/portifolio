import { ScrollProgress } from "@/components/ui/scroll-progress"
import ReactLenis from "lenis/react"
import { Outlet } from "react-router"

const OutletPage = () => {
  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScrollProgress className="h-2" />
      <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(169,124,248,0.18),transparent_25%),radial-gradient(circle_at_top_right,rgba(143,213,189,0.16),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.84),rgba(246,243,236,0.96))] text-foreground">
        <Outlet />
      </main>
    </ReactLenis>
  )
}

export default OutletPage
