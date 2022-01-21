import React, { PropsWithChildren, useState } from "react";
import { useRouter } from "next/router";
import SideBarTree from "./SideBarTree";
import DocType from "./DocType";
import DarkSwitch from "components/DarkSwitch";
import Title from "components/Title";
import cn from "classnames";
import Search from "./Search";

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
        <Title className="p-4 flex items-center invisible lg:visible" />

        <div className="h-8 flex px-4 items-center dark:text-white">
          <DocType className="flex relative flex-1 bg-stone-100 dark:bg-stone-700 rounded-md p-1" />
          <DarkSwitch className="hidden lg:flex" />
        </div>

        <Search className="p-4" />

        {/* route */}
        <SideBarTree
          className="flex flex-col px-4"
          routerTree={routerTree}
          curPath={curPath}
          level={0}
        />
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
