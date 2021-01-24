import React from "react"
import NextDocument from "next/document"
import { css } from "../stitches.config"

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    let extractedStyles
    ctx.renderPage = () => {
      const { styles, result } = css.getStyles(originalRenderPage)
      extractedStyles = styles
      return result
    }

    const initialProps = await NextDocument.getInitialProps(ctx)

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}

          {extractedStyles?.map((content, index) => (
            <style key={index} dangerouslySetInnerHTML={{ __html: content }} />
          ))}
        </>
      ),
    }
  }
}
