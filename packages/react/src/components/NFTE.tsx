import { useState, useEffect, CSSProperties } from "react"
import { NFTData } from "../types"
import Embed from "./Embed"
import { isIPFS, makeIPFSUrl, getMimeType  } from "../utils"

import styles from "../styles.css"

export const css = styles

type url = {
  [chainId: string ]: string
}

const blockExplorer: url = {
  '1': 'https://etherscan.io/address/',
  '4': 'https://rinkeby.etherscan.io/address/',
  '137': 'https://polygonscan.com/address/'
}

export function NFTE({
  contract,
  tokenId,
  chainId,
  initialData,
  className,
  style,
  darkMode,
  autoPlay = true,
  children,
  metadataUrl = "https://lgt-server-prod.herokuapp.com",
  ownerUrl = "https://lgt-nft-server.herokuapp.com"
}: {
  contract: string
  tokenId: string
  chainId: string
  initialData?: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
  autoPlay?: boolean
  metadataUrl?: string
  ownerUrl?: string
  children?: (props: {
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
    data 
    async function fetchNftData() {
      setData(undefined)
      const r1 = await fetch(`${metadataUrl}/nft_metadata/${tokenId}}`)
      const r2 = await fetch(`${ownerUrl}/owner`,{body: JSON.stringify({"tokenId": tokenId, "chainId": chainId})})
      const { ownerOf } = await r2.json()
      const metadata = await r1.json()
      const mediaUrl = isIPFS(metadata.image) ? makeIPFSUrl(metadata?.image) : metadata.image
      const mediaMimeType = await getMimeType(mediaUrl) ?? undefined
      const data = {
        contract,
        tokenId,
        metadata,
        name: metadata.name,
        description: metadata.description,
        ownerOf,
        ownerOfUrl: blockExplorer[chainId] + ownerOf,
        platform: contract,
        platformUrl: blockExplorer[chainId] + contract,
        mediaUrl,
        mediaPageUrl: blockExplorer[chainId] + `${contract}?a=${tokenId}`,
        mediaMimeType,
      }
      console.log(data)
      setData(data)
      
    }

    fetchNftData()
  }, [contract, tokenId])

  const component = children || Embed

  return component({ data, className, style, darkMode, autoPlay })
}
