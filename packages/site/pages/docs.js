import Link from "next/link"
import Head from "next/head"
import Box from "@components/Box"
import CodeBlock from "@components/CodeBlock"
import InlineCode from "@components/InlineCode"
import Footer from "@components/Footer"

export default function Docs() {
  return (
    <>
      <Head>
        <title>NFTE Docs - Embed NFT's in your site</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Box as="main" css={{ maxWidth: 740, mx: "auto", py: "@3", px: "@2" }}>
        <Link href="/" passHref>
          <Box
            as="a"
            css={{
              display: "flex",
              alignItems: "baseline",
              m: 0,
              mb: "@4",
              pb: "@2",
              borderBottom: "1px solid @border",
              color: "currentcolor",
              textDecoration: "none",
            }}
          >
            <Box
              css={{
                fontSize: "@3",
                fontFamily: "@body",
                fontWeight: 700,
                m: 0,
              }}
            >
              NFTE
            </Box>
            <Box css={{ fontSize: "@1", fontWeight: 400, m: 0, ml: "@1" }}>
              Embed NFTs in your website or app
            </Box>
          </Box>
        </Link>

        <Box>
          <Box as="ul" css={{ pl: "@3" }}>
            <Box as="li" css={{ mb: "@0" }}>
              <Link href="/docs#installation" passHref>
                <Box as="a" css={{ color: "currentcolor" }}>
                  Installation
                </Box>
              </Link>
            </Box>
            <Box as="li" css={{ mb: "@0" }}>
              <Link href="/docs#configuration" passHref>
                <Box as="a" css={{ color: "currentcolor" }}>
                  Configuration
                </Box>
              </Link>
            </Box>
            <Box as="li" css={{ mb: "@0" }}>
              <Link href="/docs#data-structure" passHref>
                <Box as="a" css={{ color: "currentcolor" }}>
                  Embeds data structure
                </Box>
              </Link>
            </Box>
            <Box as="li" css={{ mb: "@0" }}>
              <Link href="/docs#known-contracts" passHref>
                <Box as="a" css={{ color: "currentcolor" }}>
                  Adding a known contract
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box css={{ borderTop: "1px solid @border", my: "@5" }} />

        <Box
          id="installation"
          css={{ fontSize: "@3", fontWeight: 700, mb: "@2" }}
        >
          Installation
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

        <Box
          id="configuration"
          css={{ fontSize: "@3", fontWeight: 700, mb: "@2", mt: 0 }}
        >
          Configuration
        </Box>
        <Box css={{ mb: "@4" }}>
          <Box css={{ fontWeight: 700, mb: 0 }}>
            HTML/JS snippet - Parameters
          </Box>

          <Box as="p">
            <InlineCode>?contract=[contract address]</InlineCode> - (Required)
            The NFTs Ethereum contract address
          </Box>
          <Box as="p">
            <InlineCode>?tokenId=[token ID]</InlineCode> - (Required) The NFTs
            token ID
          </Box>
          <Box as="p">
            <InlineCode>?darkMode=0</InlineCode> - Enables dark mode for the
            embed
          </Box>
        </Box>

        <Box css={{ mb: "@4" }}>
          <Box css={{ fontWeight: 700, mb: 0 }}>React component - Props</Box>

          <Box as="p">
            <InlineCode>contract=[contract address]</InlineCode>{" "}
            <strong>String</strong> - (Required) The NFTs Ethereum contract
            address
          </Box>
          <Box as="p">
            <InlineCode>tokenId=[token ID]</InlineCode> <strong>String</strong>{" "}
            - (Required) The NFTs token ID
          </Box>
          <Box as="p">
            <InlineCode>darkMode</InlineCode> <strong>Boolean</strong> - Enables
            dark mode for the embed
          </Box>
          <Box as="p">
            <InlineCode>className</InlineCode> <strong>String</strong> - CSS
            class name, this allows using CSS in JS solutions to override styles
          </Box>
          <Box as="p">
            <InlineCode>style</InlineCode> <strong>Object</strong> - Inline
            styles that are applied to the top level wrapper element
          </Box>
        </Box>

        <Box css={{ borderTop: "1px solid @border", my: "@5" }} />

        <Box
          id="data-structure"
          css={{ fontSize: "@3", fontWeight: 700, mb: "@2", mt: 0 }}
        >
          Embeds data structure
        </Box>

        <Box as="p">
          NFTE works in a progressively enhanced way, this means that as long as
          your token contract is ERC-721 compliant then the embed will work.
        </Box>

        <Box as="p">
          However, if the contract that minted the NFT is a known contract in
          NFTE then extra functionality will be enabled such as deep-linking and
          displaying the name of the platform it was minted on.
        </Box>

        <Box as="p">
          If you would like to learn how to add a known contract skip to the
          next section.
        </Box>

        <Box as="img" src="/nfte.png" css={{ maxWidth: "100%", mb: "@4" }} />

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Creator
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will show the creators contract address
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              ENS name
            </Box>{" "}
            - will show the creators ENS name if one exists on the address
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will show the creators platform username if a known contract file
            is found and the <InlineCode>getContractData</InlineCode> function
            returns a value for<InlineCode>creatorOf</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Creator URL
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - links to the creators address on Etherscan
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - links to the creators profile on the platform if a known contract
            file is found and the <InlineCode>getContractData</InlineCode>{" "}
            function returns a value for<InlineCode>creatorOfUrl</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Media
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will use the ERC-721 standard <InlineCode>image</InlineCode>{" "}
            property from the metadata
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will be the URL to the NFT's media file if a known contract file
            is found and the <InlineCode>getContractData</InlineCode> function
            returns a value for<InlineCode>mediaUrl</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            MediaPageURL
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - links to the contract address and token ID on Etherscan
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will be the URL to the NFT's page on the platform if a known
            contract file is found and the{" "}
            <InlineCode>getContractData</InlineCode> function returns a value
            for<InlineCode>mediaPageUrl</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Name
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will use the ERC-721 standard <InlineCode>name</InlineCode>{" "}
            property from the metadata
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will be the name of the NFT if a known contract file is found. The{" "}
            <InlineCode>getContractData</InlineCode> function should return a
            value for<InlineCode>name</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Description
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will use the ERC-721 standard <InlineCode>description</InlineCode>{" "}
            property from the metatdata.
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will be the description of the NFT if a known contract file is
            found. The <InlineCode>getContractData</InlineCode> function should
            return a value for<InlineCode>description</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Current Owner
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will show the owners contract address
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              ENS name
            </Box>{" "}
            - will show the owners ENS name if one exists on the address
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will show the owners platform username if a known contract file is
            found and the <InlineCode>getContractData</InlineCode> function
            returns a value for<InlineCode>ownerOf</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Current Owner URL
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - links to the current owners address on Etherscan
          </Box>

          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will link to the current owners profile on the platform if a known
            contract file is found and the{" "}
            <InlineCode>getContractData</InlineCode> function returns a value
            for<InlineCode>ownerOfUrl</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Platform
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will show the ethereum address of the contract that minted the
            token
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will show the platform name if a known contract file is found and
            the <InlineCode>getContractData</InlineCode> function returns a
            value for<InlineCode>platform</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Platform URL
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - links to the contract that minted the token on Etherscan
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Platform
            </Box>{" "}
            - will link to platforms homepage if a known contract file is found
            and the <InlineCode>getContractData</InlineCode> function returns a
            value for<InlineCode>platformUrl</InlineCode>.
          </Box>
        </Box>

        <Box css={{ mb: "@3" }}>
          <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
            Minted On
          </Box>
          <Box as="p" css={{ m: 0, mb: "@1" }}>
            <Box as="span" css={{ fontWeight: 700 }}>
              Base data
            </Box>{" "}
            - will show the date the token was minted in UTC
          </Box>
        </Box>

        <Box css={{ borderTop: "1px solid @border", my: "@5" }} />

        <Box
          id="known-contracts"
          css={{ fontSize: "@3", fontWeight: 700, mb: "@2", mt: 0 }}
        >
          Adding a known contract
        </Box>
        <Box as="p" css={{ m: 0, mb: "@1" }}>
          If you are the owner of a contract that mints NFTs and would like to
          add enhanced data to NFTE then please create a Pull Request.
        </Box>

        <Box css={{ m: 0, mb: "@1" }}>
          <strong>Currently supported</strong>
          <Box as="ul" css={{ pl: "@3", mb: "@4", mt: "@1" }}>
            <Box as="li" css={{ mb: "@1" }}>
              Async Art
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              EthBlock.art
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              Foundation
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              Rarible
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              SuperRare
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              Zora
            </Box>
          </Box>
          <strong>Would like</strong>
          <Box as="ul" css={{ pl: "@3", mb: "@4", mt: "@1" }}>
            <Box as="li" css={{ mb: "@1" }}>
              Cryptokitties
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              CryptoPunks
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              ENS
            </Box>
          </Box>
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          1. You should create a Javascript file named after your project or
          platform in the{" "}
          <InlineCode>
            <Box
              as="a"
              href="https://github.com/sammdec/nfte/tree/main/packages/site/knownContracts"
              css={{ textDecoration: "underline", color: "currentColor" }}
            >
              packages/site/knownContracts
            </Box>
          </InlineCode>{" "}
          folder
        </Box>

        <Box css={{ m: 0, mb: "@3" }}>
          2. The contents should be an object that contains the following
          properties
          <Box as="ul" css={{ pl: "@3", mb: "@4", mt: "@1" }}>
            <Box as="li" css={{ mb: "@1" }}>
              <InlineCode>addresses</InlineCode> -{" "}
              <strong>array (Required)</strong> An array containing one of more
              contract addresses that mint the NFTs for your project
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              <InlineCode>abi</InlineCode> - <strong>string</strong> If the
              contract extends the ERC-721 functionality you should upload the
              abi here.
            </Box>
            <Box as="li" css={{ mb: "@1" }}>
              <InlineCode>getContractData</InlineCode> -{" "}
              <strong>function</strong> A function that returns the values used
              in the embed.
            </Box>
          </Box>
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          3. Import then export the file from the{" "}
          <InlineCode>
            <Box
              as="a"
              href="https://github.com/sammdec/nfte/tree/main/packages/site/knownContracts/index.js"
              css={{ textDecoration: "underline", color: "currentColor" }}
            >
              packages/site/knownContracts/index.js
            </Box>
          </InlineCode>{" "}
          file.
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          4. The next step is to use the{" "}
          <InlineCode>getContractData</InlineCode> function to get the various
          pieces of information that are needed, the function contains 2
          ethers.js instances, <InlineCode>Contract</InlineCode> uses the
          Cloudflare provider and should be used for the majority of functions.{" "}
          <InlineCode>ContractHistorical</InlineCode> uses an Infura provider
          and should be used for occassions where past block history is needed.
          The <InlineCode>tokenId</InlineCode> is also passed in as a string
          value. The function should return an object with the following
          properties.
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>name</InlineCode> - This should be the name of the
          creation
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>description</InlineCode> - This should resolve to the
          description if any
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>ownerOf</InlineCode> - This should be the Ethereum address
          of the current owner of the token
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>ownerOfUrl</InlineCode> - The url that points to the
          owners profile on the platform
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>creatorOf</InlineCode> - This should be the Ethereum
          address of the creator of the token
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>creatorOfUrl</InlineCode> - The url that points to the
          creators profile on the platform
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>mediaUrl</InlineCode> - The url of the media file
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>mediaPageUrl</InlineCode> - The url of the media files
          page on the platform
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>platform</InlineCode> - The name of the platform
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>platformUrl</InlineCode> - The url to the platforms
          homepage
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          <InlineCode>blockNumber</InlineCode> - The blockNumber when the token
          was minted
        </Box>

        <Box as="p" css={{ m: 0, mb: "@3" }}>
          You can see the canonical ERC-721 example here{" "}
          <InlineCode>
            <Box
              as="a"
              href="https://github.com/sammdec/nfte/tree/main/packages/site/utils/getNFTData.js#L11"
              css={{ textDecoration: "underline", color: "currentColor" }}
            >
              packages/site/utils/getNFTData.js
            </Box>
          </InlineCode>
        </Box>

        <Footer />
      </Box>
    </>
  )
}
