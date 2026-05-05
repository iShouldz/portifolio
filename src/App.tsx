import { InteractiveGridPattern } from "./components/ui/interactive-grid-pattern"
import { cn } from "./lib/utils"
import { MagicCard } from "./components/ui/magic-card"
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from "lucide-react"
import Text3DFlip from "./components/ui/text-3d-flip"
import { InteractiveHoverButton } from "./components/ui/interactive-hover-button"
import { RetroGrid } from "./components/ui/retro-grid"

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
          className="h-40 w-100 rounded-4xl"
          surfaceClassName="bg-primary"
          gradientColor="var(--secondary)"
        >
          <div className="flex h-40 w-100 flex-col items-center justify-center rounded-[inherit]">
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              Sobre mim <ArrowUp size={32} />
            </p>
          </div>
        </MagicCard>
      </div>

      <div className="absolute top-0 right-0">
        <MagicCard
          className="h-40 w-100 rounded-4xl"
          surfaceClassName="bg-primary"
          gradientColor="var(--secondary)"
        >
          <div className="flex h-40 w-100 flex-col items-center justify-center rounded-[inherit]">
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              Contato <ArrowLeft size={32} />
            </p>
          </div>
        </MagicCard>
      </div>

      <div className="absolute bottom-0">
        <Text3DFlip
          className="bg-background text-9xl"
          textClassName="bg-background text-foreground"
          flipTextClassName="bg-background text-foreground"
          rotateDirection="top"
        >
          Pedro
        </Text3DFlip>
        <InteractiveHoverButton className="flex items-center gap-2 text-2xl font-bold text-foreground h-60 w-120 rounded-4xl">
          {/* <MagicCard
            className="h-60 w-120 rounded-4xl"
            surfaceClassName="bg-primary"
            gradientColor="var(--secondary)"
          >
            <div className="flex h-60 w-full flex-col items-center justify-center rounded-[inherit]"> 
            <p className="flex items-center gap-2 text-2xl font-bold text-foreground">
              
            </p>
            </div>
          </MagicCard>
           */}Projetos
            {/* <ArrowRight size={32} /> */}
        </InteractiveHoverButton>
      </div>

      <div className="absolute right-0 bottom-0">
        {/* <p className="text-9xl">Pedro</p> */}
        <MagicCard
          className="h-120 w-100 rounded-4xl bg-primary"
          surfaceClassName="bg-secondary"
          gradientColor="var(--primary)"
        >
          <div className="flex h-120 w-100 flex-col items-center justify-center rounded-[inherit]">
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
