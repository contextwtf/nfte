import { CSSProperties } from "react"

export type Override<T1, T2> = Omit<T1, keyof T2> & T2

export type NFTData = {
  contract: string
  tokenId: string
  metadata: { [key: string]: any }
  name: string
  description: string
  ownerOf: string
  ownerOfUrl: string
  platform: string
  platformUrl: string
  mediaUrl: string
  mediaPageUrl: string
  mediaMimeType?: string
}

export type NFTEProps = {
  data: NFTData
  className?: string
  style?: CSSProperties
  darkMode?: boolean
  autoPlay: boolean
}
