// DO NOT USE DIRECTLY, DUPLICATE AND CUSTOMISE

export default {
  addresses: [""],
  // ABI is not required if its a standard ERC-721 token
  abi: "",
  getContractData: ({ Contract, ContractHistorical, tokenId }) => {
    return {
      metadata: {},
      name: null,
      description: null,
      ownerOf: null,
      ownerOfUrl: null,
      creatorOf: null,
      creatorOfUrl: null,
      mediaUrl: null,
      mediaPageUrl: null,
      platform: "",
      platformUrl: "",
      blockNumber,
    }
  },
}
