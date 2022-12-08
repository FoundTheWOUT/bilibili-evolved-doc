import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import type { RouteItem } from "./SideBar";
import Linkable from "./HOC/Linkable";
import Image from "next/image";
import { useMdxPath } from "hooks/useMdxPath";

interface FooterProps {
  routerTree: RouteItem;
}

interface RouterMeta {
  nextRoute?: RouteItem;
  prevRoute?: RouteItem;
  route?: RouteItem;
}

/**
 * 深度优先获得当前路由的前后路由
 * https://github.com/reactjs/reactjs.org
 */
const searchPreAndNextInRouterTree = (
  tree: RouteItem,
  searchPath: string,
  ctx: RouterMeta = {}
): RouterMeta => {
  const { routes } = tree;
  if (ctx.route && !ctx.nextRoute) {
    ctx.nextRoute = tree;
  }

  if (tree.path === searchPath) {
    ctx.route = tree;
  }

  if (!ctx.route && !tree.hide) {
    ctx.prevRoute = tree;
  }

  if (!routes) {
    return ctx;
  }

  if (routes) {
    routes.forEach((route) => {
      searchPreAndNextInRouterTree(route, searchPath, ctx);
    });
  }
  return ctx;
};

export default function Footer({ routerTree }: FooterProps) {
  const pathname = useMdxPath();
  const { nextRoute, prevRoute } = searchPreAndNextInRouterTree(
    routerTree,
    pathname
  );

  return (
    <>
      <div className="my-10 flex h-8 dark:text-white">
        {prevRoute && (
          <div className="group">
            {Linkable(
              <a className="flex h-full items-center">
                <ChevronLeftIcon className="h-5 text-sky-200 group-hover:text-sky-500" />
                <span className="flex-nowrap">{prevRoute.title}</span>
              </a>,
              prevRoute
            )}
          </div>
        )}
        {nextRoute && (
          <div className="group ml-auto">
            {Linkable(
              <a className="flex h-full items-center">
                {nextRoute.title}
                <ChevronRightIcon className="h-5 text-sky-200 group-hover:text-sky-500" />
              </a>,
              nextRoute
            )}
          </div>
        )}
      </div>
      {/* footer */}
      <footer className="flex items-end border-t py-12 text-gray-500">
        <div className="h-5">构建于 {process.env.buildAt?.slice(0, 10)}</div>
        <a
          href="https://github.com/FoundTheWOUT/bilibili-evolved-doc"
          className="ml-auto flex items-end"
          target="_blank"
          rel="noreferrer"
        >
          <span className="mr-2 h-5">网站地址</span>
          <Image
            width={20}
            height={20}
            className="hidden dark:inline"
            src="/icons/github-light.png"
            alt="https://github.com/FoundTheWOUT/bilibili-evolved-doc"
          />
          <Image
            width={20}
            height={20}
            className="dark:hidden"
            src="/icons/github.png"
            alt="https://github.com/FoundTheWOUT/bilibili-evolved-doc"
          />
        </a>
      </footer>
    </>
  );
}
