import { cn } from "./lib/utils"
import { MagicCard } from "./components/ui/magic-card"
import { ArrowDown, ArrowLeft, ArrowUp } from "lucide-react"
import Text3DFlip from "./components/ui/text-3d-flip"
import { InteractiveHoverButton } from "./components/ui/interactive-hover-button"
import { RetroGrid } from "./components/ui/retro-grid"
import { LineShadowText } from "./components/ui/line-shadow-text"
import { DiaTextReveal } from "./components/ui/dia-text-reveal"

export function App() {
  return (
    <div className="relative h-screen w-full overflow-hidden rounded-lg border bg-background">
      <RetroGrid
        // height={90}
        // width={90}
        className={cn(
          "mask-[radial-gradient(700px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        )}
      />

      <div className="absolute top-0">
        <MagicCard
          className="h-40 w-100 rounded-2xl"
          surfaceClassName="bg-primary"
          gradientColor="var(--secondary)"
        >
          <div className="flex h-40 w-100 flex-col items-center justify-center">
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              Sobre mim <ArrowUp size={32} />
            </p>
          </div>
        </MagicCard>
      </div>

      <div className="absolute top-0 right-0">
        <MagicCard
          className="h-40 w-100 rounded-2xl"
          surfaceClassName="bg-primary"
          gradientColor="var(--secondary)"
        >
          <div className="flex h-40 w-100 flex-col items-center justify-center">
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              Contato <ArrowLeft size={32} />
            </p>
          </div>
        </MagicCard>
      </div>

      <div className="absolute bottom-0">
        <Text3DFlip
          className="bg-transparent text-[10rem] font-bold"
          textClassName="bg-transparent text-foreground"
          flipTextClassName="bg-transparent text-foreground"
          rotateDirection="top"
        >
          Pedro
        </Text3DFlip>
        <div className="flex gap-4">
          <InteractiveHoverButton
            className="flex h-80 w-150 items-center gap-2 rounded-4xl bg-primary text-2xl font-bold text-foreground transition-[width,transform,box-shadow] duration-300"
            hoverTextClassName="text-accent-foreground"
            indicatorClassName="bg-secondary"
            // expandClassName="hover:w-[31rem] hover:shadow-xl"
          >
            Projetos
          </InteractiveHoverButton>
          <div className="flex flex-col items-center justify-center">
            <Text3DFlip
              className="bg-transparent text-[10rem]"
              textClassName="bg-transparent text-foreground"
              flipTextClassName="bg-transparent text-foreground"
              rotateDirection="top"
            >
              Souza
            </Text3DFlip>
            <DiaTextReveal
              className="items-end align-baseline text-4xl font-bold tracking-tight"
              text="Front-end Engineer"
              colors={["#A97CF8", "#F38CB8", "#FDCC92"]}
            />
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0 flex items-end">
        {/* <p className="text-9xl">Pedro</p> */}

        <MagicCard
          className="h-120 w-100 rounded-2xl bg-primary"
          surfaceClassName="bg-secondary"
          gradientColor="var(--primary)"
        >
          <div className="flex h-120 w-100 flex-col items-center justify-center">
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              Experiencias <ArrowDown size={32} />
            </p>
          </div>
        </MagicCard>
      </div>
    </div>
  )
}

export default App
