import { Dock, DockIcon } from "@/components/ui/dock"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import ReactLenis from "lenis/react"
import { Download, Home, Zap } from "lucide-react"
import { Outlet, useNavigate } from "react-router"
import { motion } from "motion/react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCallback } from "react"
import { RoutesUrl } from "@/utils/enum/routes.utils"
import { useTranslation } from "react-i18next"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import ScroolToTop from "@/components/scrool-to-top/scrool-to-top"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Separator } from "@/components/ui/separator"

const OutletPage = () => {
  const navigate = useNavigate()
  const { i18n, t } = useTranslation()

  const handleGoToHome = useCallback(() => {
    navigate(RoutesUrl.HOME)
  }, [navigate])

  const handleGoToGithub = useCallback(() => {
    window.open("https://github.com/iShouldz", "_blank")
  }, [])

  const handleGoToLinkedIn = useCallback(() => {
    window.open("https://www.linkedin.com/in/pedro-souza-385794241/", "_blank")
  }, [])

  const handleToggleLanguage = useCallback(
    (language: "pt" | "en" | "es") => {
      localStorage.setItem("lang", language)
      i18n.changeLanguage(language)
    },
    [i18n]
  )

  return (
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      <ScroolToTop />
      <ScrollProgress className="h-2" />
      <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(75,111,32,0.12),transparent_25%),radial-gradient(circle_at_top_right,rgba(50,179,175,0.12),transparent_28%),linear-gradient(180deg,#d4d5d0,#c5c6bf)] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(132,219,186,0.15),transparent_25%),radial-gradient(circle_at_top_right,rgba(50,179,175,0.15),transparent_28%),linear-gradient(180deg,#152312,#0e1707)]">
        <Outlet />
      </main>

      <motion.div
        initial={{ opacity: 0, x: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
        transition={{
          duration: 3,
          delay: 0.12,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="fixed bottom-4 left-1/2 z-50 w-max -translate-x-1/2"
      >
        <Dock>
          <DockIcon onClick={handleGoToHome}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Home className="mix-blend-difference" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.home")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" />
          <DockIcon onClick={() => navigate("/resume")}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Zap />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.summary")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <a href="/Curriculo.pdf" download="Curriculo.pdf">
                <TooltipTrigger asChild>
                    <Download />
                </TooltipTrigger>
              </a>

              <TooltipContent>
                <p>{t("dock.curriculum")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon onClick={handleGoToGithub}>
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.github")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon onClick={handleGoToLinkedIn}>
            <Tooltip>
              <TooltipTrigger asChild>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-linkedin"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                </svg>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.linkedin")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" />
          <DockIcon>
            <HoverCard>
              <HoverCardTrigger>
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 8L10 13M4 14L10 8L12 5M2 5H14M7 2H8M12.913 17H20.087M12.913 17L11 21M12.913 17L15.7783 11.009C16.0092 10.5263 16.1246 10.2849 16.2826 10.2086C16.4199 10.1423 16.5801 10.1423 16.7174 10.2086C16.8754 10.2849 16.9908 10.5263 17.2217 11.009L20.087 17M20.087 17L22 21"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
              </HoverCardTrigger>
              <HoverCardContent className="flex w-fit flex-col gap-4">
                <h5>{t("dock.language.label")}</h5>
                <ToggleGroup
                  type="single"
                  defaultValue={i18n.language}
                  variant="outline"
                  className="flex w-fit flex-1"
                >
                  <ToggleGroupItem
                    value="en"
                    aria-label="Toggle top"
                    onClick={() => handleToggleLanguage("en")}
                  >
                    {t("dock.language.options.en")}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="es"
                    aria-label="Toggle bottom"
                    onClick={() => handleToggleLanguage("es")}
                  >
                    {t("dock.language.options.es")}
                  </ToggleGroupItem>
                  <ToggleGroupItem
                    value="pt"
                    aria-label="Toggle left"
                    onClick={() => handleToggleLanguage("pt")}
                  >
                    {t("dock.language.options.pt")}
                  </ToggleGroupItem>
                </ToggleGroup>
              </HoverCardContent>
            </HoverCard>
          </DockIcon>

          <DockIcon>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex h-full w-full cursor-pointer items-center justify-center">
                  <AnimatedThemeToggler />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.theme")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>
        </Dock>
      </motion.div>
    </ReactLenis>
  )
}

export default OutletPage
