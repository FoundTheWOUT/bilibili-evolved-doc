import Toc from "./Toc";
import Footer from "./Footer";
import Head from "next/head";
import type { TocHeader } from "./Toc";
import { useRouterTree } from "hooks/useRouterTree";
import React, { PropsWithChildren, useEffect, useState } from "react";

export interface RemarkHeading {
  id: string;
  depth: number;
  title: string;
  type: string;
}

export interface FrontMatter {}

const MDXFrontMatter = React.createContext({});

const genHeadings = (
  node: any,
  depth: number = 0,
  headings: TocHeader[] = []
): TocHeader[] => {
  // do something
  // if(node.)
  if (node.tagName?.toLowerCase() == "h1") {
    headings.push({
      url: `#${node.id}`,
      depth: 0,
      text: node.id,
    });
  }
  if (node.tagName?.toLowerCase() == "h2") {
    headings.push({
      url: `#${node.id}`,
      depth: 1,
      text: node.id,
    });
  }
  if (node.tagName?.toLowerCase() == "h3") {
    headings.push({
      url: `#${node.id}`,
      depth: 2,
      text: node.id,
    });
  }
  if (node.tagName?.toLowerCase() == "h4") {
    headings.push({
      url: `#${node.id}`,
      depth: 3,
      text: node.id,
    });
  }
  if (node.childNodes.length > 0) {
    node.childNodes.forEach((child: any) => {
      genHeadings(child, depth + 1, headings);
    });
  }
  return headings;
};

export default function MDXWrapper(
  props: PropsWithChildren<{
    headings: RemarkHeading[];
    meta: FrontMatter;
  }>
) {
  // TODO: The MDXContent is no long a Page Component, therefore, the getStaticProps func would
  // TODO: run, which causing wrapper Component would not get any props from MDXContent.
  const { headings, meta } = props;
  // const headers: TocHeader[] =
  //   headings?.map((header) => ({
  //     url: `#${header.id}`,
  //     depth: header.depth - 1,
  //     text: header.title,
  //   })) ?? [];
  const [headers, setHeaders] = useState<TocHeader[]>([]);

  // temporary solution: search heading element from the dom, and generate Toc.
  useEffect(() => {
    const contentElement = document.getElementById("article");
    if (contentElement) {
      // setHeaders();
      setHeaders(genHeadings(contentElement, 0));
    }
  }, []);

  const { tree: routerTree } = useRouterTree();

  return (
    <>
      <Head>
        <title>bilibili-evolved-doc</title>
      </Head>

      <MDXFrontMatter.Provider value={meta}>
        <div className="h-full max-w-[100rem] lg:flex flex-1 mx-auto">
          {/* context */}
          <div className="lg:w-4/5">
            <article id="article">{props.children}</article>
            <Footer routerTree={routerTree} />
          </div>
          <Toc headers={headers} />
        </div>
      </MDXFrontMatter.Provider>
    </>
  );
}
