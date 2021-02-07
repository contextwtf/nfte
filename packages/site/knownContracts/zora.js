import { BigNumber } from "ethers"
import abi from "abis/zora"

export default {
  addresses: ["0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7"],
  abi,
  getContractData: async ({ Contract, ContractHistorical, tokenId }) => {
    const tokenURIProm = Contract.tokenURI(tokenId)
    const metadataURIProm = Contract.tokenMetadataURI(tokenId)
    const ownerOfProm = Contract.ownerOf(tokenId)
    const eventProm = ContractHistorical.filters.Transfer(
      null,
      null,
      BigNumber.from(tokenId)
    )

    const promises = await Promise.allSettled([
      tokenURIProm,
      metadataURIProm,
      ownerOfProm,
      eventProm,
    ])

    const [tokenURI, metadataURI, ownerOfAddress, event] = promises

    const logs = await ContractHistorical.queryFilter(event.value, 0)
    const creatorOf = logs[0].args.to
    const blockNumber = logs[0].blockNumber

    const metadataRes = await fetch(metadataURI.value)
    const metadata = await metadataRes.json()

    return {
      metadata,
      name: metadata?.name,
      description: metadata?.description,
      ownerOf: ownerOfAddress.value,
      ownerOfUrl: `https://zora.co/${ownerOfAddress.value}`,
      creatorOf: creatorOf,
      creatorOfUrl: `https://zora.co/${creatorOf}`,
      mediaUrl: tokenURI.value,
      mediaPageUrl: `https://zora.co/${creatorOf}/${tokenId}`,
      platform: "Zora",
      platformUrl: "https://zora.co",
      blockNumber,
    }
  },
}
