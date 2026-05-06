import { RetroGrid } from "@/components/ui/retro-grid"
import { cn } from "@/lib/utils"
import { MoveDown } from "lucide-react"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"

const FrontPageComponent = ({ introRef, heroScale }: any) => {
  const { t } = useTranslation()
  return (
    <section ref={introRef} className="relative min-h-[120vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center px-4 sm:px-6 lg:px-10">
        <motion.div
          style={{ scale: heroScale, opacity: 0.94 }}
          className="max-w-8xl relative flex h-[88vh] w-full flex-col overflow-hidden rounded-[2.5rem] border border-border/60 bg-background/55 p-5 shadow-[0_30px_110px_rgba(15,23,42,0.1)] backdrop-blur-2xl sm:p-8"
        >
          <RetroGrid
            className={cn(
              "mask-[radial-gradient(700px_circle_at_center,white,transparent)]",
              "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
            )}
          />
          <motion.div
            aria-hidden="true"
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="flex flex-1 flex-col items-center justify-center gap-6">
            <div className="relative flex items-center gap-6">
              <motion.div
                initial={{ opacity: 0, x: -600, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{
                  duration: 2.4,
                  delay: 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-[clamp(4rem,12vw,8.5rem)] leading-none font-bold tracking-tight text-foreground"
              >
                Pedro
              </motion.div>{" "}
              <motion.div
                initial={{ opacity: 0, x: 600, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{
                  duration: 2.5,
                  delay: 0.22,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="text-right text-[clamp(4rem,12vw,8.5rem)] leading-none font-bold tracking-tight text-foreground"
              >
                Souza
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.25,
                delay: 2.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="w-full max-w-2xl text-center"
            >
              <p className="text-md tracking-[0.5em] text-muted-foreground uppercase">
                Front-end engineer
              </p>
            </motion.div>

            <div className="absolute bottom-0 flex -translate-y-1/2 items-end justify-between gap-4">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2 }}
                className="flex flex-col-reverse items-center gap-2 text-sm text-muted-foreground md:inline-flex"
              >
                {t("landing-page.home.front-page.scroll_down")}
                <MoveDown size={42} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default FrontPageComponent
