import Box from "@components/Box"

export default function Footer() {
  return (
    <Box css={{ borderTop: "1px solid @border", pt: "@3", display: "flex" }}>
      <Box as="p" css={{ fontSize: "@0" }}>
        Created by{" "}
        <Box
          as="a"
          href="https://twitter.com/sammdec"
          css={{ color: "currentcolor" }}
        >
          @sammdec
        </Box>
      </Box>
    </Box>
  )
}
