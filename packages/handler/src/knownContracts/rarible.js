import { BigNumber } from "ethers"
import fetch from "node-fetch"
import isIPFS from "../utils/isIPFS"
import makeIPFSUrl from "../utils/makeIPFSUrl"
import getMimeType from "../utils/getMimeType"

export default {
  addresses: ["0x60f80121c31a0d46b5279700f9df786054aa5ee5"],
  getContractData: async ({ Contract, ContractHistorical, tokenId }) => {
    const tokenURIProm = Contract.tokenURI(tokenId)
    const ownerOfProm = Contract.ownerOf(tokenId)
    const eventProm = ContractHistorical.filters.Transfer(
      null,
      null,
      BigNumber.from(tokenId)
    )

    const contractAddress = await Contract.address

    const promises = await Promise.allSettled([
      tokenURIProm,
      ownerOfProm,
      eventProm,
    ])

    const [tokenURI, ownerOfAddress, event] = promises

    const logs = await ContractHistorical.queryFilter(event.value, 0)
    const creatorOf = logs[0].args.to
    const blockNumber = logs[0].blockNumber

    const metadataRes = await fetch(tokenURI.value)
    const metadata = await metadataRes.json()

    const mediaUrl = isIPFS(metadata?.image)
      ? makeIPFSUrl(metadata?.image)
      : metadata?.image

    const mediaMimeType = await getMimeType(mediaUrl)

    return {
      metadata,
      name: metadata?.name,
      description: metadata?.description,
      ownerOf: ownerOfAddress.value,
      ownerOfUrl: null,
      creatorOf: creatorOf,
      creatorOfUrl: `https://app.rarible.com/user/${creatorOf}`,
      mediaUrl: mediaUrl,
      mediaPageUrl: `https://app.rarible.com/token/${contractAddress}:${tokenId}`,
      mediaMimeType,
      platform: "Rarible",
      platformUrl: "https://rarible.com",
      blockNumber,
    }
  },
}
