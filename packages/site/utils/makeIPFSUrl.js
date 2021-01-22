export default function makeIPFSUrl(url) {
  const urlObject = new URL(url)

  const IPFSUrl = `https://gateway.pinata.cloud/ipfs/${urlObject.pathname}`

  return IPFSUrl
}
