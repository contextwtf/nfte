import { useEffect } from "react"
import { useRouter } from "next/router"
import * as Fathom from "fathom-client"
import { css } from "stitches.config"

css.global({
  body: {
    padding: 0,
    margin: 0,
    fontFamily: "@body",
    fontSize: "@1",
    lineHeight: 1.4,
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  },
})

export default function App({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load("CUOXTDGQ", {
      excludedDomains: ["localhost"],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
    }
    // Record a pageview when route changes
    router.events.on("routeChangeComplete", onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off("routeChangeComplete", onRouteChangeComplete)
    }
  }, [])

  return <Component {...pageProps} />
}
