import { CSSProperties } from "react"

export type NFTData = {
  contract: string
  tokenId: string
  creatorOf: {
    ensName: string | undefined
    name: string | undefined
    address: string
  }
  ownerOf: {
    ensName: string | undefined
    name: string | undefined
    address: string
  }
  metadata: { image: string; name: string; description?: string }
  blockNumber: string
  timestamp: string
  platform: { name: string }
  media: string
}

export type NFTEProps = {
  data: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
}
