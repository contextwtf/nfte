import { ethers, BigNumber } from "ethers"

export default {
  addresses: ["0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB"],
  name: "CryptoPunks",
  homepage: "https://www.larvalabs.com/cryptopunks",
  creatorOf: () => "CryptoPunks",
  creatorOfPageUrl: () => "https://www.larvalabs.com/cryptopunks",
  mediaUrl: ({ tokenId }) =>
    `https://www.larvalabs.com/public/images/cryptopunks/punk${tokenId}.png`,
  mediaPageUrl: ({ tokenId }) =>
    `https://www.larvalabs.com/cryptopunks/details/${tokenId}`,

  abi: "cryptoPunks",
  getContractData: async ({ Contract, ContractHistorical, tokenId }) => {
    const ownerOfAddress = await Contract.punkIndexToAddress(tokenId)

    return {
      tokenURI: `https://www.larvalabs.com/public/images/cryptopunks/punk${tokenId}.png`,
      ownerOfAddress,
      creatorOfAddress: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
      blockNumber: "3918425",
      timestamp: "1498186497",
    }
  },
}
