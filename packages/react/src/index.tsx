import React, { useState, useEffect, CSSProperties } from "react"
import { NFTData, NFTEProps } from "./types"
import Loading from "./components/Loading"
import NFTIcon from "./components/NFTIcon"
import Media from "./components/Media"
import styles from "./styles.css"
import { toTrimmedAddress, isAddress, cx } from "./utils"
import useStyleSheet from "./hooks/useStyleSheet"

declare const API_HOST: string
export const css = styles

function NFT({
  data: {
    creatorOf,
    creatorOfUrl,
    ownerOf,
    ownerOfUrl,
    metadata,
    blockNumber,
    timestamp,
    mintedBy,
    mintedByUrl,
    media,
    mediaPageUrl,
  },
  className,
  style,
  darkMode,
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
          <a href="https://nfte.app/whats-an-nft" target="_blank">
            <NFTIcon />
          </a>
        </div>
      </section>

      {media && (
        <section className="nfte__media">
          <Media media={media} />
        </section>
      )}

      <p className="pr1 pl1 nfte__name">{metadata?.name}</p>
      <p className="pr1 pl1 pb1 nfte__description">{metadata?.description}</p>

      <section className="nfte__meta">
        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Owner</p>
          <a target="_blank" href={ownerOfUrl} className="nfte__meta-content">
            {isAddress(ownerOf) ? toTrimmedAddress(ownerOf) : ownerOf}
          </a>
        </div>

        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Minted by</p>
          <a target="_blank" href={mintedByUrl} className="nfte__meta-content">
            {isAddress(mintedBy) ? toTrimmedAddress(mintedBy) : mintedBy}
          </a>
        </div>

        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Minted on</p>
          <p
            title={`Block number: ${blockNumber}`}
            className="nfte__meta-content"
          >
            {timestamp}
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

export function NFTE({
  contract = "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0",
  tokenId = "17824",
  initialData,
  className,
  style,
  darkMode,
}: {
  contract: string
  tokenId: string
  initialData?: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
}) {
  useStyleSheet(styles)

  const [data, setData] = useState<NFTData | undefined>(initialData)
  useEffect(() => {
    if (initialData) return
    async function fetchNftData() {
      setData(undefined)
      const r = await fetch(
        `${API_HOST}/api/nft-data?contract=${contract}&tokenId=${tokenId}`
      )

      if (r.ok) {
        const data = await r.json()
        setData(data)
      }
    }

    fetchNftData()
  }, [contract, tokenId])

  if (!data) return <Loading style={style} />

  return (
    <NFT data={data} className={className} style={style} darkMode={darkMode} />
  )
}
