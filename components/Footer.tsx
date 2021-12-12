import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import type { RouteItem } from "./SideBar";
import { useRouter } from "next/router";
import Linkable from "./HOC/Linkable";
import Image from "next/image";
import { Themes, useTheme } from "./ThemeProvider";

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
  const { pathname } = useRouter();
  const { nextRoute, prevRoute } = searchPreAndNextInRouterTree(
    routerTree,
    pathname
  );
  const { theme } = useTheme();

  return (
    <>
      <div className="flex h-8 my-10 dark:text-white">
        {prevRoute && (
          <div className="group">
            {Linkable(
              <div className="flex items-center h-full">
                <ChevronLeftIcon className="h-5 text-sky-200 group-hover:text-sky-500" />
                <span className="flex-nowrap">{prevRoute.title}</span>
              </div>,
              prevRoute
            )}
          </div>
        )}
        {nextRoute && (
          <div className="ml-auto group">
            {Linkable(
              <div className="flex items-center h-full">
                {nextRoute.title}
                <ChevronRightIcon className="h-5 text-sky-200 group-hover:text-sky-500" />
              </div>,
              nextRoute
            )}
          </div>
        )}
      </div>
      {/* footer */}
      <footer className="border-t py-12 flex dark:text-white">
        <div>Create at 2022</div>
        <button
          type="button"
          className="ml-auto flex items-center"
          onClick={() =>
            window.open("https://github.com/FoundTheWOUT/bilibili-evolved-doc")
          }
        >
          <span className="mr-2">文档地址</span>
          <Image
            width={24}
            height={24}
            src={
              theme === Themes.DARK
                ? "/icons/Github-Mark-Light-32px.png"
                : "/icons/Github-Mark-32px.png"
            }
            alt="https://github.com/FoundTheWOUT/bilibili-evolved-doc"
          />
        </button>
      </footer>
    </>
  );
}
