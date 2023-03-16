import React from "react";
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Main,
  Head,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: [
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>,
        ],
      };
    } finally {
      sheet.seal();
    }
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link rel="manifest" href="site.webmanifest" />
          <link
            rel="stylesheet"
            as="style"
            href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
          />
          <meta property="og:site_name" content="온라인 저지" />
        </Head>
        <body>
          <Main />
          <div id="portal" />
          <div id="notification-portal" />
          <NextScript />
        </body>
      </Html>
    );
  }
}
