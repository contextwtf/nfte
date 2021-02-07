import React, { useEffect, useState } from "react"

function Text({ media }: { media: string }) {
  const [content, setContent] = useState<string | null>(null)

  useEffect(() => {
    fetch(media)
      .then((r) => r.text())
      .then((r) => setContent(r))
  }, [])

  return (
    <div className="nfte__media-content nfte__media-content--text pl1 pr1 pt1 pb1">
      {content}
    </div>
  )
}

function Video({ media }: { media: string }) {
  return (
    <video className="nfte__media-content" muted autoPlay loop playsInline>
      <source src={media} />
    </video>
  )
}

function Audio({ media }: { media: string }) {
  return <audio className="nfte__media-content" controls src={media}></audio>
}

export default function Media({ media }: { media: string }) {
  const [mimeType, setMimeType] = useState<string | null>(null)

  useEffect(() => {
    fetch(media, { method: "HEAD" }).then((r) =>
      setMimeType(r.headers.get("Content-Type"))
    )
  }, [])

  if (mimeType?.includes("text")) return <Text media={media} />

  if (mimeType?.includes("video")) return <Video media={media} />

  if (mimeType?.includes("audio")) return <Audio media={media} />

  return <img className="nfte__media-content" src={media} />
}
