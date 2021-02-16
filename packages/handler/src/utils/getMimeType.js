export default async function getMimeType(mediaUrl) {
  const res = await fetch(mediaUrl, { method: "HEAD" })
  return res.headers.get("Content-Type")
}
