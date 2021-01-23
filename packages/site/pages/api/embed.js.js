import { renderToStaticMarkup } from "react-dom/server"
import getNFTData from "@utils/getNFTData"
import allowCORS from "@utils/allowCORS"
import { NFTE, css } from "@nfte/react"

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

export default allowCORS(async function handler(req, res) {
  const { contract, tokenId, darkMode } = req.query

  if (!contract || !tokenId) {
    return res
      .status(400)
      .json({ error: "Missing contract or tokendId parameters" })
  }

  try {
    const data = await getNFTData({ contract, tokenId })
    const html = renderToStaticMarkup(
      <NFTE initialData={data} darkMode={darkMode} />
    )

    res.setHeader("Content-Type", "text/javascript; charset=utf-8")
    res.setHeader(
      "Cache-Control",
      "Cache-Control: s-maxage=120, stale-while-revalidate"
    )
    res.status(200).send(embedScript(html, css))
  } catch (error) {
    res.status(400).json({ error: "Cannot retrieve nft data" })
  }
})
