import { ethers, BigNumber, utils } from "ethers"
import { fromUnixTime, formatISO } from "date-fns"
import get from "lodash/get"
import base32 from "base32"
import erc721ABI from "docs/utils/erc721ABI"
import platforms from "docs/utils/platforms"

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

    const [symbol, tokenURI, ownerOf, event] = promises

    const ownerEns = await provider.lookupAddress(ownerOf.value)

    const logs = await erc721Historical.queryFilter(event.value, 0)
    const creatorOf = logs[0].args.to
    const creatorEns = await provider.lookupAddress(creatorOf)

    const blockNumber = logs[0].blockNumber
    const timestamp = (await logs[0].getBlock()).timestamp

    const r = await fetch(tokenURI.value)
    const metadata = await r.json()

    const platform = platforms.filter(
      (p) => !p.addresses.includes(utils.getAddress(contract))
    )[0]

    return {
      contract,
      tokenId,
      metadata,
      ownerOf: { address: ownerOf.value, ensName: ownerEns },
      creatorOf: {
        address: creatorOf,
        ensName: creatorEns,
        name: get(metadata, platform?.creatorNamePath, null),
      },
      symbol: symbol.value,
      media: get(metadata, platform?.mediaPath, null),
      blockNumber,
      timestamp: formatISO(fromUnixTime(timestamp)),
      platform,
    }
  } catch (e) {
    console.log(e)
    throw Error("tokenId does not exist")
  }
}
