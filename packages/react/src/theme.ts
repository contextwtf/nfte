import { css, cx, CSSObject } from "@emotion/css"
import { ThemeDefinition } from "./types"

export const defaultTheme = {
  fonts: {
    "@body":
      "ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif",
    "@mono":
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
  fontSizes: {
    "@0": "12px",
    "@1": "14px",
    "@2": "20px",
  },
  colors: {
    "@border": "#E4E4E7",
    "@bg": "#FFFFFF",
    "@text": "#181818",
    "@text-light": "#A1A1AA",
  },
  space: {
    "@0": "4px",
    "@1": "8px",
    "@2": "16px",
  },
}

export const darkTheme = {
  "@border": "#E4E4E7",
  "@bg": "#000000",
  "@text": "#FFFFFF",
  "@text-light": "#A1A1AA",
}

const xcss = (theme: ThemeDefinition) => (
  ...args: (string | CSSObject | ((theme: ThemeDefinition) => CSSObject))[]
) => {
  return cx(
    args.map(function (a) {
      if (typeof a === "string") return a
      if (typeof a === "function") return css(a(theme))
      return css(a)
    })
  )
}

const setupStyles = () => {
  let theme = defaultTheme
  return {
    changeTheme: (newTheme) => {
      theme = newTheme
    },
    xcss: xcss(theme),
  }
}
