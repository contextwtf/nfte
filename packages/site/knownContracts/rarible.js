export default {
  addresses: ["0x60F80121C31A0d46B5279700f9DF786054aa5eE5"],
  name: "Rarible",
  homepage: "https://rarible.com",
  creatorOfPageUrl: ({ creatorOfAddress }) =>
    `https://app.rarible.com/user/${creatorOfAddress}`,
  mediaPageUrl: ({ contract, tokenId }) =>
    `https://app.rarible.com/token/${contract}:${tokenId}`,
}
