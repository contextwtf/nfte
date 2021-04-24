import { cid } from "is-ipfs"
import remove from "lodash/remove"

export default function makeIPFSUrl(
  url,
  ipfsHost = "https://gateway.pinata.cloud/ipfs/"
) {
  if (cid(url)) return `${ipfsHost}${url}`

  const urlArray = url.split("/")
  const cidIndex = urlArray.findIndex((curr) => cid(curr))
  const newCidPath = remove(urlArray, (_, i) => i >= cidIndex).join("/")

  return `${ipfsHost}${newCidPath}`
}
