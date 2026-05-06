import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card"
import type { ICard } from "../../types"

const Card = ({ name, description, body, username }: ICard) => {
  return (
    <CardContainer className="inter-var">
      <CardBody className="group/card relative h-[20rem] w-[35rem] rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
        <CardItem
          translateZ="50"
          className="flex gap-2 text-xl font-bold text-neutral-600 dark:text-white"
        >
          <div>
            <p>{name}</p>
            <p className="text-xs font-light text-muted-foreground">
              {username}
            </p>
            <p className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
              {description}
            </p>
          </div>
        </CardItem>

        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300"
        >
          {body}
        </CardItem>
      </CardBody>
    </CardContainer>
  )
}

export default Card
