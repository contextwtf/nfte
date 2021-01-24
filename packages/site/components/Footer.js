import Box from "@components/Box"

export default function Footer() {
  return (
    <Box css={{ borderTop: "1px solid @border", pt: "@3", display: "flex" }}>
      <Box
        as="a"
        href="https://github.com/sammdec/nfte"
        target="_blank"
        css={{ fontSize: "@0", color: "currentcolor" }}
      >
        GitHub
      </Box>
      <Box as="p" css={{ fontSize: "@0", my: 0, ml: "auto" }}>
        Created by{" "}
        <Box
          as="a"
          href="https://twitter.com/sammdec"
          target="_blank"
          css={{ color: "currentcolor" }}
        >
          @sammdec
        </Box>
      </Box>
    </Box>
  )
}
