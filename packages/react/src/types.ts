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

export type NFTEmbedProps = {
  data: NFTData
  theme?: string | object
  styleOverrides?: object
}

export type ThemeDefinition = {
  colors?: any
  space?: any
  fontSizes?: any
  fonts?: any
  fontWeights?: any
  lineHeights?: any
  letterSpacings?: any
  sizes?: any
  borderWidths?: any
  borderStyles?: any
  radii?: any
  shadows?: any
  zIndices?: any
  transitions?: any
}
