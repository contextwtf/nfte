import { CSSProperties } from "react"

export type NFTData = {
  contract: string
  tokenId: string
  creatorOf: string
  creatorOfUrl: string
  ownerOf: string
  ownerOfUrl: string
  mintedBy: string
  mintedByUrl: string
  metadata: { image: string; name: string; description?: string }
  blockNumber: string
  timestamp: string
  media: string
  mediaPageUrl: string
}

export type NFTEProps = {
  data: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
}
