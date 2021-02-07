import kebabCase from "lodash/kebabCase"
import { BigNumber } from "ethers"

export default {
  addresses: ["0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0"],
  mediaPageUrl: (data) =>
    `https://superrare.co/artwork-v2/${kebabCase(data.metadata.name)}-${
      data.tokenId
    }`,

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
      creatorOf: metadata?.createdBy,
      creatorOfUrl: null,
      mediaUrl: metadata?.media?.uri,
      mediaPageUrl: `https://superrare.co/artwork-v2/${kebabCase(
        metadata.name
      )}-${tokenId}`,
      platform: "SuperRare",
      platformUrl: "https://superrare.co",
      blockNumber,
    }
  },
}
