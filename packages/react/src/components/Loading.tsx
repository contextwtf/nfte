import React, { CSSProperties } from "react"

export default function Loading({ style }: { style?: CSSProperties }) {
  return (
    <div className="nfte nfte--loading" style={style}>
      <div className="pl1 pr1 pt1 pb1 nfte__header">
        <div className="nfte__label nfte__loading-box" />
        <div className="nfte__value nfte__loading-box" />
      </div>
      <div className="nfte__media nfte__loading-box" />

      <div className="pl1 pr1 pt1 pb1 nfte__details">
        <div className="nfte__label nfte__loading-box" />
        <div className="nfte__value nfte__loading-box" />
      </div>

      <div className="pb1 nfte__meta">
        <div className="nfte__single-meta nfte__loading-box" />
        <div className="nfte__single-meta nfte__loading-box" />
      </div>
    </div>
  )
}
