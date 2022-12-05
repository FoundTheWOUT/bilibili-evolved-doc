import Toc from "./Toc";
import Footer from "./Footer";
import Head from "next/head";
import type { TocHeader } from "./Toc";
import React, { PropsWithChildren } from "react";

export interface RemarkHeading {
  id: string;
  depth: number;
  title: string;
  type: string;
}

export interface FrontMatter {}

const MDXFrontMatter = React.createContext({});

export default function MDXWrapper({
  headings,
  router,
  meta,
  children,
}: PropsWithChildren<{
  headings: RemarkHeading[];
  meta: FrontMatter;
  router: any;
}>) {
  const headers: TocHeader[] = headings.map((header) => ({
    url: `#${header.id}`,
    depth: header.depth - 1,
    text: header.title,
  }));

  return (
    <>
      <Head>
        <title>bilibili-evolved-doc</title>
      </Head>

      <MDXFrontMatter.Provider value={meta}>
        <div className="h-full max-w-[100rem] lg:flex flex-1 mx-auto">
          {/* context */}
          <div className="lg:w-4/5">
            <article id="article" className="dark:text-white">
              {children}
            </article>
            <Footer routerTree={router} />
          </div>
          <Toc headers={headers} />
        </div>
      </MDXFrontMatter.Provider>
    </>
  );
}
