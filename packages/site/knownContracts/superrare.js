import kebabCase from "lodash/kebabCase"
import get from "lodash/get"

export default {
  addresses: ["0xb932a70a57673d89f4acffbe830e8ed7f75fb9e0"],
  name: "SuperRare",
  homepage: "https://superrare.co",
  creatorOf: ({ metadata }) => get(metadata, "createdBy"),
  mediaUrl: ({ metadata }) => get(metadata, "media.uri"),
  mediaPageUrl: (data) =>
    `https://superrare.co/artwork-v2/${kebabCase(data.metadata.name)}-${
      data.tokenId
    }`,
}
