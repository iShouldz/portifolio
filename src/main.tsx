import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { HelmetProvider } from "react-helmet-async"

import "./i18n.ts"
import "./index.css"
import { ThemeProvider } from "@/components/theme-provider.tsx"
import { RouterProvider } from "react-router"
import { routes } from "./routes.tsx"
import { TooltipProvider } from "./components/ui/tooltip.tsx"
import { Toaster } from "./components/ui/sonner.tsx"
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <TooltipProvider>
          <RouterProvider router={routes} />
          <Analytics />
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </HelmetProvider>
  </StrictMode>
)
