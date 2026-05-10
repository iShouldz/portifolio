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

export interface ICardDisplayProps {
  cardsSkew: MotionValue<number>
  cardsLift: MotionValue<number>
  cardsRef: React.RefObject<HTMLElement | null>
}

export interface IFrontPageComponentProps {
  introRef: React.RefObject<HTMLElement | null>
  heroScale: MotionValue<number>
}
