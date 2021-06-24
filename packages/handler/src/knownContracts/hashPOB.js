import { BigNumber } from "ethers"
import fetch from "node-fetch"
import abi from "../abis/hash"

const HASH_GRAPH_URL =
  'https://api.thegraph.com/subgraphs/name/proofofbeauty/hash';

export default {
  addresses: ["0xE18a32192ED95b0FE9D70D19e5025f103475d7BA"],
  abi,
  getContractData: async ({ Contract, ContractHistorical, tokenId }) => {
    const metadataURIProm = Contract.uri(tokenId)
    const ownerOfProm = Contract.ownerOf(tokenId)

    const query = `
    query {
      hash(id: "${BigNumber.from(tokenId).toHexString()}") {
        createdAtBlockNum
        createdBy
      }
    }
    `;
    
    const graphProm = fetch(HASH_GRAPH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    })

    const promises = await Promise.allSettled([
      metadataURIProm,
      ownerOfProm,
      graphProm,
    ])

    const [metadataURI, ownerOfAddress, graphMetadataRes] = promises

    const metadataRes = await fetch(metadataURI.value)
    const metadata = await metadataRes.json()
    const { data: graphMetadata } = await graphMetadataRes.value.json(); 

    return {
      metadata,
      name: metadata?.name,
      description: metadata?.description,
      ownerOf: ownerOfAddress.value,
      ownerOfUrl: `https://hash.pob.studio/collection/${ownerOfAddress.value}`,
      creatorOf: graphMetadata.hash?.createdBy,
      creatorOfUrl: `https://hash.pob.studio/collection/${graphMetadata.hash?.createdBy}`,
      mediaUrl: metadata?.image,
      mediaPageUrl: metadata?.external_link,
      mediaMimeType: 'image/jpeg',
      platform: "$HASH",
      platformUrl: "https://hash.pob.studio",
      blockNumber: parseInt(graphMetadata.hash?.createdAtBlockNum ?? '0'),
    }
  },
}
