import React from "react"

import Media from "../components/Media"
import Loading from "../components/Loading"
import useStyleSheet from "../hooks/useStyleSheet"
import { toTrimmedAddress, isAddress, tsFormat, cx } from "../utils"

import { NFTEProps, NFTData, Override } from "../types"

import styles from "../styles.css"

function NFT({
  data: {
    contract,
    tokenId,
    metadata,
    name,
    description,
    ownerOf,
    ownerOfUrl,
    platform,
    platformUrl,
    mediaUrl,
    mediaPageUrl,
    mediaMimeType,
  },
  className,
  style,
  darkMode,
  autoPlay,
}: NFTEProps) {
  return (
    <div
      className={cx([
        "nfte",
        "nfte--loaded",
        darkMode && "nfte--dark-mode",
        className,
      ])}
      style={style}
    >

      {mediaUrl && mediaMimeType && (
        <section className="nfte__media">
          <Media
            media={mediaUrl}
            mediaMimeType={mediaMimeType}
            autoPlay={autoPlay}
          />
        </section>
      )}

      <p className="pr1 pl1 nfte__name">{name}</p>
      <p className="pr1 pl1 pb1 nfte__description">{description}</p>

      <section className="nfte__meta">
        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Owner</p>
          <a target="_blank" href={ownerOfUrl} className="nfte__meta-content">
            {isAddress(ownerOf) ? toTrimmedAddress(ownerOf) : ownerOf}
          </a>
        </div>

        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Minted by</p>
          <a target="_blank" href={platformUrl} className="nfte__meta-content">
            {isAddress(platform) ? toTrimmedAddress(platform) : platform}
          </a>
        </div>

      </section>

      <a
        target="_blank"
        href={mediaPageUrl}
        className="pr1 pl1 pt1 pb1 nfte__view-buy"
      >
        {mediaPageUrl?.includes("etherscan.io") ? "View" : "Buy / Bid"}
      </a>
    </div>
  )
}

export default function Embed({
  data,
  style,
  className,
  darkMode,
  autoPlay,
}: Override<NFTEProps, { data?: NFTData }>) {
  useStyleSheet(styles)

  if (!data) return <Loading style={style} />

  return (
    <NFT
      data={data}
      className={className}
      style={style}
      darkMode={darkMode}
      autoPlay={autoPlay}
    />
  )
}
