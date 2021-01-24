import { cid } from "is-ipfs"

export default function isIPFS(url) {
  try {
    if (cid(url)) return true
    const { protocol } = new URL(url)
    return protocol === "ipfs:"
  } catch (error) {
    return false
  }
}
