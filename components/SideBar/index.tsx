import React, { PropsWithChildren, useState, useEffect } from "react";
import SideBarTree from "./SideBarTree";
import DocType from "./DocType";
import DarkSwitch from "components/DarkSwitch";
import Title from "components/Title";
import cn from "classnames";
import Search from "./Search";
import { useMdxPath } from "hooks/useMdxPath";
import { useRouter } from "next/router";

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
  const curPath = useMdxPath();
  const { hidden, hideSidebar } = React.useContext(SidebarContext);

  return (
    <div>
      <div
        className={cn(
          "fixed left-0 right-0 z-30 h-screen backdrop-blur lg:hidden",
          {
            hidden,
          }
        )}
        onClick={() => hideSidebar()}
      ></div>

      <aside
        className={cn(
          "fixed top-0 z-40 flex h-screen w-80 transform flex-col border-r bg-white transition-all dark:bg-stone-900 lg:visible lg:border-none lg:bg-transparent dark:lg:bg-transparent",
          {
            "-translate-x-full opacity-0 lg:-translate-x-0 lg:opacity-100":
              hidden,
          }
        )}
      >
        <Title className="invisible flex items-center p-4 lg:visible" />

        <div className="flex h-8 items-center px-4 dark:text-white">
          <DocType className="relative flex flex-1 rounded-md bg-stone-100 p-1 dark:bg-stone-700" />
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
  const router = useRouter();
  const [hidden, setHidden] = useState(true);
  useEffect(() => {
    setHidden(true);
  }, [router.query.slug]);
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
