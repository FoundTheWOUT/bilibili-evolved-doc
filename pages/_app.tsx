import "@docsearch/css";
import "../styles/fonts.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "components/ThemeProvider";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <ThemeProvider>
        <div className="min-h-screen dark:bg-stone-900">
          <Component {...pageProps} />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
