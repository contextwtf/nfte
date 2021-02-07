import { BigNumber } from "ethers"

export default {
  addresses: ["0xb80fBF6cdb49c33dC6aE4cA11aF8Ac47b0b4C0f3"],
  getContractData: async ({ Contract, ContractHistorical, tokenId }) => {
    const tokenURIProm = Contract.tokenURI(tokenId)
    const ownerOfProm = Contract.ownerOf(tokenId)
    const eventProm = ContractHistorical.filters.Transfer(
      null,
      null,
      BigNumber.from(tokenId)
    )

    const promises = await Promise.allSettled([
      tokenURIProm,
      ownerOfProm,
      eventProm,
    ])

    const [tokenURI, ownerOfAddress, event] = promises

    const logs = await ContractHistorical.queryFilter(event.value, 0)
    const blockNumber = logs[0].blockNumber

    const metadataRes = await fetch(tokenURI.value)
    const metadata = await metadataRes.json()

    return {
      metadata,
      name: metadata?.name,
      description: metadata?.description,
      ownerOf: ownerOfAddress.value,
      ownerOfUrl: null,
      creatorOf: metadata?.style_creator_name,
      creatorOfUrl: null,
      mediaUrl: metadata?.image,
      mediaPageUrl: `https://ethblock.art/view/${tokenId}`,
      platform: "EthBlock.art",
      platformUrl: "https://ethblock.art",
      blockNumber,
    }
  },
}
