export default {
  addresses: ["0x60F80121C31A0d46B5279700f9DF786054aa5eE5"],
  name: "Rarible",
  homepage: "https://rarible.com",
  creatorPageUrl: ({ creatorOfAddress }) =>
    `https://app.rarible.com/user/${creatorOfAddress}`,
  mediaPageUrl: ({ metadata }) => metadata.external_url,
}
