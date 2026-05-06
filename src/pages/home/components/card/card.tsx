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
            <p className="text-xs font-light text-muted-foreground flex gap-2 items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-linkedin"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
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
