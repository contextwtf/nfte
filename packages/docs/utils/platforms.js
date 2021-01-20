import kebabCase from "lodash/kebabCase"

export default [
  {
    name: "SuperRare",
    homepage: "https://superrare.co",
    addresses: ["0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0"],
    baseUrl: "https://superrare.co/",
    creatorNamePath: "createdBy",
    mediaPath: "media.uri",
    urlFormatter: (data) => `${kebabCase(data.name)}-${data.tokenId}`,
  },
]
