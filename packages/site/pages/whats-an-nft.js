import Head from "next/head"

export default function WhatsNFT() {
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
      </Box>
    </>
  )
}
