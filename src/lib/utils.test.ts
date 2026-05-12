import { describe, expect, it } from "vitest"
import { cn } from "@/lib/utils"

describe("cn", () => {
  it("merges classes and keeps the last conflicting utility", () => {
    expect(cn("px-2", "px-4", "text-sm")).toBe("px-4 text-sm")
  })

  it("filters falsy values and preserves non-conflicting classes", () => {
    expect(cn("base", false, null, undefined, "extra")).toBe("base extra")
  })
})
