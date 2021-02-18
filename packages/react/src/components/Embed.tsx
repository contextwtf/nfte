import React from "react"

import NFTIcon from "../components/NFTIcon"
import Media from "../components/Media"
import Loading from "../components/Loading"
import useStyleSheet from "../hooks/useStyleSheet"
import { toTrimmedAddress, isAddress, tsFormat, cx } from "../utils"

import { NFTEProps } from "../types"

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
    creatorOf,
    creatorOfUrl,
    platform,
    platformUrl,
    mediaUrl,
    mediaPageUrl,
    mediaMimeType,
    blockNumber,
    timestamp,
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
      <section className="pr1 pl1 pt0 pb0 nfte__header">
        <div className="pr0 nfte__creator">
          <p className="nfte__label">Created by</p>
          <a target="_blank" href={creatorOfUrl} className="nfte__creator-id">
            {isAddress(creatorOf) ? toTrimmedAddress(creatorOf) : creatorOf}
          </a>
        </div>

        <div>
          <a
            href="https://foundation.app/blog/nfts-are-transforming-the-digital-art-world"
            target="_blank"
          >
            <NFTIcon />
          </a>
        </div>
      </section>

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

        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Minted on</p>
          <p
            title={`Block number: ${blockNumber}`}
            className="nfte__meta-content"
          >
            {tsFormat(timestamp)}
          </p>
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
}: NFTEProps) {
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
