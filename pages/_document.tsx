import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh-cn">
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              try {
                if (localStorage['bv-doc-theme'] === 'dark' || (!('bv-doc-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark')
                  localStorage.setItem('bv-doc-theme','dark')
                } else {
                  document.documentElement.classList.remove('dark')
                }
              } catch (_) {}
              `,
            }}
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

export default MyDocument;
