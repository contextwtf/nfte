import { useState } from "react"
import { useDebounce } from "use-debounce"
import Link from "next/link"
import Head from "next/head"
import sample from "lodash/sample"
import Box from "@components/Box"
import CodeBlock from "@components/CodeBlock"
import InlineCode from "@components/InlineCode"
import Footer from "@components/Footer"
import { NFTE } from "@nfte/react"

import previewNFTs from "utils/previewNFTs"

export default function Home() {
  const [randomNFT, setRandomNFT] = useState(sample(previewNFTs))
  const [contract, setContract] = useState("")
  const [tokenId, setTokenId] = useState("")
  const [debouncedContract] = useDebounce(contract, 1000)
  const [debouncedTokenId] = useDebounce(tokenId, 1000)

  return (
    <>
      <Head>
        <title>NFTE - Embed NFT's in your site</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
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
          A universal way of embedding NFTs in your website or app, works with
          any ERC-721 contract. Bringing The Metaverse to Web2.
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
          <Box css={{ width: "100%", fontWeight: 700 }}>
            React or JS snippet
          </Box>
          <Box css={{ width: "100%", fontWeight: 700 }}>Free</Box>
          <Box css={{ width: "100%", fontWeight: 700 }}>
            Tiny size (&lt;4KB)
          </Box>
          <Box css={{ width: "100%", fontWeight: 700 }}>Dark mode</Box>
        </Box>

        <Box
          css={{
            display: "flex",
            justifyContent: "center",
            mb: "@4",
            pb: "@4",
            borderBottom: "1px solid @border",
          }}
        >
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

        <Box css={{ fontSize: "@3", fontWeight: 700, mb: "@2" }}>
          Try it out
        </Box>

        <Box
          css={{
            display: "flex",

            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Box
            css={{
              display: "flex",
              flexDirection: "column",
              mx: "@2",
              mb: "@3",
            }}
          >
            <Box as="label" css={{ fontWeight: 700, mb: "@1" }}>
              Contract address
            </Box>
            <Box
              as="input"
              css={{
                display: "block",
                fontFamily: "@mono",
                fontSize: "@1",
                border: "1px solid @text",
                borderRadius: 5,
                px: "@1",
                py: "@0",
              }}
              placeholder="0x...."
              value={contract}
              onChange={(e) => setContract(e.target.value)}
            />
          </Box>

          <Box
            css={{
              display: "flex",
              flexDirection: "column",
              mx: "@2",
              mb: "@3",
            }}
          >
            <Box as="label" css={{ fontWeight: 700, mb: "@1" }}>
              Token ID
            </Box>
            <Box
              as="input"
              css={{
                display: "block",
                fontFamily: "@mono",
                fontSize: "@1",
                border: "1px solid @text",
                borderRadius: 5,
                px: "@1",
                py: "@0",
              }}
              placeholder="1"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
          </Box>

          <Box css={{ alignSelf: "flex-end", mb: "@3" }}>or</Box>
          <Box
            as="button"
            css={{
              alignSelf: "flex-end",
              border: "none",
              borderRadius: 5,
              backgroundColor: "@text",
              color: "@bg",
              px: "@3",
              py: "@2",
              textDecoration: "none",
              fontSize: "@0",
              fontWeight: 700,
              mx: "@2",
              mb: "@3",
              cursor: "pointer",
            }}
            onClick={() => setRandomNFT(sample(previewNFTs))}
          >
            Get random NFT
          </Box>
        </Box>

        <Box css={{ mb: "@4" }}>
          <NFTE
            contract={
              debouncedContract.length === 0
                ? randomNFT.contract
                : debouncedContract
            }
            tokenId={
              debouncedTokenId.length === 0
                ? randomNFT.tokenId
                : debouncedTokenId
            }
            style={{ marginLeft: "auto", marginRight: "auto" }}
          />
        </Box>

        <Box css={{ fontSize: "@3", fontWeight: 700, mb: "@2" }}>
          Quickstart
        </Box>
        <Box css={{ mb: "@3" }}>
          <Box css={{ fontWeight: 700, mb: "@1" }}>HTML/JS snippet</Box>
          <Box css={{ mb: "@1" }}>
            Copy/paste into your site and add the{" "}
            <InlineCode>contract</InlineCode> and{" "}
            <InlineCode>tokenId</InlineCode> parameters
          </Box>
          <CodeBlock
            code={`<div className="nft-embed"></div>
<script
  async
  src="https://nfte.app/api/embed.js?
  contract={contract address}&tokenId={token ID}">
</script>`}
          />
        </Box>

        <Box css={{ mb: "@4" }}>
          <Box css={{ fontWeight: 700, mb: "@1" }}>React</Box>
          <Box css={{ mb: "@1" }}>
            Install with <InlineCode>npm i @nfte/react</InlineCode> or{" "}
            <InlineCode>yarn add @nfte/react</InlineCode>
          </Box>
          <CodeBlock
            code={`import { NFTE } from '@nfte/react';

<NFTE contract="0x..." tokenId="1"/>`}
          />
        </Box>

        <Footer />
      </Box>
    </>
  )
}
