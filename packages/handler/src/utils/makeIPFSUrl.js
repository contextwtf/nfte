import { cid } from "is-ipfs"

export default function makeIPFSUrl(
  url,
  ipfsHost = "https://gateway.pinata.cloud/ipfs/"
) {
  if (cid(url)) return `${ipfsHost}${url}`

  const urlObject = new URL(url)

  return `https://gateway.pinata.cloud/ipfs/${urlObject.pathname.replace(
    /^\//,
    ""
  )}`
}
