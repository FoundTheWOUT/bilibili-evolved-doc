import "@docsearch/css";
import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { MDXPage } from "components/MDXPage";
import { ThemeProvider } from "components/ThemeProvider";

function App({ Component, pageProps }: AppProps) {
  const isMDX = (Component as any).isMDXComponent;

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider>
        <div className="min-h-screen dark:bg-stone-900">
          {isMDX ? (
            <MDXPage>
              <Component {...pageProps} />
            </MDXPage>
          ) : (
            <Component {...pageProps} />
          )}
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
