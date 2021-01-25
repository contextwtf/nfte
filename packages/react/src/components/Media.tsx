import React from "react"
import { isUrl } from "../utils"

export default function Media({ media }: { media: string }) {
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
