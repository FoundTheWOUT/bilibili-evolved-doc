import React, { PropsWithChildren, useState } from "react";
import { useRouter } from "next/router";
import { SearchIcon } from "@heroicons/react/solid";
import SideBarTree from "./SideBarTree";
import DocType from "./DocType";
import DarkSwitch from "components/DarkSwitch";
import Title from "components/Title";
import cn from "classnames";

export interface RouteItem {
  title: string;
  path?: string;
  routes?: RouteItem[];
  hide?: boolean;
}

interface SideBarProps {
  routerTree: RouteItem;
}

export const SidebarContext = React.createContext({
  hidden: false,
  hideSidebar: () => {},
  showSidebar: () => {},
});

export const SideBar = ({ routerTree }: SideBarProps) => {
  const { pathname: curPath } = useRouter();
  const { hidden, hideSidebar } = React.useContext(SidebarContext);

  return (
    <div>
      <div
        className={cn(
          "fixed h-screen left-0 right-0 backdrop-blur z-30 lg:hidden",
          {
            hidden,
          }
        )}
        onClick={() => hideSidebar()}
      ></div>

      <aside
        className={cn(
          "fixed top-0 h-screen w-80 flex flex-col bg-white dark:bg-stone-900 lg:visible z-40 transform transition-all border-r lg:border-none lg:bg-transparent dark:lg:bg-transparent",
          {
            "-translate-x-full opacity-0 lg:-translate-x-0 lg:opacity-100":
              hidden,
          }
        )}
      >
        <div>
          <Title className="p-4 flex items-center invisible lg:visible" />

          <div className="h-8 flex px-4 items-center dark:text-white">
            <DocType />
            <DarkSwitch className="hidden lg:flex" />
          </div>

          {/* search */}
          <div className="p-4">
            <button
              type="button"
              className="p-2 w-full rounded flex items-center bg-stone-100 dark:bg-stone-700 text-gray-400 dark:text-stone-400 focus:ring ring-sky-200 dark:ring-sky-700"
            >
              <SearchIcon className="h-5 w-5 mx-2 text-stone-500 dark:text-stone-300" />
              搜索
              <kbd className="ml-auto DocSearch-Button-Key">/</kbd>
            </button>
          </div>

          {/* route */}
          <div className="flex flex-col px-4">
            <SideBarTree routerTree={routerTree} curPath={curPath} level={0} />
          </div>
        </div>
      </aside>
    </div>
  );
};

export const SidebarProvider = ({ children }: PropsWithChildren<{}>) => {
  const [hidden, setHidden] = useState(true);
  return (
    <SidebarContext.Provider
      value={{
        hidden: hidden,
        hideSidebar: () => setHidden(true),
        showSidebar: () => setHidden(false),
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
