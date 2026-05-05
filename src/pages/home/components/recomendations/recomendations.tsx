import { Marquee } from "@/components/ui/marquee"
import { motion } from "motion/react"
import Card from "../card/card"
import type { ICard } from "../../types"
import React from "react"

const Recomendations = ({ cardsLift, cardsSkew }: any) => {
  const reviews: ICard[] = [
    {
      name: "Marcos Lopes",
      description: "Product Designer | UX/UI Designer | Design System",
      body: "Tive a oportunidade de atuar ao lado do Pedro em um projeto de extrema complexidade, e ele se destacou não apenas por sua proatividade, mas também por sua excelência como desenvolvedor. Sua velocidade de entrega é impressionante, sempre mantendo um alto nível de qualidade. Além disso, possui um olhar apurado para usabilidade, garantindo que cada solução seja funcional e intuitiva. Tivemos inúmeras conversas sobre fluxos e a escolha dos melhores componentes para diferentes cenários, o que demonstra seu comprometimento com a experiência do usuário. Pedro também é um profissional extremamente colaborativo, sempre bem-humorado e contribuindo para um ambiente de trabalho leve e produtivo.",
      username: "/marcos-lopes-94a77b165",
      initials: "ML",
      tone: "from-emerald-400 via-teal-400 to-cyan-500",
    },
    {
      name: "Renato Davoli",
      username: "/renatodam",
      initials: "ML",
      tone: "from-emerald-400 via-teal-400 to-cyan-500",
      body: "Excelente desenvolvedor. Tive a oportunidade de participar do mesmo projeto que ele, no qual se destacou pela agilidade, qualidade do código, ótima comunicação e compartilhamento de conhecimento entre os colegas. Nosso projeto teve diversos pontos críticos onde o conhecimento e agilidade do Pedro foram essenciais para conseguirmos atingir nossos objetivos.",
      description:
        "Software Developer | Salesforce Developer | Java | Kotlin | Node | Spring | Micronaut | React | QA | Automation | 1x AWS | 1x Salesforce Certified",
    },
    {
      name: "Pedro Henrique Goes",
      username: "/pedro-henrique-ntgoes",
      body: "Tive o privilégio de trabalhar com o Pedro em minha primeira experiência profissional. Desde o início, mostrou-se bastante dedicado e aberto para conversas e discussões a respeito dos mais diversos assuntos. Ao longo deste período, manteve um ritmo acelerado em suas entregas, sendo bastante eficiente e servindo de reforço para auxiliar os outros colegas. Pude contar com seu conhecimento no front-end para entender telas e interfaces para me guiar quanto às necessidades do sistema. Além disso, seu comportamento descontraído tornava o ambiente de trabalho mais leve para todos do grupo, amenizando as dificuldades e imprevistos que encontrávamos ao longo do projeto.",
      description:
        "Backend Developer | Spring Boot | Node.js | Mobile Developer | React Native | Bacharel em Engenharia da Computação/UFES",
      initials: "PH",
      tone: "from-sky-400 via-blue-400 to-indigo-500",
    },
    {
      name: "Amanda Castro",
      username: "/amanda-n-castro",
      description:
        "Full Stack Engineer | React | Node | Java | UX/UI Designer | Content Creator",
      initials: "AC",
      body: "Pedro é um excelente desenvolvedor e um profissional muito proativo. Ele consegue realizar tasks de forma rápida e ainda manter a qualidade. Pessoalmente, ele é um profissional muito fácil de lidar, extremamente focado e organizado com suas responsabilidades e consegue trazer leveza para o ambiente de trabalho. Foi excelente colaborar com ele.",
      tone: "from-fuchsia-400 via-pink-400 to-rose-500",
    },
  ]
  const firstRow = reviews.slice(0, reviews.length / 2)
  return (
    <div className="relative mt-20 mb-20 flex w-full flex-col items-center justify-center gap-8 overflow-hidden">
      <motion.div
        style={{ y: cardsLift, rotateX: cardsSkew, transformPerspective: 1200 }}
        className="mb-8 flex flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-end md:justify-between lg:px-10"
      >
        <div>
          <h2 className="mt-3 text-3xl leading-tight font-bold md:text-5xl">
            Algumas recomendações de colegas.
          </h2>
        </div>
      </motion.div>

      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <Card {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-linear-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-linear-to-l from-background"></div>
    </div>
  )
}

export default Recomendations
