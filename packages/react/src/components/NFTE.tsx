import React, { useState, useEffect, CSSProperties } from "react"
import { NFTData } from "../types"

const Embed = React.lazy(() => import("./Embed"))

import styles from "../styles.css"

export const css = styles

declare const API_HOST: string

export function NFTE({
  contract,
  tokenId,
  initialData,
  className,
  style,
  darkMode,
  autoPlay = true,
  children,
  apiUrl = `${API_HOST}/api/nft-data`,
}: {
  contract: string
  tokenId: string
  initialData?: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
  autoPlay?: boolean
  apiUrl?: string
  children: (props: {
    data: NFTData | undefined
    className?: string
    style?: CSSProperties
    darkMode?: boolean
    autoPlay: boolean
  }) => JSX.Element
}) {
  const [data, setData] = useState<NFTData | undefined>(initialData)
  useEffect(() => {
    if (initialData || !contract || !tokenId) return
    async function fetchNftData() {
      setData(undefined)
      const r = await fetch(`${apiUrl}?contract=${contract}&tokenId=${tokenId}`)

      if (r.ok) {
        const data = await r.json()
        // console.log(data)
        setData(data)
      }
    }

    fetchNftData()
  }, [contract, tokenId])

  const component = children || Embed

  return component({ data, className, style, darkMode, autoPlay })
}
