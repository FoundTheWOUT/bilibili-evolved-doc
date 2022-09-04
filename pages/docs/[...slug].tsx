import React, { Suspense } from "react";
import { MDXComponents } from "components/MDXComponents";
import { useMdxPath } from "hooks/useMdxPath";
import { SideBar, SidebarProvider } from "components/SideBar";
import NavBar from "components/NavBar";
import { useRouterTree } from "hooks/useRouterTree";
import Loading from "components/Loading";

const MDXPage = () => {
  const path = useMdxPath();
  if (!path) return null;

  const { tree: routerTree, getNode } = useRouterTree();
  const Comp = getNode(path)?.Comp;
  if (!Comp) return null;

  return (
    <SidebarProvider>
      <NavBar />
      <SideBar routerTree={routerTree} />
      <div className="px-6 lg:flex lg:ml-80">
        <Suspense
          fallback={
            <div className="h-[90vh] w-full flex justify-center items-center">
              <Loading className="h-20 text-MAIN" />
            </div>
          }
        >
          <Comp components={MDXComponents} />
        </Suspense>
      </div>
    </SidebarProvider>
  );
};

export default MDXPage;
