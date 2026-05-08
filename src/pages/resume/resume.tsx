import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { Briefcase, Code2, Award, Star, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { WobbleCard } from "@/components/ui/wobble-card"
import { useNavigate } from "react-router"

const Resume = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()

  // Animação para a entrada em cascata dos blocos
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 250, damping: 25 },
    },
  }

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-24 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-6xl">
        {/* Header Rápido */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-12 flex flex-col gap-2 border-l-4 border-emerald-500 pl-6"
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {t("summary.title", "Executive View")}
          </h1>
          <p className="max-w-2xl text-muted-foreground">
            {t(
              "summary.subtitle",
              "O essencial sobre minha trajetória e competências em 30 segundos. Interaja com os cards para explorar."
            )}
          </p>
        </motion.div>

        {/* Bento Grid com WobbleCards */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-4 lg:h-[560px] lg:grid-cols-4 lg:grid-rows-2"
        >
          {/* BLOCO 1: EXPERIÊNCIA ATUAL (Destaque) */}
          <motion.div variants={item} className="lg:col-span-2 lg:row-span-1">
            <WobbleCard
              containerClassName="h-full w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem] cursor-pointer"
              className="flex h-full flex-col justify-between p-6 sm:p-8"
              onClick={() => navigate("/experiences")}
            >
              <div className="group flex h-full flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-emerald-500/20 p-3 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground">
                        Compass UOL
                      </h3>
                      <p className="text-sm font-medium text-emerald-500">
                        Front-end Developer
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="text-muted-foreground transition-transform duration-300 group-hover:translate-x-2 group-hover:text-emerald-500" />
                </div>
                <p className="mt-6 text-base/6 text-muted-foreground">
                  Atuando na conta da{" "}
                  <strong className="text-foreground">Vivo (Telefônica)</strong>
                  , focado em arquitetura de componentes escaláveis e interfaces
                  de alta performance no ecossistema B2B/B2C.
                </p>
              </div>
            </WobbleCard>
          </motion.div>

          {/* BLOCO 2: CORE STACK */}
          <motion.div variants={item} className="lg:col-span-2">
            <WobbleCard
              containerClassName="h-full w-full bg-black/40 border border-white/10 backdrop-blur-xl rounded-[2rem]"
              className="flex h-full flex-col p-6 sm:p-8"
            >
              <div className="mb-6 flex items-center gap-2">
                <Code2 className="text-emerald-500" size={24} />
                <span className="text-sm font-bold tracking-widest text-muted-foreground uppercase">
                  Core Expertise
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
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-sm text-emerald-400"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="mt-auto pt-6 text-sm/relaxed text-muted-foreground">
                Especialista em construir experiências web fluidas com
                integrações robustas, animações baseadas em física e tipografia
                rigorosa.
              </p>
            </WobbleCard>
          </motion.div>

          {/* BLOCO 3: EDUCAÇÃO & CERTIFICAÇÃO */}
          <motion.div variants={item} className="lg:col-span-1 lg:row-span-1">
            <WobbleCard
              containerClassName="h-full w-full bg-white/5 border border-white/10 backdrop-blur-xl rounded-[2rem]"
              className="flex h-full flex-col items-center justify-center gap-6 p-6 text-center sm:p-8"
            >
              <div className="rounded-full bg-emerald-500/20 p-4 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Award size={32} />
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Certificação
                </p>
                <p className="text-lg font-bold text-foreground">
                  AWS Certified
                </p>
              </div>
              <div className="h-px w-full bg-white/10" />
              <div className="space-y-1">
                <p className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
                  Acadêmico
                </p>
                <p className="text-base font-bold text-foreground">
                  B.S. Computer Science
                </p>
              </div>
            </WobbleCard>
          </motion.div>

          {/* BLOCO 4: PROJETO DE IMPACTO */}
          <motion.div variants={item} className="lg:col-span-2">
            <WobbleCard
              containerClassName="h-full w-full bg-emerald-500/5 border border-emerald-500/20 backdrop-blur-xl rounded-[2rem] cursor-pointer"
              className="flex h-full flex-col p-6 sm:p-8"
              onClick={() => navigate("/projects/one-pace-hub")} // Ajuste o ID correto da sua rota
            >
              <div className="group flex h-full flex-col justify-between">
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="text-emerald-500" size={20} />
                      <span className="text-xs font-bold tracking-widest text-emerald-500/80 uppercase">
                        Open Source Impact
                      </span>
                    </div>
                    <ArrowRight className="text-emerald-500/50 transition-transform duration-300 group-hover:translate-x-2 group-hover:text-emerald-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    One Pace BR Hub
                  </h3>
                  <p className="mt-3 text-base/6 text-muted-foreground">
                    Desenvolvimento do ecossistema principal para a comunidade
                    brasileira, unindo engenharia de software e paixão por
                    cultura pop.
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-black/40 text-xs"
                  >
                    Cloudflare
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-black/40 text-xs"
                  >
                    GitHub Actions
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-white/10 bg-black/40 text-xs"
                  >
                    React
                  </Badge>
                </div>
              </div>
            </WobbleCard>
          </motion.div>

          {/* BLOCO 5: CTAs DE NAVEGAÇÃO */}
          <motion.div variants={item} className="lg:col-span-1">
            <div className="flex h-full flex-col gap-4">
              <Button
                onClick={() => navigate("/projects")}
                className="group flex h-1/2 w-full flex-col items-center justify-center gap-2 rounded-[2rem] bg-emerald-500 text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]"
              >
                <span className="text-lg font-bold">Ver Projetos</span>
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Button>
              <Button
                onClick={() => navigate("/experiences")}
                variant="outline"
                className="flex h-1/2 w-full flex-col items-center justify-center gap-2 rounded-[2rem] border-white/10 bg-white/5 text-foreground transition-all hover:bg-white/10 hover:text-emerald-400"
              >
                <span className="font-semibold">Trajetória Completa</span>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Resume
