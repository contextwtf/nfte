import { ethers, utils } from "ethers"
import has from "lodash/has"
import knownContracts from "./knownContracts"
import { defaultGetContractData } from "./utils/defaultGetContractData"
import erc721ABI from "./abis/erc721"

export class NFTData {
  constructor({
    provider = new ethers.providers.CloudflareProvider(),
    historicalProvider,
  }) {
    this.provider = provider
    this.historicalProvider = historicalProvider
  }

  async getData({ contract, tokenId }) {
    if (!utils.isAddress(contract)) throw Error("not a valid address")

    try {
      // Find a known contract from known contracts
      const knownContract = knownContracts.filter((p) =>
        p.addresses.map(utils.getAddress).includes(utils.getAddress(contract))
      )[0]

      // If this is a non standard erc721 contract and a ABI has been provided use that one
      const abi = knownContract?.abi ?? erc721ABI

      const Contract = new ethers.Contract(contract, abi, this.provider)
      const ContractHistorical = new ethers.Contract(
        contract,
        abi,
        this.historicalProvider
      )

      const contractData = has(knownContract, "getContractData")
        ? await knownContract.getContractData({
            Contract,
            ContractHistorical,
            tokenId,
          })
        : await defaultGetContractData({
            Contract,
            ContractHistorical,
            tokenId,
          })

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
        mediaMimeType,
        platform,
        platformUrl,
        blockNumber,
      } = contractData

      // If there is a known contract and .mediaPageUrl is set otherwise use etherscan
      const resolvedMediaPageUrl =
        mediaPageUrl ?? `https://etherscan.io/address/${contract}?a=${tokenId}`

      // if known contract and has .creatorName set otherwise try ENS else fallback to address
      const resolvedCreatorOf = await this.getAddress(creatorOf)
      // if known contract and has .creatorOfUrl set otherwise use etherscan
      const resolvedCreatorOfUrl =
        creatorOfUrl ?? `https://etherscan.io/address/${creatorOf}`

      const resolvedOwnerOf = await this.getAddress(ownerOf)
      const resolvedOwnerOfUrl =
        ownerOfUrl ?? `https://etherscan.io/address/${ownerOf}`

      const resolvedPlatform = platform ?? contract
      const resolvedPlatformUrl =
        platformUrl ?? `https://etherscan.io/address/${contract}`

      const timestamp = (await this.historicalProvider.getBlock(blockNumber))
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
        mediaMimeType,
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

  async getAddress(value) {
    if (utils.isAddress(value)) {
      return (await this.provider.lookupAddress(value)) ?? value
    }
    return value
  }
}
