import { ethers, BigNumber, utils } from "ethers"
import { fromUnixTime, format } from "date-fns"
import { zonedTimeToUtc } from "date-fns-tz"
import has from "lodash/has"
import knownContracts from "knownContracts"
import erc721ABI from "abis/erc721"
import isIPFS from "@utils/isIPFS"
import makeIPFSUrl from "@utils/makeIPFSUrl"

const provider = new ethers.providers.CloudflareProvider()
const historicalProvider = new ethers.providers.InfuraProvider(
  null,
  process.env.INFURA_PROJECT_ID
)

async function getAddress(value) {
  if (utils.isAddress(value)) {
    return (await provider.lookupAddress(value)) ?? value
  }
  return value
}

async function defaultGetContractData({
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
    platform: null,
    platformUrl: null,
    blockNumber,
  }
}

export default async function ({ contract, tokenId }) {
  if (!utils.isAddress(contract)) throw Error("not a valid address")

  try {
    // Find a known contract from known contracts
    const knownContract = knownContracts.filter((p) =>
      p.addresses.map(utils.getAddress).includes(utils.getAddress(contract))
    )[0]

    // If this is a non standard erc721 contract and a ABI has been provided use that one
    const abi = knownContract?.abi ?? erc721ABI

    const Contract = new ethers.Contract(contract, abi, provider)
    const ContractHistorical = new ethers.Contract(
      contract,
      abi,
      historicalProvider
    )

    const contractData = has(knownContract, "getContractData")
      ? await knownContract.getContractData({
          Contract,
          ContractHistorical,
          tokenId,
        })
      : await defaultGetContractData({ Contract, ContractHistorical, tokenId })

    const {
      metadata,
      name,
      description,
      ownerOf,
      ownerOfUrl,
      creatorOf,
      creatorOfUrl,
      mediaUrl,
      mediaPageUrl,
      platform,
      platformUrl,
      blockNumber,
    } = contractData

    // If there is a known contract and .mediaPageUrl is set otherwise use etherscan
    const resolvedMediaPageUrl =
      mediaPageUrl ?? `https://etherscan.io/address/${contract}?a=${tokenId}`

    // if known contract and has .creatorName set otherwise try ENS else fallback to address
    const resolvedCreatorOf = await getAddress(creatorOf)
    // if known contract and has .creatorOfUrl set otherwise use etherscan
    const resolvedCreatorOfUrl =
      creatorOfUrl ?? `https://etherscan.io/address/${creatorOf}`

    const resolvedOwnerOf = await getAddress(ownerOf)
    const resolvedOwnerOfUrl =
      ownerOfUrl ?? `https://etherscan.io/address/${ownerOf}`

    const resolvedPlatform = platform ?? contract
    const resolvedPlatformUrl =
      platformUrl ?? `https://etherscan.io/address/${contract}`

    const timestamp = (await historicalProvider.getBlock(blockNumber))
      ?.timestamp

    return {
      contract,
      tokenId,
      metadata,
      name,
      description,
      ownerOf: resolvedOwnerOf,
      ownerOfUrl: resolvedOwnerOfUrl,
      creatorOf: resolvedCreatorOf,
      creatorOfUrl: resolvedCreatorOfUrl,
      platform: resolvedPlatform,
      platformUrl: resolvedPlatformUrl,
      mediaUrl,
      mediaPageUrl: resolvedMediaPageUrl,
      blockNumber,
      timestamp,
      // deprecated
      media: mediaUrl,
      mintedBy: resolvedPlatform,
      mintedByUrl: resolvedPlatformUrl,
    }
  } catch (e) {
    console.log(e)
    throw Error("tokenId does not exist")
  }
}
