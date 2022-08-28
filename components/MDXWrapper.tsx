import Toc from "./Toc";
import Footer from "./Footer";
import Head from "next/head";
import type { TocHeader } from "./Toc";
import { useRouterTree } from "hooks/useRouterTree";
import React, { PropsWithChildren } from "react";

export interface RemarkHeading {
  id: string;
  depth: number;
  title: string;
  type: string;
}

export interface FrontMatter {}

const MDXFrontMatter = React.createContext({});

export default function MDXWrapper(
  props: PropsWithChildren<{
    headings: RemarkHeading[];
    meta: FrontMatter;
  }>
) {
  console.log(props);
  // TODO: get props hear
  const { headings, meta } = props;
  const headers: TocHeader[] =
    headings?.map((header) => ({
      url: `#${header.id}`,
      depth: header.depth - 1,
      text: header.title,
    })) ?? [];

  const { tree: routerTree } = useRouterTree();

  return (
    <>
      <Head>
        <title>bilibili-evolved-doc</title>
      </Head>

      <MDXFrontMatter.Provider value={meta}>
        <div className="h-full max-w-[100rem] flex-1 mx-auto">
          {/* context */}
          <div className="lg:w-4/5">
            {props.children}
            <Footer routerTree={routerTree} />
          </div>
          <Toc headers={headers} />
        </div>
      </MDXFrontMatter.Provider>
    </>
  );
}
