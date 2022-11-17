import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: [initialProps.styles, sheet.getStyleElement()],
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="es">
        <Head>
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="theme-color" content="#663399" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="shortcut icon" href="/assets/icons/icon-48x48.png" />
          <link
            rel="apple-touch-icon"
            sizes="48x48"
            href="/assets/icons/icon-48x48.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/assets/icons/icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="96x96"
            href="/assets/icons/icon-96x96.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/assets/icons/icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="/assets/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="/assets/icons/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="/assets/icons/icon-384x384.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="/assets/icons/icon-512x512.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
