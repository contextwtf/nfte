export default function isIPFS(url) {
  try {
    const { protocol } = new URL(url)
    return protocol === "ipfs:"
  } catch (error) {
    return false
  }
}
