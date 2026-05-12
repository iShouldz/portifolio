import "@testing-library/jest-dom/vitest"
import React from "react"
import { vi } from "vitest"

const mockProjects = [
  {
    id: "portifolio",
    title: "Portifolio",
    description: "Portfolio description",
    githubUrl: "https://github.com/iShouldz/portifolio",
    img: "https://example.com/cover.png",
    tecnologies: ["React", "TypeScript"],
    tags: ["Web"],
    resources: [
      {
        type: "feature",
        title: "Feature A",
        description: "Feature description",
      },
      {
        type: "product",
        title: "Product A",
        description: "Product description",
      },
    ],
  },
  {
    id: "no-image",
    title: "No Image",
    description: "No image description",
    githubUrl: "https://github.com/iShouldz/no-image",
    tecnologies: ["React"],
    tags: ["UI"],
    resources: [],
  },
]

const mockExperiences = [
  {
    company: "Example Co",
    role: "Frontend",
    period: "2024",
    location: "Remote",
    description: "Did things",
    tech: ["React"],
  },
]

const mockRecommendations = [
  {
    name: "Alice",
    description: "Great collaborator",
    body: "Delivered strong work.",
    username: "alice-dev",
    initials: "AL",
    tone: "emerald",
  },
  {
    name: "Bruno",
    description: "Reliable engineer",
    body: "Always helpful.",
    username: "bruno-code",
    initials: "BR",
    tone: "amber",
  },
  {
    name: "Carla",
    description: "Fast learner",
    body: "Improved the team a lot.",
    username: "carla-ui",
    initials: "CA",
    tone: "blue",
  },
  {
    name: "Diego",
    description: "Solid delivery",
    body: "Consistent and accurate.",
    username: "diego-dev",
    initials: "DI",
    tone: "rose",
  },
]

vi.mock("react-i18next", () => {
  return {
    useTranslation: () => ({
      t: (
        key: string,
        options?: { returnObjects?: boolean; context?: string }
      ) => {
        if (key === "projects.list" && options?.returnObjects)
          return mockProjects
        if (key === "experiences.experiences-list" && options?.returnObjects) {
          return mockExperiences
        }
        if (
          key === "landing-page.recomendations.list" &&
          options?.returnObjects
        ) {
          return mockRecommendations
        }
        if (key === "project-details.details" && options?.returnObjects) {
          return {
            features: "features",
            "tecnical-details": "tecnical-details",
            tecnologies: "tecnologies",
            tags: "tags",
            comments: "comments",
            links: "links",
          }
        }
        if (options?.context) return `${key}:${options.context}`
        return key
      },
      i18n: { changeLanguage: vi.fn() },
    }),
    Trans: ({ i18nKey }: { i18nKey: string }) => <span>{i18nKey}</span>,
  }
})

vi.mock("motion/react", async () => {
  const react = await import("react")
  const motionProxy = new Proxy(
    {},
    {
      get: (_, tag: string) =>
        react.forwardRef(({ children, ...props }: any, ref) =>
          react.createElement(tag, { ref, ...props }, children)
        ),
    }
  )

  return {
    motion: motionProxy,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 0,
  }
})

vi.mock("react-router", async (importOriginal) => {
  const actual = await importOriginal<any>()
  return {
    ...actual,
    Outlet: () => <div data-testid="outlet" />,
    useNavigate: () => vi.fn(),
    useParams: vi.fn(),
  }
})

vi.mock("@/hooks/use-setup-scrool/use-setup-scrool", () => ({
  default: () => ({
    titleY: 0,
    titleOpacity: 1,
    sectionRef: { current: null },
  }),
}))

vi.mock("@/hooks/use-github/use-github", () => ({
  getGithubRepos: vi.fn(() => ({})),
  getRepoDetailedStats: vi.fn(() => Promise.resolve({})),
}))

vi.mock("@emailjs/browser", () => ({
  default: {
    send: vi.fn(),
  },
}))

vi.mock("sonner", () => ({
  toast: vi.fn(),
}))

vi.mock("lenis/react", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="lenis">{children}</div>
  ),
  useLenis: vi.fn(),
}))

vi.mock("@/components/scrool-to-top/scrool-to-top", () => ({
  default: () => null,
}))

vi.mock("@/components/ui/scroll-progress", () => ({
  ScrollProgress: ({ className }: { className?: string }) => (
    <div data-testid="scroll-progress" className={className} />
  ),
}))

vi.mock("@/components/ui/dock", () => ({
  Dock: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dock">{children}</div>
  ),
  DockIcon: ({
    children,
    onClick,
  }: {
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
}))

vi.mock("@/components/ui/tooltip", () => ({
  Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  TooltipTrigger: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  TooltipContent: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}))

vi.mock("@/components/ui/dropdown-menu", () => ({
  DropdownMenu: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
  DropdownMenuContent: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuGroup: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuItem: ({
    children,
    onClick,
  }: {
    children: React.ReactNode
    onClick?: () => void
  }) => (
    <button type="button" onClick={onClick}>
      {children}
    </button>
  ),
  DropdownMenuLabel: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  DropdownMenuTrigger: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

vi.mock("@/components/ui/animated-theme-toggler", () => ({
  AnimatedThemeToggler: () => <div data-testid="theme-toggler" />,
}))

vi.mock("@/components/ui/separator", () => ({
  Separator: () => <div data-testid="separator" />,
}))

vi.mock("@/components/ui/wobble-card", () => ({
  WobbleCard: ({ children, ...props }: { children: React.ReactNode }) => (
    <div data-testid="wobble-card" {...props}>
      {children}
    </div>
  ),
}))

vi.mock("@/components/ui/interactive-hover-button", () => ({
  InteractiveHoverButton: ({
    children,
    ...props
  }: React.ComponentProps<"button">) => (
    <button type="button" {...props}>
      {children}
    </button>
  ),
}))

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

globalThis.ResizeObserver = ResizeObserverMock as typeof ResizeObserver

globalThis.IntersectionObserver = class {
  observe = vi.fn()
  unobserve = vi.fn()
  disconnect = vi.fn()
  root = null
  rootMargin = ""
  scrollMargin = ""
  thresholds = []
  takeRecords = vi.fn()
} as any

globalThis.matchMedia = (query: string) => ({
  matches: false,
  media: query,
  onchange: null,
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  addListener: vi.fn(),
  removeListener: vi.fn(),
  dispatchEvent: vi.fn(),
})
