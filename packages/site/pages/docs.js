import Link from "next/link"
import Box from "@components/Box"
import CodeBlock from "@components/CodeBlock"
import InlineCode from "@components/InlineCode"
import Footer from "@components/Footer"

export default function Docs() {
  return (
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
            css={{ fontSize: "@3", fontFamily: "@body", fontWeight: 700, m: 0 }}
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
            <Link href="#installation" passHref>
              <Box as="a" css={{ color: "currentcolor" }}>
                Installation
              </Box>
            </Link>
          </Box>
          <Box as="li" css={{ mb: "@0" }}>
            <Link href="#configuration" passHref>
              <Box as="a" css={{ color: "currentcolor" }}>
                Configuration
              </Box>
            </Link>
          </Box>
          <Box as="li" css={{ mb: "@0" }}>
            <Link href="#data-structure" passHref>
              <Box as="a" css={{ color: "currentcolor" }}>
                Embeds data structure
              </Box>
            </Link>
          </Box>
          <Box as="li" css={{ mb: "@0" }}>
            <Link href="#known-contracts" passHref>
              <Box
                as="a"
                href="/#known-contracts"
                css={{ color: "currentcolor" }}
              >
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

      <Box
        id="configuration"
        css={{ fontSize: "@3", fontWeight: 700, mb: "@2", mt: 0 }}
      >
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
          <InlineCode>contract=[contract address]</InlineCode>{" "}
          <strong>String</strong> - (Required) The NFTs Ethereum contract
          address
        </Box>
        <Box as="p">
          <InlineCode>tokenId=[token ID]</InlineCode> <strong>String</strong> -
          (Required) The NFTs token ID
        </Box>
        <Box as="p">
          <InlineCode>darkMode</InlineCode> <strong>Boolean</strong> - Enables
          dark mode for the embed
        </Box>
        <Box as="p">
          <InlineCode>className</InlineCode> <strong>String</strong> - CSS class
          name, this allows using CSS in JS solutions to override styles
        </Box>
        <Box as="p">
          <InlineCode>style</InlineCode> <strong>Object</strong> - Inline styles
          that are applied to the top level wrapper element
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
        However, if the contract that minted the NFT is a known contract in NFTE
        then extra functionality will be enabled such as deep-linking and
        displaying the name of the platform it was minted on.
      </Box>

      <Box as="p">
        If you would like to learn how to add a known contract skip to the next
        section.
      </Box>

      <Box as="img" src="/nfte.png" css={{ maxWidth: "100%", mb: "@2" }} />

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
            Platorm
          </Box>{" "}
          - will show the creators platform username if a known contract file is
          found and <InlineCode>usernamePath</InlineCode> is set to a value in
          the metadata.
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
          file is found and a value is present for{" "}
          <InlineCode>creatorPageUrl</InlineCode>. The property takes a function
          and the following data is passed as the argument{" "}
          <InlineCode>{`{ contract,
          tokenId,
          metadata,
          symbol, 
          creatorOfAddress }`}</InlineCode>
          .
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
          - will use media from another location in the metadata if a known
          contract file is found and <InlineCode>mediaPath</InlineCode> is set
          to a corresponding value in the metadata.
        </Box>
      </Box>

      <Box css={{ mb: "@3" }}>
        <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
          Media URL
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
          - links to the media profile on the platform if a known contract file
          is found and a value is present for{" "}
          <InlineCode>mediaPageUrl</InlineCode>. The property takes a function
          and the following data is passed as the argument{" "}
          <InlineCode>{`{ contract,
          tokenId,
          metadata,
          symbol,
          creatorOfAddress }`}</InlineCode>
          .
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
          - will use the ERC-721 standard <InlineCode>name</InlineCode> property
          from the metadata
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
          - will use path <InlineCode>description</InlineCode> property from the
          metadata
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
      </Box>

      <Box css={{ mb: "@3" }}>
        <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
          Minted By
        </Box>
        <Box as="p" css={{ m: 0, mb: "@1" }}>
          <Box as="span" css={{ fontWeight: 700 }}>
            Base data
          </Box>{" "}
          - will show the ethereum address of the contract that minted the token
        </Box>
        <Box as="p" css={{ m: 0, mb: "@1" }}>
          <Box as="span" css={{ fontWeight: 700 }}>
            Platform
          </Box>{" "}
          - will use the platform name specified in the known contracts file{" "}
          <InlineCode>name</InlineCode> property if a known contracts file is
          found
        </Box>
      </Box>

      <Box css={{ mb: "@3" }}>
        <Box as="p" css={{ fontWeight: 700, fontSize: "@2", m: 0 }}>
          Minted By URL
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
          - links to the platforms home page if a known contracts file is found
          and contains the <InlineCode>homepage</InlineCode> property.
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
        If you are the owner of a contract that mints NFTs and would like to add
        enhanced data to NFTE then please create a Pull Request.
      </Box>

      <Box as="p" css={{ m: 0, mb: "@1" }}>
        <strong>Currently supported</strong>
        <Box as="ul" css={{ pl: "@3" }}>
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
        </Box>
        <strong>Would like</strong>
        <Box as="ul" css={{ pl: "@3" }}>
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

      <Box as="p" css={{ m: 0, mb: "@1" }}>
        1. You should create a Javascript file named after your project or
        platform in the <InlineCode>/knownContracts</InlineCode> folder
      </Box>

      <Box as="p" css={{ m: 0, mb: "@1" }}>
        2. The contents can be any of the following properties
        <Box as="ul" css={{ pl: "@3" }}>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>addresses</InlineCode> -{" "}
            <strong>array (Required)</strong> An array containing one of more
            contract addresses that mint the NFTs for your project
          </Box>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>name</InlineCode> - <strong>string</strong> The name of
            the project or platform as you would like it displayed in the embed
          </Box>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>homepage</InlineCode> - <strong>string</strong> The
            homepage URL of your project or platform
          </Box>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>creatorNamePath</InlineCode> - <strong>string</strong>{" "}
            The object path as a dot notated string to the location in the
            metadata file where the creator name can be found
          </Box>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>creatorPageUrl</InlineCode> -{" "}
            <strong>
              function{" "}
              {`<{ contract,
          tokenId,
          metadata,
          symbol, 
          creatorOfAddress }>`}
            </strong>{" "}
            Should return the url of the creators profile page on the project or
            platform
          </Box>
          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>mediaUrl</InlineCode> -{" "}
            <strong>
              function{" "}
              {`<{ contract,
          tokenId,
          metadata,
          symbol, 
          creatorOfAddress }>`}
            </strong>{" "}
            Should return the url of the media file. If you are using the
            ERC-721 <InlineCode>image</InlineCode> standard property this
            property is not required
          </Box>

          <Box as="li" css={{ mb: "@1" }}>
            <InlineCode>mediaPageUrl</InlineCode> -{" "}
            <strong>
              function{" "}
              {`<{ contract,
          tokenId,
          metadata,
          symbol,
          creatorOfAddress }>`}
            </strong>{" "}
            Should return the url of the tokens page on the project or platform
          </Box>
        </Box>
      </Box>

      <Box as="p" css={{ m: 0, mb: "@3" }}>
        3. Import then export the file from the{" "}
        <InlineCode>knownContracts/index.js</InlineCode> file.
      </Box>

      <Footer />
    </Box>
  )
}
