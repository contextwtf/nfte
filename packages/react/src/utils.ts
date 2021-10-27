import fetch from "node-fetch"
import { cid } from "is-ipfs"
import remove from "lodash/remove"

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

export async function getMimeType(mediaUrl: string) {
  const res = await fetch(mediaUrl, { method: "HEAD" })
  return res.headers.get("Content-Type")
}

export function isIPFS(url: string) {
  try {
    if (cid(url)) return true
    const { protocol } = new URL(url)
    return protocol === "ipfs:"
  } catch (error) {
    return false
  }
}



export function makeIPFSUrl(
  url: string,
  ipfsHost = "https://gateway.pinata.cloud/ipfs/"
) {
  if (cid(url)) return `${ipfsHost}${url}`

  const urlArray = url.split("/")
  const cidIndex = urlArray.findIndex((curr) => cid(curr))
  const newCidPath = remove(urlArray, (_, i) => i >= cidIndex).join("/")

  return `${ipfsHost}${newCidPath}`
}
