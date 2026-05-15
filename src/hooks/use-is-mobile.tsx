import { useEffect, useState } from "react"

/**
 * Hook para detectar se a viewport atual é mobile.
 * Usa `matchMedia` para responder a mudanças de largura e é seguro para SSR.
 * @param breakpoint largura máxima (px) considerada mobile. Padrão: 768
 */
export default function useIsMobile(breakpoint = 768) {
  const ssrDefault = false
  const [isMobile, setIsMobile] = useState<boolean>(() => {
    if (typeof window === "undefined") return ssrDefault
    return window.innerWidth < breakpoint
  })

  useEffect(() => {
    if (typeof window === "undefined") return

    const mqQuery = `(max-width: ${breakpoint - 1}px)`
    const mql = window.matchMedia(mqQuery)

    const handle = (e: MediaQueryListEvent | MediaQueryList) => {
      // MediaQueryListEvent has `matches`, older MediaQueryList also
      // works as the listener receives a MediaQueryListEvent in modern browsers
      // and MediaQueryList in some environments.
      // @ts-ignore
      setIsMobile(Boolean(e.matches))
    }

    // set initial
    setIsMobile(mql.matches)

    // add listener in a compatible way
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handle as EventListener)
      return () => mql.removeEventListener("change", handle as EventListener)
    }

    // fallback for older browsers
    if (typeof mql.addListener === "function") {
      // @ts-ignore
      mql.addListener(handle)
      return () => {
        // @ts-ignore
        mql.removeListener(handle)
      }
    }
  }, [breakpoint])

  return isMobile
}
