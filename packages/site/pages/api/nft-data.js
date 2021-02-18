import { ethers } from "ethers"
import { NFTData } from "@nfte/handler"
import allowCORS from "@utils/allowCORS"

const provider = new ethers.providers.CloudflareProvider()
const historicalProvider = new ethers.providers.InfuraProvider(
  null,
  process.env.INFURA_PROJECT_ID
)

const nftData = new NFTData({ provider, historicalProvider })

export default allowCORS(async function handler(req, res) {
  const { contract, tokenId } = req.query

  if (!contract || !tokenId) {
    return res
      .status(400)
      .json({ error: "Missing contract or tokendId parameters" })
  }
  try {
    const data = await nftData.getData({ contract, tokenId })
    // Cache for 30 mins
    res.setHeader(
      "Cache-Control",
      "Cache-Control: s-maxage=1800, stale-while-revalidate"
    )
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json({ error: "Cannot retrieve nft data" })
  }
})
