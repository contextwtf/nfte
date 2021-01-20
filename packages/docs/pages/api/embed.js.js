import { renderToStaticMarkup } from "react-dom/server"
import { extractCritical } from "@emotion/server"
import nftData from "@utils/nftData"

import { NftEmbed } from "@nftmark/react"

function embedScript(markup, styles) {
  return /*javascript*/ `
(function() {
  const current = window.document.currentScript;
  const closest = current.previousElementSibling;
  closest.innerHTML = '${markup}';
  if(!window.nftEmbed) {
    const style = window.document.createElement('style');
    style.setAttribute('id', 'nft-embed-styles')
    style.innerText = "${styles}";
    document.head.appendChild(style);
  }
  window.nftEmbed = 'nftEmbedScript'
})()
`
}

export default async function handler(req, res) {
  const { contract, tokenId } = req.query

  const data = await nftData({ contract, tokenId })

  console.log(data)

  const Component = () => NftEmbed()
  const { html, css } = extractCritical(renderToStaticMarkup(<Component />))

  res.setHeader("Content-Type", "text/javascript; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    "Cache-Control: s-maxage=120, stale-while-revalidate"
  )
  res.status(200).send(embedScript(html, css))
}
