import type { MotionValue } from "motion/react"

export interface ICard {
  name: string
  description: string
  body: string
  username: string
  initials: string
  tone: string
}

export interface IRecomendationsProps {
  cardsSkew: MotionValue<number>
  cardsLift: MotionValue<number>
}
