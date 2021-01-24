import { cid } from "is-ipfs"

export default function makeIPFSUrl(url) {
  if (cid(url)) return `https://gateway.pinata.cloud/ipfs/${url}`

  const urlObject = new URL(url)

  const IPFSUrl = `https://gateway.pinata.cloud/ipfs/${urlObject.pathname}`

  return IPFSUrl
}
