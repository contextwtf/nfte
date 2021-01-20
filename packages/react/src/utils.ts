export function toTrimmedAddress(value: string) {
  if (!value) return ""
  return value.substr(0, 6) + "…" + value.substr(value.length - 4, value.length)
}

const validImgExtensions = ["jpeg", "jpg", "png", "gif", "svg", "webp", "apng"]

export function isImage(url: string) {
  if (!url) return false
  const mediaUrl = new URL(url)
  const fileExtension = mediaUrl.pathname.split(".").pop()
  if (!fileExtension) return false
  return validImgExtensions.includes(fileExtension)
}

export function fileExtension(url: string) {
  if (!url) return null

  const mediaUrl = new URL(url)
  return mediaUrl.pathname.split(".").pop()
}

export function creatorName({
  ensName,
  name,
  address,
}: {
  ensName: string | undefined
  name: string | undefined
  address: string
}) {
  if (name) return name
  if (ensName) return ensName
  return toTrimmedAddress(address)
}

export function mediaSelector({
  media,
  image,
}: {
  media: string | undefined
  image: string
}) {
  return media ?? image
}
