import Box from "@components/Box"

export default function InlineCode({ children }) {
  return (
    <Box
      css={{
        display: "inline-block",
        fontFamily: "@mono",
        backgroundColor: "#faf7fc",
        color: "#994cc3",
        whiteSpace: "nowrap",
        px: "@1",
        pt: 2,
        pb: 2,
        borderRadius: 5,
      }}
    >
      {children}
    </Box>
  )
}
