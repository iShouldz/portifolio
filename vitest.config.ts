import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

const pageCoverageInclude = ["src/**/*.tsx"]

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.tsx",
    globals: true,
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: pageCoverageInclude,
      exclude: [
        "src/main.tsx",
        "src/routes.tsx",
        "src/components/ui",
        "src/vitest.config.ts",
        "src/components/theme-provider.tsx",
      ],
      thresholds: {
        lines: 90,
        statements: 90,
        functions: 90,
        branches: 90,
      },
    },
  },
})
