import { css, cx, keyframes, CSSObject } from "@emotion/css"
import { defaultTheme as theme, useTheme } from "./theme"
import { ThemeDefinition } from "./types"

export const base = xcss({ margin: 0, padding: 0 })

export const wrapper = xcss(base, (theme) => ({
  display: "block",
  maxWidth: 480,
  borderRadius: 5,
  border: `1px solid ${theme.colors["@border"]}`,
  textDecoration: "none",
  background: theme.colors["@bg"],
}))

export const text = xcss(base, (theme) => ({
  fontFamily: theme.fonts["@body"],
  fontSize: theme.fontSizes["@0"],
  color: theme.colors["@text"],
  textDecoration: "none",
  WebkitFontSmoothing: "antialiased",
  MozOsxFontSmoothing: "grayscale",
}))

export const textMono = xcss(text, (theme) => ({
  fontFamily: theme.fonts["@mono"],
}))

export const media = xcss(base, { maxWidth: "100%", objectFit: "contain" })

const pulse = keyframes({
  "0%": { opacity: 0.3 },
  "10%": { opacity: 1 },
  "100%": { opacity: 0.3 },
})

export const loadingBox = xcss(base, (theme) => ({
  borderRadius: 5,
  minHeight: 16,
  backgroundColor: theme.colors["@text-light"],
  animation: `${pulse} 2s infinite linear`,
}))
