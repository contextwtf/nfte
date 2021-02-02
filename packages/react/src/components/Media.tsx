import React, { useEffect } from "react"
import { isUrl } from "../utils"

export default function Media({ media }: { media: string }) {
  useEffect(() => {
    async function fetchMimeType() {
      const r = await fetch(media, { method: "HEAD" })
      console.log(r.headers.get("Content-Type"))
    }

    fetchMimeType()
  }, [])
  if (!isUrl(media))
    return (
      <div className="nfte__media-content nfte__media-content--text pl1 pr1 pt1 pb1">
        {media}
      </div>
    )

  return (
    <video
      className="nfte__media-content"
      muted
      autoPlay
      loop
      playsInline
      poster={media}
    >
      <source src={media} />
    </video>
  )
}
