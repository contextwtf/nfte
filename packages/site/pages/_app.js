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
  return <Component {...pageProps} />
}
