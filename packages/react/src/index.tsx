import React, { useState, useEffect } from "react"
import { css, cx } from "@emotion/css"
import {
  wrapper,
  base,
  text,
  media as mediaStyles,
  textMono,
} from "./primitives"
import { NFTData, NFTEmbedProps } from "./types"
import Loading from "./Loading"
import { defaultTheme, darkTheme, ThemeProvider } from "./theme"

import {
  toTrimmedAddress,
  isImage,
  fileExtension,
  creatorName,
  mediaSelector,
} from "./utils"

const API_HOST: string = "http://localhost:3000"

const creator = cx(
  base,
  css({
    py: "@2",
    px: "@2",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  })
)

const mediaWrapper = cx(
  base,
  css({
    display: "flex",
    maxWidth: "100%",
    backgroundColor: "@black",
    mb: "@2",
  })
)

export function NFT({
  data: {
    creatorOf,
    ownerOf,
    metadata,
    blockNumber,
    timestamp,
    platform,
    media,
    contract,
    tokenId,
  },
}: NFTEmbedProps) {
  const mediaUrl = mediaSelector({ image: metadata?.image, media })

  return (
    <div className={wrapper}>
      <section className={creator}>
        <div className={cx(base, css({ minWidth: 0, pr: "@1" }))}>
          <p className={cx(base, css({ color: "@text-light", mb: "@0" }))}>
            Created by
          </p>
          <p
            className={cx(
              textMono,
              css({
                fontSize: "@2",
                fontWeight: 700,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })
            )}
          >
            {creatorName(creatorOf)}
          </p>
        </div>

        <a
          className={base}
          href={`https://etherscan.com/token/${contract}?a=${tokenId}`}
        >
          View on Etherscan
        </a>
      </section>
      {media && (
        <section className={mediaWrapper}>
          {isImage(mediaUrl) ? (
            <img className={mediaStyles} src={mediaUrl} />
          ) : (
            <video muted autoPlay loop playsInline poster={metadata?.image}>
              <source
                className={mediaStyles}
                src={mediaUrl}
                type={`video/${fileExtension(mediaUrl)}`}
              />
            </video>
          )}
        </section>
      )}
      <section
        className={cx(base, css({ display: "flex", mb: "@2", px: "@2" }))}
      >
        <p className={cx(text, css({ lineHeight: 1.4 }))}>
          <span className={cx(text, css({ fontWeight: 700, fontSize: "@1" }))}>
            {metadata?.name}
          </span>
          <span className={cx(text, css({ ml: "@1" }))}>
            — {metadata?.description}
          </span>
        </p>
      </section>
      <section
        className={cx(
          base,
          css({
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          })
        )}
      >
        <div className={cx(base, css({ mb: "@2", px: "@2" }))}>
          <p className={cx(text, css({ color: "@text-light", mb: "@0" }))}>
            Collected by
          </p>
          <p
            className={cx(
              textMono,
              css({
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })
            )}
          >
            {ownerOf?.ensName
              ? ownerOf?.ensName
              : toTrimmedAddress(ownerOf?.address)}
          </p>
        </div>

        <div className={cx(base, css({ mb: "@2", px: "@2" }))}>
          <p className={cx(text, css({ color: "@text-light", mb: "@0" }))}>
            Minted by
          </p>
          <p
            className={cx(
              textMono,
              css({
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })
            )}
          >
            {platform?.name}
          </p>
        </div>

        <div className={cx(base, css({ mb: "@2", px: "@2" }))}>
          <p className={cx(text, css({ color: "@text-light", mb: "@0" }))}>
            Minted on
          </p>
          <p
            title={`Block number: ${blockNumber}`}
            className={cx(
              textMono,
              css({
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              })
            )}
          >
            {timestamp}
          </p>
        </div>
      </section>
    </div>
  )
}

export function NFTEmbed({
  contract = "0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0",
  tokenId = "17824",
  initialData,
  styleOverrides,
  theme,
}: {
  contract: string
  tokenId: string
  initialData?: NFTData
  styleOverrides?: object
  theme?: any
}) {
  let themeConfig = defaultTheme
  const [data, setData] = useState<NFTData | undefined>(initialData)
  useEffect(() => {
    if (initialData) return
    async function fetchNftData() {
      const r = await fetch(
        `http://localhost:3000/api/nft-data?contract=${contract}&tokenId=${tokenId}`
      )

      const data = await r.json()
      setData(data)
    }

    fetchNftData()
  }, [])

  if (theme === "dark") themeConfig = { ...themeConfig, colors: darkTheme }
  if (typeof theme === "object") themeConfig = theme

  return (
    <ThemeProvider value={themeConfig}>
      {!data ? (
        <Loading />
      ) : (
        <NFT data={data} styleOverrides={styleOverrides} />
      )}
    </ThemeProvider>
  )
}
