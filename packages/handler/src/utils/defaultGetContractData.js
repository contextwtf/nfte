import { BigNumber } from "ethers"
import fetch from "node-fetch"
import isIPFS from "./isIPFS"
import makeIPFSUrl from "./makeIPFSUrl"
import getMimeType from "./getMimeType"

export async function defaultGetContractData({
  Contract,
  ContractHistorical,
  tokenId,
}) {
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
  const creatorOf = logs[0].args.to
  const blockNumber = logs[0].blockNumber

  const resolvedTokenURI = isIPFS(tokenURI.value)
    ? makeIPFSUrl(tokenURI.value)
    : tokenURI.value

  const tokenURIRes = await fetch(resolvedTokenURI)
  const metadata = await tokenURIRes.json()

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
    creatorOf,
    creatorOfUrl: null,
    mediaUrl,
    mediaPageUrl: null,
    mediaMimeType: mediaMimeType,
    platform: null,
    platformUrl: null,
    blockNumber,
  }
}
