import { motion } from "motion/react"
import type { IExperiencesListProps } from "../types"
import { Briefcase, Building2, GraduationCap, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cardVariants } from "../utils/card-variant.utils"
import { Badge } from "@/components/ui/badge"

const ExperiencesList = ({ experienciesList }: IExperiencesListProps) => {
  return experienciesList.map((exp, index) => {
    const isEven = index % 2 === 0

    return (
      <motion.div
        key={index}
        custom={isEven}
        variants={cardVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className={`group relative flex flex-col items-start justify-between md:flex-row md:items-center md:odd:flex-row-reverse`}
      >
        <div className="absolute left-0 z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-background text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-transform duration-500 group-hover:scale-125 group-hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] md:left-1/2 md:-translate-x-1/2">
          {exp.icon === "academic" ? (
            <GraduationCap size={18} />
          ) : (
            <Briefcase size={18} />
          )}
        </div>

        <div className="ml-16 w-[calc(100%-4rem)] md:ml-0 md:w-[45%]">
          <Card className="overflow-hidden border-white/10 backdrop-blur-xl transition-all hover:border-emerald-500/30 hover:bg-primary-foreground/85">
            <CardContent className="p-6 sm:p-8">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Badge variant="default">{exp.period}</Badge>
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <MapPin size={14} className="text-emerald-500/70" />
                  {exp.location}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
              <p className="d mt-1 mb-6 flex items-center gap-2 text-lg font-semibold text-emerald-500">
                <Building2 />
                {exp.company}
              </p>

              <p className="mb-8 text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {exp.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {exp.tech.map((skill) => (
                  <Badge variant="secondary" key={skill}>
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    )
  })
}

export default ExperiencesList
