import { ethers, BigNumber, utils } from "ethers"
import { fromUnixTime, format } from "date-fns"
import get from "lodash/get"
import has from "lodash/has"
import erc721ABI from "@utils/erc721ABI"
import knownContracts from "knownContracts"
import isIPFS from "@utils/isIPFS"
import makeIPFSUrl from "@utils/makeIPFSUrl"

export default async function ({ contract, tokenId }) {
  const provider = new ethers.providers.CloudflareProvider()
  const historicalProvider = new ethers.providers.InfuraProvider(
    null,
    process.env.INFURA_PROJECT_ID
  )

  const isValidAddress = utils.isAddress(contract)

  if (!isValidAddress) throw Error("not a valid address")

  const erc721 = new ethers.Contract(contract, erc721ABI, provider)
  const erc721Historical = new ethers.Contract(
    contract,
    erc721ABI,
    historicalProvider
  )

  try {
    const symbolProm = erc721.symbol()
    const tokenURIProm = erc721.tokenURI(tokenId)
    const ownerOfProm = erc721.ownerOf(tokenId)
    const eventProm = erc721Historical.filters.Transfer(
      ethers.constants.AddressZero,
      null,
      BigNumber.from(tokenId)
    )
    const promises = await Promise.allSettled([
      symbolProm,
      tokenURIProm,
      ownerOfProm,
      eventProm,
    ])

    const [symbol, tokenURI, ownerOfAddress, event] = promises

    const ownerEns = await provider.lookupAddress(ownerOfAddress.value)
    const logs = await erc721Historical.queryFilter(event.value, 0)
    const creatorOfAddress = logs[0].args.to
    const creatorOfEns = await provider.lookupAddress(creatorOfAddress)
    const blockNumber = logs[0].blockNumber
    const timestamp = (await logs[0].getBlock()).timestamp

    const resolvedTokenURI = isIPFS(tokenURI.value)
      ? makeIPFSUrl(tokenURI.value)
      : tokenURI.value

    const r = await fetch(resolvedTokenURI)
    const metadata = await r.json()

    // console.log(metadata)

    const knownContract = knownContracts.filter((p) =>
      p.addresses.map(utils.getAddress).includes(utils.getAddress(contract))
    )[0]

    const mediaUrl = has(knownContract, "mediaUrl")
      ? knownContract?.mediaUrl({
          contract,
          tokenId,
          metadata,
          symbol: symbol.value,
          creatorOfAddress,
        })
      : metadata.image
    const media = isIPFS(mediaUrl) ? makeIPFSUrl(mediaUrl) : mediaUrl
    const mediaPageUrl = get(knownContract, "mediaPageUrl", null)
      ? knownContract?.mediaPageUrl({
          contract,
          tokenId,
          metadata,
          symbol: symbol.value,
          creatorOfAddress,
        })
      : `https://etherscan.io/address/${contract}?a=${tokenId}`

    const creatorOf =
      get(metadata, knownContract?.creatorNamePath, creatorOfEns) ??
      creatorOfAddress
    const creatorOfUrl = get(knownContract, "creatorPageUrl", null)
      ? knownContract?.creatorPageUrl({
          contract,
          tokenId,
          metadata,
          symbol: symbol.value,
          creatorOfAddress,
        })
      : `https://etherscan.io/address/${creatorOfAddress}`

    const ownerOf = ownerEns ?? ownerOfAddress.value
    const ownerOfUrl = `https://etherscan.io/address/${ownerOfAddress.value}`

    const mintedBy = get(knownContract, "name", null) ?? contract
    const mintedByUrl =
      get(knownContract, "homepage", null) ??
      `https://etherscan.io/address/${contract}`

    return {
      contract,
      tokenId,
      metadata,
      ownerOf,
      ownerOfUrl,
      creatorOf,
      creatorOfUrl,
      symbol: symbol.value,
      mintedBy,
      mintedByUrl,
      media: media,
      mediaPageUrl,
      blockNumber,
      timestamp: format(fromUnixTime(timestamp), "dd/MM/yyyy HH:mm"),
    }
  } catch (e) {
    console.log(e)
    throw Error("tokenId does not exist")
  }
}
