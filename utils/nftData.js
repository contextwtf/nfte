import { ethers, BigNumber } from "ethers"
import erc721ABI from "@utils/erc721ABI"

export default async function eth({ contract, tokenId }) {
  const provider = new ethers.providers.InfuraProvider(
    null,
    process.env.INFURA_PROJECT_ID
  )
  const erc721 = new ethers.Contract(contract, erc721ABI, provider)

  const event = erc721.filters.Transfer(
    ethers.constants.AddressZero,
    null,
    BigNumber.from(tokenId)
  )
  const logs = await erc721.queryFilter(event, 0)

  const tokenURI = await erc721.tokenURI(tokenId)
  const ownerOf = await erc721.ownerOf(tokenId)
  const ownerEns = await provider.lookupAddress(ownerOf)
  const creatorOf = logs[0].args.to
  const creatorEns = await provider.lookupAddress(creatorOf)
  const symbol = await erc721.symbol()

  const r = await fetch(tokenURI)
  const metadata = await r.json()

  return {
    metadata,
    ownerOf: { address: ownerOf, ensName: ownerEns },
    creatorOf: { address: creatorOf, ensName: creatorEns },
    symbol,
  }
}
