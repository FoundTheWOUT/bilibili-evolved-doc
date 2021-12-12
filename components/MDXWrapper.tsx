import Toc from "./Toc";
import NavBar from "./NavBar";
import type { TocHeader } from "./Toc";
import { SideBar, SidebarProvider } from "./SideBar";
import React, { PropsWithChildren } from "react";
import sideBarUser from "constant/sidebar-user.json";
import sideBarDeveloper from "constant/sidebar-developer.json";

import Footer from "./Footer";
import { useRouter } from "next/router";

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
  const { headings, meta } = props;

  const headers: TocHeader[] = headings.map((header) => ({
    url: `#${header.id}`,
    depth: header.depth - 1,
    text: header.title,
  }));

  const { pathname } = useRouter();
  const routerTree = pathname.includes("user") ? sideBarUser : sideBarDeveloper;

  return (
    <MDXFrontMatter.Provider value={meta}>
      <div className="h-full max-w-[100rem] mx-auto">
        <SidebarProvider>
          <NavBar />

          <SideBar routerTree={routerTree} />

          {/* context */}
          <div className="px-6 lg:flex lg:ml-80">
            <div className="basis-4/5">
              {props.children}
              <Footer routerTree={routerTree} />
            </div>
            <Toc headers={headers} />
          </div>
        </SidebarProvider>
      </div>
    </MDXFrontMatter.Provider>
  );
}
