import { LiveProvider, LiveEditor } from "react-live"
import theme from "prism-react-renderer/themes/nightOwlLight"
import Box from "@components/Box"

export default function CodeBlock({ code, css }) {
  return (
    <Box
      css={{
        border: "1px solid @border",
        borderRadius: 5,
        overflow: "hidden",
        ...css,
      }}
    >
      <LiveProvider code={code} disabled theme={theme}>
        <LiveEditor />
      </LiveProvider>
    </Box>
  )
}
