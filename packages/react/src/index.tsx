import React, { useState, useEffect, CSSProperties, ReactNode } from "react"
import { NFTData, NFTEProps } from "./types"
import Loading from "./components/Loading"
import NFTIcon from "./components/NFTIcon"
import Media from "./components/Media"
import styles from "./styles.css"
import { toTrimmedAddress, isAddress, tsFormat, cx } from "./utils"
import useStyleSheet from "./hooks/useStyleSheet"

declare const API_HOST: string
export const css = styles

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

export function Embed({
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

export function NFTE({
  contract,
  tokenId,
  initialData,
  className,
  style,
  darkMode,
  autoPlay = true,
  children,
}: {
  contract: string
  tokenId: string
  initialData?: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
  autoPlay: boolean
  children: (props: {
    data: NFTData | undefined
    className?: string
    style?: CSSProperties
    darkMode?: boolean
    autoPlay: boolean
  }) => ReactNode
}) {
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
        // console.log(data)
        setData(data)
      }
    }

    fetchNftData()
  }, [contract, tokenId])

  return children({ data, className, style, darkMode, autoPlay })
}
