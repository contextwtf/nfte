import Link from "next/link"
import Box from "@components/Box"
import CodeBlock from "@components/CodeBlock"
import InlineCode from "@components/InlineCode"
import Footer from "@components/Footer"

export default function Docs() {
  return (
    <Box as="main" css={{ maxWidth: 680, mx: "auto", py: "@3" }}>
      <Link href="/" passHref>
        <Box
          as="a"
          css={{
            display: "flex",
            alignItems: "baseline",
            m: 0,
            mb: "@3",
            pb: "@2",
            borderBottom: "1px solid @border",
            color: "currentcolor",
            textDecoration: "none",
          }}
        >
          <Box
            css={{ fontSize: "@3", fontFamily: "@body", fontWeight: 700, m: 0 }}
          >
            NFTE
          </Box>
          <Box css={{ fontSize: "@1", fontWeight: 400, m: 0, ml: "@1" }}>
            Easily embed NFT's in your website
          </Box>
        </Box>
      </Link>

      <Box css={{ fontSize: "@3", fontWeight: 700, mb: "@2" }}>
        Installation
      </Box>
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

      <Box css={{ mb: "@4" }}>
        <Box css={{ fontWeight: 700, mb: "@1" }}>React</Box>
        <Box css={{ mb: "@1" }}>
          Install with <InlineCode>npm i @nftmark/react</InlineCode> or{" "}
          <InlineCode>yarn add @nftmark/react</InlineCode>
        </Box>
        <CodeBlock code={`<NFTEmbed contract="0x..." tokenId="1"/>`} />
      </Box>

      <Box css={{ borderTop: "1px solid @border", my: "@5" }} />

      <Box css={{ fontSize: "@3", fontWeight: 700, mb: "@2", mt: 0 }}>
        Configuration
      </Box>
      <Box css={{ mb: "@4" }}>
        <Box css={{ fontWeight: 700, mb: 0 }}>HTML/JS snippet - Parameters</Box>

        <Box as="p">
          <InlineCode>?contract=[contract address]</InlineCode> - (Required) The
          NFTs Ethereum contract address
        </Box>
        <Box as="p">
          <InlineCode>?tokenId=[token ID]</InlineCode> - (Required) The NFTs
          token ID
        </Box>
        <Box as="p">
          <InlineCode>?darkMode=0</InlineCode> - Enables dark mode for the embed
        </Box>
      </Box>

      <Box css={{ mb: "@4" }}>
        <Box css={{ fontWeight: 700, mb: 0 }}>React component - Props</Box>

        <Box as="p">
          <InlineCode>contract=[contract address]</InlineCode> - String -
          (Required) The NFTs Ethereum contract address
        </Box>
        <Box as="p">
          <InlineCode>tokenId=[token ID]</InlineCode> - String - (Required) The
          NFTs token ID
        </Box>
        <Box as="p">
          <InlineCode>darkMode</InlineCode> - Boolean - Enables dark mode for
          the embed
        </Box>
        <Box as="p">
          <InlineCode>className</InlineCode> - String - CSS class name, this
          allows using CSS in JS solutions to override styles
        </Box>
        <Box as="p">
          <InlineCode>style</InlineCode> - Object - Inline styles that are
          applied to the top level wrapper element
        </Box>
      </Box>

      <Box>Add a known contract</Box>

      <Box>Embed structure</Box>

      <Footer />
    </Box>
  )
}
