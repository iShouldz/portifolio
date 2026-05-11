import { Dock, DockIcon } from "@/components/ui/dock"
import { ScrollProgress } from "@/components/ui/scroll-progress"
import ReactLenis from "lenis/react"
import { Download, Home, MoveLeft, Zap } from "lucide-react"
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
import ScroolToTop from "@/components/scrool-to-top/scrool-to-top"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GithubIcon } from "@/components/icons/GithubIcon"
import { LinkedinIcon } from "@/components/icons/LinkedinIcon"

const OutletPage = () => {
  const navigate = useNavigate()

  const { i18n, t } = useTranslation()

  const handleBackPage = useCallback(() => {
    navigate(-1)
  }, [navigate])

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

      <ScrollProgress className="h-2 bg-linear-to-r from-[#4b6f20] via-[#32b3af] to-[#84dbba] dark:from-[#152312] dark:via-[#84dbba] dark:to-[#32b3af]" />
      <main className="relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(75,111,32,0.12),transparent_25%),radial-gradient(circle_at_top_right,rgba(50,179,175,0.12),transparent_28%),linear-gradient(180deg,#d4d5d0,#c5c6bf)] text-foreground dark:bg-[radial-gradient(circle_at_top_left,rgba(132,219,186,0.15),transparent_25%),radial-gradient(circle_at_top_right,rgba(50,179,175,0.15),transparent_28%),linear-gradient(180deg,#152312,#0e1707)]">
        <Outlet />
      </main>
      {window.location.pathname !== RoutesUrl.HOME && (
        <MoveLeft
          onClick={handleBackPage}
          className="absolute top-10 left-10 cursor-pointer"
        />
      )}
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
          <DockIcon
            onClick={() => {
              navigate(RoutesUrl.RESUME)
            }}
          >
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
                <GithubIcon />
              </TooltipTrigger>

              <TooltipContent>
                <p>{t("dock.github")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <DockIcon onClick={handleGoToLinkedIn}>
            <Tooltip>
              <TooltipTrigger asChild>
                <LinkedinIcon />
              </TooltipTrigger>
              <TooltipContent>
                <p>{t("dock.linkedin")}</p>
              </TooltipContent>
            </Tooltip>
          </DockIcon>

          <Separator orientation="vertical" />

          <DockIcon>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mt-2"
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
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t("dock.language.label")}</p>
                  </TooltipContent>
                </Tooltip>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuLabel>
                    {t("dock.language.label")}
                  </DropdownMenuLabel>
                  <DropdownMenuItem
                    onClick={() => {
                      handleToggleLanguage("en")
                    }}
                  >
                    {t("dock.language.options.en")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleToggleLanguage("es")
                    }}
                  >
                    {t("dock.language.options.es")}
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      handleToggleLanguage("pt")
                    }}
                  >
                    {t("dock.language.options.pt")}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
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
