import { ethers, BigNumber, utils } from "ethers"
import { fromUnixTime, format } from "date-fns"
import { zonedTimeToUtc } from "date-fns-tz"
import get from "lodash/get"
import has from "lodash/has"
import knownContracts from "knownContracts"
import abis from "abis"
import isIPFS from "@utils/isIPFS"
import makeIPFSUrl from "@utils/makeIPFSUrl"

const defaultGetContractData = async ({
  Contract,
  ContractHistorical,
  tokenId,
}) => {
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
  const creatorOfAddress = logs[0].args.to
  const blockNumber = logs[0].blockNumber
  const timestamp = (await logs[0].getBlock()).timestamp

  return {
    tokenURI: tokenURI.value,
    ownerOfAddress: ownerOfAddress.value,
    creatorOfAddress,
    blockNumber,
    timestamp,
  }
}

export default async function ({ contract, tokenId }) {
  const provider = new ethers.providers.CloudflareProvider()
  const historicalProvider = new ethers.providers.InfuraProvider(
    null,
    process.env.INFURA_PROJECT_ID
  )

  const isValidAddress = utils.isAddress(contract)

  if (!isValidAddress) throw Error("not a valid address")

  try {
    // Find a known contract from known contracts
    const knownContract = knownContracts.filter((p) =>
      p.addresses.map(utils.getAddress).includes(utils.getAddress(contract))
    )[0]

    // If this is a non standard erc721 contract and a ABI has been provided use that one
    const abi = has(knownContract, "abi")
      ? abis[knownContract.abi]
      : abis.erc721

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
      tokenURI,
      ownerOfAddress,
      creatorOfAddress,
      blockNumber,
      timestamp,
    } = contractData

    const ownerOfEns = await provider.lookupAddress(ownerOfAddress)
    const creatorOfEns = await provider.lookupAddress(creatorOfAddress)

    const resolvedTokenURI = isIPFS(tokenURI) ? makeIPFSUrl(tokenURI) : tokenURI

    const r = await fetch(resolvedTokenURI)

    const mimeType = r.headers.get("Content-Type")
    let metadata

    // Handle various types of metadata
    // Handle json usecase
    if (mimeType.includes("json")) {
      metadata = await r.json()
    }
    // Handle directly returning plain text
    else if (mimeType.includes("text/plain")) {
      metadata = { image: await r.text() }
    }
    // Handle return where tokenURI is the asset
    else {
      metadata = { image: resolvedTokenURI }
    }

    console.log(metadata)

    // If there is a known contract and the property mediaUrl is set otherwise fallback to standard .image property
    const mediaUrl = has(knownContract, "mediaUrl")
      ? knownContract?.mediaUrl({
          contract,
          tokenId,
          metadata,
          creatorOfAddress,
        })
      : metadata.image
    const media = isIPFS(mediaUrl) ? makeIPFSUrl(mediaUrl) : mediaUrl

    // If there is a known contract and .mediaPageUrl is set otherwise use etherscan
    const mediaPageUrl = has(knownContract, "mediaPageUrl")
      ? knownContract?.mediaPageUrl({
          contract,
          tokenId,
          metadata,
          creatorOfAddress,
        })
      : `https://etherscan.io/address/${contract}?a=${tokenId}`

    // if known contract and has .creatorName set otherwise try ENS else fallback to address
    const creatorOf = has(knownContract, "creatorOf")
      ? knownContract?.creatorOf({
          contract,
          tokenId,
          metadata,
          creatorOfAddress,
        })
      : creatorOfEns ?? creatorOfAddress

    // if known contract and has .creatorPageUrl set otherwise use etherscan
    const creatorOfUrl = has(knownContract, "creatorOfPageUrl")
      ? knownContract?.creatorOfPageUrl({
          contract,
          tokenId,
          metadata,
          creatorOfAddress,
        })
      : `https://etherscan.io/address/${creatorOfAddress}`

    const ownerOf = ownerOfEns ?? ownerOfAddress
    const ownerOfUrl = `https://etherscan.io/address/${ownerOfAddress}`

    const mintedBy = get(knownContract, "name", contract)
    const mintedByUrl = get(
      knownContract,
      "homepage",
      `https://etherscan.io/address/${contract}`
    )

    return {
      contract,
      tokenId,
      metadata,
      ownerOf,
      ownerOfUrl,
      creatorOf,
      creatorOfUrl,
      mintedBy,
      mintedByUrl,
      media: media,
      mediaPageUrl,
      blockNumber,
      timestamp: format(
        zonedTimeToUtc(fromUnixTime(timestamp)),
        "dd/MM/yyyy HH:mm"
      ),
    }
  } catch (e) {
    console.log(e)
    throw Error("tokenId does not exist")
  }
}
