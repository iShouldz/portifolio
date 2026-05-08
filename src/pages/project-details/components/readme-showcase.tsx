import { motion } from "motion/react"
import ReadmeView from "./readme-view"

interface ReadmeShowcaseProps {
  repoMeta?: any
}

const ReadmeShowcase = ({ repoMeta }: ReadmeShowcaseProps) => {
  return (
    <section className="relative py-20">
      <div className="mx-auto max-w-4xl px-4">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold md:text-4xl">Documentação</h2>
          <p className="mt-2 text-muted-foreground">
            Detalhes e informações do projeto
          </p>
        </motion.div>

        <motion.div
          className="overflow-hidden rounded-3xl border border-white/10 bg-muted-foreground backdrop-blur-xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="p-8 md:p-4">
            <ReadmeView repoMeta={repoMeta} />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default ReadmeShowcase
