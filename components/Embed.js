import { styled } from "stitches.config"

const Wrapper = styled("div", { color: "red" })

export default function Embed({ name }) {
  return <Wrapper>{name}</Wrapper>
}
