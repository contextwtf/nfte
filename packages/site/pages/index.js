import Link from "next/link"
import sample from "lodash/sample"
import Box from "@components/Box"
import CodeBlock from "@components/CodeBlock"
import InlineCode from "@components/InlineCode"
import Footer from "@components/Footer"
import { NFTE } from "@nfte/react"

import previewNFTs from "utils/previewNFTs"

const previewNFT = sample(previewNFTs)

export default function Home() {
  return (
    <Box as="main" css={{ maxWidth: 740, mx: "auto", py: "@3", px: "@2" }}>
      <Box
        as="h1"
        css={{
          fontSize: "@4",
          fontFamily: "@body",
          fontWeight: 700,
          textAlign: "center",
          m: 0,
          mb: "@1",
        }}
      >
        NFTE
      </Box>

      <Box
        as="p"
        css={{
          fontSize: "@2",
          color: "@textLight",
          textAlign: "center",
          m: 0,
          mb: "@3",
          px: "@3",
        }}
      >
        A universal way of embedding NFTs in your website or app, works with any
        ERC-721 contract. Bring The Metaverse to Web2.
      </Box>

      <Box
        css={{
          display: "flex",
          mb: "@4",
          pb: "@4",
          textAlign: "center",
          borderBottom: "1px solid @border",
          alignItems: "center",
        }}
      >
        <Box css={{ width: "100%", fontWeight: 700 }}>React or JS snippet</Box>
        <Box css={{ width: "100%", fontWeight: 700 }}>Free</Box>
        <Box css={{ width: "100%", fontWeight: 700 }}>
          Tiny size (&lt;3.5KB)
        </Box>
        <Box css={{ width: "100%", fontWeight: 700 }}>Dark mode</Box>
      </Box>

      <Box css={{ display: "flex", justifyContent: "center", mb: "@4" }}>
        <Link href="/docs" passHref>
          <Box
            as="a"
            css={{
              display: "inline-flex",
              borderRadius: 5,
              backgroundColor: "@text",
              color: "@bg",
              px: "@3",
              py: "@2",
              textDecoration: "none",
              fontWeight: 700,
              mx: "@2",
            }}
          >
            Documentation
          </Box>
        </Link>

        <Box
          as="a"
          href="https://github.com/sammdec/nfte"
          target="_blank"
          css={{
            display: "inline-flex",
            color: "currentcolor",
            px: "@3",
            py: "@2",
            fontWeight: 700,
            mx: "@2",
          }}
        >
          GitHub
        </Box>
      </Box>

      <Box css={{ fontSize: "@3", fontWeight: 700, mb: "@2" }}>Quickstart</Box>
      <Box css={{ mb: "@3" }}>
        <Box css={{ fontWeight: 700, mb: "@1" }}>HTML/JS snippet</Box>
        <Box css={{ mb: "@1" }}>
          Copy/paste into your site and add the{" "}
          <InlineCode>contract</InlineCode> and <InlineCode>tokenId</InlineCode>{" "}
          parameters
        </Box>
        <CodeBlock
          code={`<div className="nft-embed"></div>
<script
  async
  src="https://nftmark.net/api/embed.js?
  contract={contract address}&tokenId={token ID}">
</script>`}
        />
      </Box>

      <Box css={{ mb: "@2" }}>
        <Box css={{ fontWeight: 700, mb: "@1" }}>React</Box>
        <Box css={{ mb: "@1" }}>
          Install with <InlineCode>npm i @nftmark/react</InlineCode> or{" "}
          <InlineCode>yarn add @nftmark/react</InlineCode>
        </Box>
        <CodeBlock code={`<NFTEmbed contract="0x..." tokenId="1"/>`} />
      </Box>

      <Box css={{ mb: "@4" }}>
        <NFTE
          contract={previewNFT.contract}
          tokenId={previewNFT.tokenId}
          style={{ marginLeft: "auto", marginRight: "auto" }}
        />
      </Box>

      <Footer />
    </Box>
  )
}
