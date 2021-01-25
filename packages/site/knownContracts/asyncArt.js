import get from "lodash/get"

export default {
  addresses: ["0xb6dAe651468E9593E4581705a09c10A76AC1e0c8"],
  name: "Async Art",
  homepage: "https://async.art",
  creatorOf: ({ metadata }) => get(metadata, "artistName"),
  mediaUrl: ({ metadata, creatorOfAddress }) =>
    `https://res.cloudinary.com/asynchronous-art-inc/image/upload/f_auto/art/${creatorOfAddress}/${metadata.image}.png`,
}
