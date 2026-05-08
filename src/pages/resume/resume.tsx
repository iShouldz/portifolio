import { motion, type Variants } from "motion/react"
import { Trans, useTranslation } from "react-i18next"
import { Briefcase, Code2, Award, Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WobbleCard } from "@/components/ui/wobble-card"
import { useNavigate } from "react-router"
import useSetupScrool from "@/hooks/use-setup-scrool/use-setup-scrool"

const Resume = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { titleY, sectionRef, titleOpacity } = useSetupScrool()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 25 },
    },
  }

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-10 lg:py-20"
    >
      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="mb-20 flex flex-col items-center gap-2"
      >
        <h2 className="text-3xl leading-tight font-bold md:text-5xl">
          {t("resume.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">{t("resume.description")}</p>
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 lg:h-140 lg:grid-cols-4 lg:grid-rows-2"
      >
        <motion.div variants={item} className="lg:col-span-2 lg:row-span-1">
          <WobbleCard
            containerClassName="h-full w-full bg-primary/20 border border-white/10 backdrop-blur-xl rounded-[2rem] cursor-pointer"
            className="flex h-full flex-col justify-between p-6 sm:p-8"
            onClick={() => navigate("/experiences")}
          >
            <div className="group flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-secondary/20 p-3 text-secondary-foreground shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                    <Briefcase size={28} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary-foreground">
                      Compass UOL
                    </h3>
                    <p className="text-sm font-medium text-secondary-foreground">
                      {t("resume.blocks.company.role")}
                    </p>
                  </div>
                </div>
                <ArrowRight className="text-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-emerald-500" />
              </div>

              <p className="mt-6 text-base/6 text-foreground">
                <Trans
                  i18nKey="resume.blocks.company.description"
                  components={[
                    <span key="0" />,
                    <strong key="1" className="text-foreground" />,
                  ]}
                />
              </p>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <WobbleCard
            containerClassName="h-full w-full bg-secondary/30 border border-white/10 backdrop-blur-xl rounded-[2rem]"
            className="flex h-full flex-col p-6 sm:p-8"
          >
            <div className="mb-6 flex items-center gap-2">
              <Code2 className="text-foreground" size={24} />
              <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                {t("resume.blocks.skills.title")}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                "React",
                "TypeScript",
                "Next.js",
                "Framer Motion",
                "Tailwind CSS",
                "Zustand",
              ].map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
            <p className="text-md/relaxed mt-auto pt-6 text-muted-foreground">
              {t("resume.blocks.skills.description")}
            </p>
          </WobbleCard>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-1 lg:row-span-1">
          <WobbleCard
            containerClassName="h-full w-full bg-accent/10 border border-white/10 backdrop-blur-xl rounded-[2rem]"
            className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center sm:p-8"
          >
            <div className="rounded-full bg-secondary/20 p-4 text-foreground shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <Award size={32} />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {t("resume.blocks.education.certification")}
              </p>
              <p className="text-lg font-bold text-foreground">
                {t("resume.blocks.education.current-certification")}
              </p>
            </div>
            <div className="h-px w-full bg-white/10" />
            <div className="space-y-1">
              <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                {t("resume.blocks.education.title")}
              </p>
              <p className="text-base font-bold text-foreground">
                {t("resume.blocks.education.description")}
              </p>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-2">
          <WobbleCard
            containerClassName="h-full w-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl rounded-[2rem] cursor-pointer"
            className="flex h-full flex-col p-6 sm:p-8"
            onClick={() => navigate("/projects/one-pace-hub")}
          >
            <div className="group flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="text-muted-foreground" size={20} />
                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                      {t("resume.blocks.projects.title")}
                    </span>
                  </div>
                  <ArrowRight className="text-emerald-500/50 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-emerald-400" />
                </div>
                <h3 className="text-2xl font-bold text-foreground">
                  {t("resume.blocks.projects.project-title")}
                </h3>
                <p className="mt-3 text-base/6 text-muted-foreground">
                  {t("resume.blocks.projects.description")}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <Badge variant="outline">Cloudflare</Badge>
                <Badge variant="outline">GitHub Actions</Badge>
                <Badge variant="outline">React</Badge>
              </div>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-1 lg:row-span-1">
          <WobbleCard
            containerClassName="h-full w-full bg-primary/25 border border-white/10 backdrop-blur-xl rounded-[2rem] overflow-hidden"
            className="flex h-full flex-col items-center justify-center p-6 sm:p-8"
          >
            <div className="relative z-20 flex w-full flex-col gap-4">
              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("/projects")
                }}
                className="group relative flex h-14 w-full items-center justify-between rounded-2xl border border-transparent bg-white/5 px-6 text-sm font-bold tracking-widest text-foreground uppercase transition-all hover:border-emerald-500/30 hover:bg-emerald-500/20 hover:text-emerald-400"
              >
                <span>{t("resume.blocks.btn.show-projects")}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>

              <Button
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation()
                  navigate("/experiences")
                }}
                className="group relative flex h-14 w-full items-center justify-between rounded-2xl border border-transparent bg-white/5 px-6 text-sm font-bold tracking-widest text-foreground uppercase transition-all hover:border-accent/30 hover:bg-accent/20 hover:text-accent"
              >
                <span>{t("resume.blocks.btn.portifolio")}</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </div>

            <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-accent/10 blur-3xl" />
          </WobbleCard>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Resume
