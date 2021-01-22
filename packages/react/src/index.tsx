import React, { useState, useEffect, CSSProperties } from "react"
import { NFTData, NFTEProps } from "./types"
import Loading from "./components/Loading"
import NFTMark from "./components/NFTMark"
import styles from "./styles.css"
import {
  toTrimmedAddress,
  isImage,
  fileExtension,
  creatorName,
  mediaSelector,
  cx,
} from "./utils"
import useStyleSheet from "./hooks/useStylesheet"

declare const API_HOST: string
export const css = styles

function NFT({
  data: {
    contract,
    creatorOf,
    ownerOf,
    metadata,
    blockNumber,
    timestamp,
    platform,
    media,
  },
  className,
  style,
  darkMode,
}: NFTEProps) {
  const mediaUrl = mediaSelector({ image: metadata?.image, media })

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
          <p className="nfte__creator-id">{creatorName(creatorOf)}</p>
        </div>

        <div className="nfte__nftmark">
          <NFTMark />
        </div>
      </section>
      {media && (
        <section className="nfte__media">
          {isImage(mediaUrl) ? (
            <img className="nfte__media-content" src={mediaUrl} />
          ) : (
            <video
              className="nfte__media-content"
              muted
              autoPlay
              loop
              playsInline
              poster={metadata?.image}
            >
              <source
                src={mediaUrl}
                type={`video/${fileExtension(mediaUrl)}`}
              />
            </video>
          )}
        </section>
      )}

      <p className="pr1 pl1 nfte__name">{metadata?.name}</p>
      <p className="pr1 pl1 pb1 nfte__description">{metadata?.description}</p>

      <section className="nfte__meta">
        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Collected by</p>
          <p className="nfte__meta-content">
            {ownerOf?.ensName
              ? ownerOf?.ensName
              : toTrimmedAddress(ownerOf?.address)}
          </p>
        </div>

        <div className="pl1 pr1 nfte__single-meta">
          <p className="nfte__label">Minted by</p>
          <p className="nfte__meta-content">
            {platform?.name ? platform?.name : toTrimmedAddress(contract)}
          </p>
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
      const r = await fetch(
        `${API_HOST}/api/nft-data?contract=${contract}&tokenId=${tokenId}`
      )

      if (r.ok) {
        const data = await r.json()
        setData(data)
      }
    }

    fetchNftData()
  }, [])

  if (!data) return <Loading style={style} />

  return (
    <NFT data={data} className={className} style={style} darkMode={darkMode} />
  )
}
