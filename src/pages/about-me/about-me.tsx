import { useState } from "react"
import { motion, type Variants } from "motion/react"
import { useTranslation, Trans } from "react-i18next"
import { Award, MoveDown, ArrowUpRight } from "lucide-react"
import { WobbleCard } from "@/components/ui/wobble-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import emailjs from "@emailjs/browser"
import useSetupScrool from "@/hooks/use-setup-scrool/use-setup-scrool"
import { toast } from "sonner"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button"

const item: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 250, damping: 25 },
  },
}

const AboutContact = () => {
  const { t } = useTranslation()
  const { sectionRef } = useSetupScrool()
  const [isSending, setIsSending] = useState(false)
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      subject: form.subject,
      message: form.message,
    }

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey)
      toast("Tudo certo!", {
        description:
          "E-mail enviado com sucesso. Vou ler e responder o mais rápido possível.",
      })
      setForm({ name: "", email: "", subject: "", message: "" })
    } catch (error) {
      console.error("Erro ao enviar:", error)
      alert("Falha ao enviar e-mail. Tente novamente.")
    } finally {
      setIsSending(false)
    }
  }
  return (
    <section
      className="relative mx-auto w-full max-w-7xl px-6 py-24 lg:py-32"
      ref={sectionRef}
    >
      <motion.div
        initial={{ opacity: 0, x: -80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex w-full justify-center"
      >
        <h2 className="mb-10 text-3xl leading-tight font-bold md:text-5xl">
          {t("about.title")}
        </h2>
      </motion.div>

      <div className="mb-[30%] grid grid-cols-1 gap-3 lg:grid-cols-12 lg:grid-rows-2">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="lg:col-span-4 lg:row-span-2"
        >
          <WobbleCard containerClassName="h-full bg-primary/20 border-white/10 rounded-[2.5rem] overflow-hidden">
            <div className="relative flex h-full flex-col items-center justify-end">
              <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
              <img
                src="https://res.cloudinary.com/dxerrpspz/image/upload/v1778250217/pedro-perfil_xrsaoq.jpg"
                alt="Pedro Souza"
                className="absolute inset-0 z-0 h-full w-full object-cover object-top grayscale-[0.3] transition-all duration-700 hover:scale-110 hover:grayscale-0"
              />
              <div className="absolute bottom-6 z-20 text-center">
                <h3 className="text-xl font-bold text-white">Pedro Souza</h3>
                <p className="text-xs font-semibold tracking-widest text-emerald-400 uppercase">
                  Front-end Engineer
                </p>
              </div>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="lg:col-span-8 lg:row-span-1"
        >
          <WobbleCard containerClassName="h-full bg-secondary/40 border-white/10 rounded-[2.5rem] ">
            <div className="p-5">
              <div className="text-md space-y-3 leading-relaxed text-muted-foreground">
                <p>
                  <Trans
                    i18nKey="about.description"
                    components={[
                      <strong key="1" className="text-foreground" />,
                    ]}
                  />
                </p>
              </div>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div variants={item} className="lg:col-span-5 lg:row-span-1">
          <WobbleCard
            containerClassName="h-full w-full bg-accent/10 border border-white/10 backdrop-blur-xl rounded-[2rem]"
            className="flex h-full flex-col items-center justify-center gap-3 p-4 text-center"
          >
            <div className="rounded-full bg-secondary/20 p-3 text-foreground">
              <Award size={24} />
            </div>
            <div className="space-y-0.5">
              <p className="text-md font-bold tracking-wider text-muted-foreground uppercase">
                {t("resume.blocks.education.certification")}
              </p>
              <p className="text-base font-bold text-foreground">
                {t("resume.blocks.education.current-certification")}
              </p>
            </div>
            <div className="h-px w-2/3 bg-white/10" />
            <div className="space-y-0.5">
              <p className="text-md font-bold tracking-wider text-muted-foreground uppercase">
                {t("resume.blocks.education.title")}
              </p>
              <p className="text-base font-bold text-foreground">
                {t("resume.blocks.education.description")}
              </p>
            </div>
          </WobbleCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="lg:col-span-3 lg:row-span-1"
        >
          <div className="flex h-full flex-col gap-3">
            <a
              href="https://github.com/iShouldz"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-3 rounded-[2rem] border border-white/10 bg-white/5 transition-all hover:border-emerald-500/30 hover:bg-white/10"
            >
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
              <span className="text-[10px] font-bold tracking-widest uppercase">
                GitHub
              </span>
              <ArrowUpRight />
            </a>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-[40%] left-[-10%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 1.5 }}
          className="flex flex-col-reverse items-center gap-2 text-sm text-muted-foreground md:inline-flex"
        >
          {t("landing-page.home.front-page.scroll_down")}
          <MoveDown size={42} />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16 w-full"
      >
        <div className="mx-auto rounded-[2.5rem] border border-white/10 bg-background/30 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="mb-8 space-y-2 text-center">
            <h2 className="flex items-center justify-center gap-3 text-3xl font-bold text-foreground md:text-4xl">
              {t("about.form.title")}
            </h2>
            <p className="text-muted-foreground">
              {t("about.form.description")}
            </p>
          </div>

          <form onSubmit={sendEmail} className="mx-auto max-w-2xl space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-2 text-left">
                <label className="ml-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  {t("about.form.name.label")}
                </label>
                <Input
                  placeholder={t("about.form.name.placeholder")}
                  type="email"
                  className="h-12 rounded-2xl border-white/10 bg-primary/20 px-4 focus:border-emerald-500/50"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 text-left">
                <label className="ml-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                  {t("about.form.subject.label")}
                </label>
                <Input
                  placeholder={t("about.form.subject.placeholder")}
                  className="h-12 rounded-2xl border-white/10 bg-primary/20 px-4 focus:border-emerald-500/50"
                  value={form.subject}
                  onChange={(e) => {
                    setForm({ ...form, subject: e.target.value })
                  }}
                  required
                />
              </div>
            </div>

            <div className="space-y-2 text-left">
              <label className="ml-2 text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {t("about.form.message.label")}
              </label>
              <Textarea
                placeholder={t("about.form.message.placeholder")}
                className="min-h-37.5 resize-none rounded-2xl border-white/10 bg-primary/20 p-4 focus:border-emerald-500/50"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>

            <InteractiveHoverButton
              type="submit"
              className="w-full"
              disabled={isSending}
            >
              {t("about.form.btn.send-email", {
                context: isSending ? "isSending" : undefined,
              })}
            </InteractiveHoverButton>
          </form>
        </div>
      </motion.div>
    </section>
  )
}

export default AboutContact
