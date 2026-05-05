import { motion } from "motion/react"
import { ArrowDown, Sparkles } from "lucide-react"
import { WobbleCard } from "@/components/ui/wobble-card"

const CardDisplay = ({ cardsRef, cardsLift, cardsSkew }: any) => {
  return (
    <section ref={cardsRef} className="max-w-8xl relative mx-auto">
      <motion.div
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div>
          {/* <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase">
            Blocos
          </p> */}
          <h2 className="mt-3 max-w-3xl text-3xl leading-tight font-bold md:text-5xl">
            Vamos começar, me conheça.
          </h2>
        </div>

        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          A parte importante aqui é a sensação de fluxo: Lenis suaviza a rolagem
          e o Motion controla a entrada, o deslocamento e a opacidade.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-8xl mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-3 lg:px-10"
      >
        <WobbleCard
          containerClassName="col-span-1 lg:col-span-2 h-full bg-primary min-h-[500px] lg:min-h-[300px]"
          className=""
        >
          <div className="flex h-full max-w-xs flex-col justify-between">
            <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-white md:text-xl lg:text-3xl">
              Experiências
            </h2>
            <p className="mt-4 text-left text-4xl text-neutral-200">→</p>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 min-h-[300px] bg-secondary">
          <h2 className="max-w-80 text-left text-base font-semibold tracking-[-0.015em] text-balance text-primary md:text-xl lg:text-3xl">
            No shirt, no shoes, no weapons.
          </h2>
          <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
            If someone yells “stop!”, goes limp, or taps out, the fight is over.
          </p>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-accent min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
          <div className="max-w-sm">
            <h2 className="max-w-sm text-left text-base font-semibold tracking-[-0.015em] text-balance text-white md:max-w-lg md:text-xl lg:text-3xl">
              Signup for blazing-fast cutting-edge state of the art Gippity AI
              wrapper today!
            </h2>
            <p className="mt-4 max-w-104 text-left text-base/6 text-neutral-200">
              With over 100,000 mothly active bot users, Gippity AI is the most
              popular AI platform for developers.
            </p>
          </div>
        </WobbleCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-10 flex items-center justify-between rounded-[2rem] border border-border/60 bg-background/75 px-6 py-5 text-sm text-muted-foreground shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      >
        <span className="inline-flex items-center gap-2">
          <Sparkles className="size-4" />
          Layout pensado para continuar crescendo com mais seções
        </span>
        <span className="hidden items-center gap-2 sm:inline-flex">
          <ArrowDown className="size-4" />
          Continue rolando
        </span>
      </motion.div>
    </section>
  )
}

export default CardDisplay
