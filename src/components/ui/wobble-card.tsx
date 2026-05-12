"use client"
import React from "react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { cn } from "@/lib/utils"

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  onClick,
}: {
  children: React.ReactNode
  containerClassName?: string
  className?: string
  onClick?: () => void
}) => {
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const hover = useMotionValue(0)

  const smoothX = useSpring(mvX, { stiffness: 300, damping: 30 })
  const smoothY = useSpring(mvY, { stiffness: 300, damping: 30 })
  const invX = useTransform(smoothX, (v: number) => -v)
  const invY = useTransform(smoothY, (v: number) => -v)
  const scale = useTransform(hover, (v: number) => (v ? 1.03 : 1) as number)
  const smoothScale = useSpring(scale, { stiffness: 250, damping: 25 })

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - (rect.left + rect.width / 2)) / 20
    const y = (event.clientY - (rect.top + rect.height / 2)) / 20
    mvX.set(x)
    mvY.set(y)
  }

  return (
    <motion.section
      onMouseMove={handleMouseMove}
      onClick={onClick}
      onMouseEnter={() => hover.set(1)}
      onMouseLeave={() => {
        hover.set(0)
        mvX.set(0)
        mvY.set(0)
      }}
      style={{ x: smoothX, y: smoothY }}
      className={cn(
        "relative mx-auto w-full overflow-hidden rounded-2xl",
        containerClassName
      )}
    >
      <div
        className="relative h-full overflow-hidden sm:mx-0 sm:rounded-2xl"
        style={{
          boxShadow:
            "0 10px 32px rgba(34, 42, 53, 0.12), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.05), 0 4px 6px rgba(34, 42, 53, 0.08), 0 24px 108px rgba(47, 48, 55, 0.10)",
        }}
      >
        <motion.div
          style={{ x: invX, y: invY, scale: smoothScale }}
          className={cn("h-full px-4 py-20 sm:px-10", className)}
        >
          <Noise />
          {children}
        </motion.div>
      </div>
    </motion.section>
  )
}

const Noise = () => {
  return (
    <div
      className="absolute inset-0 h-full w-full scale-[1.2] transform [mask-image:radial-gradient(#fff,transparent,75%)] opacity-10"
      style={{
        backgroundImage: "url(/noise.webp)",
        backgroundSize: "30%",
      }}
    ></div>
  )
}
