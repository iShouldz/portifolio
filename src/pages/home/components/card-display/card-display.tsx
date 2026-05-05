import { motion } from "motion/react"
import { WobbleCard } from "@/components/ui/wobble-card"

const CardDisplay = ({ cardsRef, cardsLift, cardsSkew }: any) => {
  return (
    <section
      ref={cardsRef}
      className="max-w-8xl relative mx-auto mb-4 flex flex-col gap-5"
    >
      <motion.div
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div>
          <p className="text-xs tracking-[0.5em] text-muted-foreground uppercase">
            Então
          </p>
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            Vamos começar, me conheça.
          </h2>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-8xl mx-auto grid w-full grid-cols-1 gap-4 px-4 sm:px-6 lg:grid-cols-4 lg:px-10"
      >
        <WobbleCard containerClassName="col-span-1 lg:col-span-1 lg:row-span-2 bg-secondary min-h-[320px] lg:min-h-[560px] rounded-[2.5rem]">
          <div className="flex h-full w-full flex-col justify-between p-6">
            <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
              Projetos
            </h2>
            <div className="flex">
              <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                Conheça alguns projetos que desenvolvi ao longo da minha
                trajetória, desde projetos pessoais até projetos para comunidade
                Open Source.
              </p>
              <p className="mt-4 text-left text-4xl">→</p>
            </div>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-start-2 lg:col-span-2 bg-primary/20 min-h-[320px] lg:min-h-[360px]">
          <div className="p-6">
            <h2 className="text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
              Experiências
            </h2>
            <div className="flex">
              <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                Conheça minhas experiências profissionais, onde trabalhei e o
                que aprendi.
              </p>
              <p className="mt-4 text-left text-4xl">→</p>
            </div>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-span-1 min-h-[320px] lg:min-h-[360px] bg-secondary">
          <div className="p-6">
            <h2 className="max-w-80 text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
              Contato
            </h2>
            <div className="flex">
              <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                Me chame para trabalhos, colaborações e oportunidades.{" "}
              </p>
              <p className="mt-4 text-left text-4xl">→</p>
            </div>
          </div>
        </WobbleCard>

        <WobbleCard containerClassName="col-span-1 lg:col-start-2 lg:col-span-3 bg-accent min-h-[160px] lg:min-h-[220px]">
          <div className="flex max-w-sm flex-col justify-between p-6">
            <h2 className="max-w-80 text-left text-base font-semibold tracking-[-0.015em] text-balance text-foreground md:text-xl lg:text-3xl">
              Sobre mim
            </h2>
            <div className="flex">
              <p className="mt-4 max-w-104 text-left text-base/6 text-secondary-foreground">
                Conheça um pouco da pessoa por trás do desenvolvedor.
              </p>
              <p className="mt-4 text-left text-4xl">→</p>
            </div>
          </div>
        </WobbleCard>
      </motion.div>
    </section>
  )
}

export default CardDisplay
