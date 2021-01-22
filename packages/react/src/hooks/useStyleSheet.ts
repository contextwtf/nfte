import useIsomorphicLayoutEffect from "./useIsomorphicLayoutEffect"

export default function useStyleSheet(styles: string) {
  useIsomorphicLayoutEffect(function () {
    if (
      typeof document !== "undefined" &&
      !document.getElementById("nft-embed-styles")
    ) {
      const sheet = document.createElement("style")
      sheet.id = "nft-embed-styles"
      document.head.appendChild(sheet)
      sheet.innerHTML = styles
    }
  })
}
