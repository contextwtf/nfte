import getNFTData from "@utils/getNFTData"
import allowCORS from "@utils/allowCORS"

export default allowCORS(async function handler(req, res) {
  const { contract, tokenId } = req.query

  if (!contract || !tokenId) {
    return res
      .status(400)
      .json({ error: "Missing contract or tokendId parameters" })
  }
  try {
    const data = await getNFTData({ contract, tokenId })

    res.setHeader(
      "Cache-Control",
      "Cache-Control: s-maxage=120, stale-while-revalidate"
    )
    res.status(200).json(data)
  } catch (e) {
    res.status(400).json({ error: "Cannot retrieve nft data" })
  }
})
