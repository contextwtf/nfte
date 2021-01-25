import Box from "@components/Box"

export default function InlineCode({ children }) {
  return (
    <Box
      as="span"
      css={{
        display: "inline-block",
        fontFamily: "@mono",
        backgroundColor: "#faf7fc",
        color: "#994cc3",
        whiteSpace: "nowrap",
        px: "@1",
        pt: 0,
        pb: 0,
        borderRadius: 5,
      }}
    >
      {children}
    </Box>
  )
}
