import { renderToStaticMarkup } from "react-dom/server"
import { ethers } from "ethers"
import { NFTData } from "@nfte/handler"
import allowCORS from "@utils/allowCORS"
import { css, Embed } from "@nfte/react"

function embedScript(markup, css) {
  return /*javascript*/ `
(function() {
  const current = window.document.currentScript;
  const closest = current.previousElementSibling;
  closest.innerHTML = \`${markup}\`;
  if(!window.nftEmbed) {
    const style = window.document.createElement('style');
    style.id = 'nft-embed-styles';
    style.innerText = \`${css}\`;
    document.head.appendChild(style);
    window.nftEmbed = '__nftEmbedScript';
  }
})()
`
}

const nftData = new NFTData({
  provider: new ethers.providers.CloudflareProvider(),
  historicalProvider: new ethers.providers.InfuraProvider(
    null,
    process.env.INFURA_PROJECT_ID
  ),
})

export default allowCORS(async function handler(req, res) {
  const { contract, tokenId, darkMode, disableAutoPlay } = req.query

  if (!contract || !tokenId) {
    return res
      .status(400)
      .json({ error: "Missing contract or tokendId parameters" })
  }

  try {
    const data = await nftData.getData({ contract, tokenId })

    const html = renderToStaticMarkup(
      <Embed data={data} darkMode={darkMode} autoPlay={!disableAutoPlay} />
    )

    res.setHeader("Content-Type", "text/javascript; charset=utf-8")
    // Cache for 30 mins
    res.setHeader(
      "Cache-Control",
      "Cache-Control: s-maxage=1800, stale-while-revalidate"
    )
    res.status(200).send(embedScript(html, css))
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: "Cannot retrieve nft data" })
  }
})
