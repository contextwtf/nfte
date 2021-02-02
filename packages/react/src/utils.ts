export function toTrimmedAddress(value: string) {
  if (!value) return ""
  return value.substr(0, 6) + "…" + value.substr(value.length - 4, value.length)
}

export function isAddress(value: string) {
  return value?.startsWith("0x")
}

export function cx(classNames: unknown[]) {
  return classNames.filter(Boolean).join(" ")
}

export function tsFormat(value: string) {
  const dateObj = new Date(parseInt(value) * 1000)
  const year = dateObj.getUTCFullYear()
  const month = dateObj.getUTCMonth() + 1
  const date = dateObj.getUTCDate()
  const hour = dateObj.getUTCHours()
  const mins = dateObj.getUTCMinutes()
  return `${String(date).padStart(2, "0")}/${String(month).padStart(
    2,
    "0"
  )}/${year} ${String(hour).padStart(2, "0")}:${String(mins).padStart(2, "0")}`
}
