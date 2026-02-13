import * as React from "react"

export function useIsMobile() {
  // Start with a default (false), then update immediately on mount
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Check right now
    checkSize()

    // Listen for window resizing (like rotating a phone)
    window.addEventListener("resize", checkSize)
    
    return () => window.removeEventListener("resize", checkSize)
  }, [])

  return isMobile
}