import { renderToStaticMarkup } from "react-dom/server"
import { css } from "stitches.config"
import nftData from "@utils/nftData"

import Embed from "@components/Embed"

function embedScript(markup, styles) {
  const flattenedStyles = styles.join("").replace(/(?:\r\n|\r|\n)/g, "")
  return /*javascript*/ `
(function() {
  const current = window.document.currentScript;
  const closest = current.previousElementSibling;
  closest.innerHTML = '${markup}';
  if(!window.nftEmbed) {
    const style = window.document.createElement('style');
    style.setAttribute('id', 'nft-embed-styles')
    style.innerText = "${flattenedStyles}";
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

  const Component = () => Embed({ name: "hello" })
  const markup = renderToStaticMarkup(Component())
  const { styles } = css.getStyles(() => renderToStaticMarkup(Component()))

  res.setHeader("Content-Type", "text/javascript; charset=utf-8")
  res.setHeader(
    "Cache-Control",
    "Cache-Control: s-maxage=120, stale-while-revalidate"
  )
  res.status(200).send(embedScript(markup, styles))
}
