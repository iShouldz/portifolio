import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  hoverBackgroundClassName?: string
  hoverTextClassName?: string
  indicatorClassName?: string
  expandClassName?: string
}

export function InteractiveHoverButton({
  children,
  className,
  hoverBackgroundClassName,
  hoverTextClassName,
  indicatorClassName,
  expandClassName,
  ...props
}: InteractiveHoverButtonProps) {
  return (
    <button
      className={cn(
        "group bg-background relative isolate w-auto cursor-pointer overflow-hidden rounded-full border p-2 px-6 text-center font-semibold transition-all duration-300",
        "hover:scale-[1.02]",
        expandClassName,
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 z-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100",
          hoverBackgroundClassName ?? "bg-secondary"
        )}
      />

      <div className="relative z-10 flex items-center justify-center gap-2">
        <div
          className={cn(
            "h-2 w-2 rounded-full transition-all duration-300 group-hover:scale-[100.8]",
            indicatorClassName ?? "bg-primary"
          )}
        />
        <span className="inline-block transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
          {children}
        </span>
      </div>

      <div
        className={cn(
          "absolute top-0 z-10 flex h-full w-full translate-x-12 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:-translate-x-5 group-hover:opacity-100",
          hoverTextClassName ?? "text-secondary-foreground"
        )}
      >
        <span>{children}</span>
        <ArrowRight />
      </div>
    </button>
  )
}
