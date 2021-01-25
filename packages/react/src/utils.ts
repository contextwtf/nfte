export function toTrimmedAddress(value: string) {
  if (!value) return ""
  return value.substr(0, 6) + "…" + value.substr(value.length - 4, value.length)
}

export function isUrl(value: string) {
  try {
    new URL(value)
    return true
  } catch (error) {
    return false
  }
}

export function isAddress(value: string) {
  return value.startsWith("0x")
}

export function cx(classNames: unknown[]) {
  return classNames.filter(Boolean).join(" ")
}
