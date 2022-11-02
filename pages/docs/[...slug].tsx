import React, { Suspense } from "react";
import { MDXComponents } from "components/MDXComponents";
import { useMdxPath } from "hooks/useMdxPath";
import { SideBar, SidebarProvider } from "components/SideBar";
import NavBar from "components/NavBar";
import { useRouterTree } from "hooks/useRouterTree";
import Loading from "components/Loading";
import Error from "next/error";

const LoadingComp = (
  <div className="h-[90vh] w-full flex justify-center items-center">
    <Loading className="h-20 text-MAIN" />
  </div>
);

const MDXPage = () => {
  const path = useMdxPath();
  const { tree: routerTree, getNode } = useRouterTree();
  const Comp = getNode(path)?.Comp;

  return (
    <SidebarProvider>
      <NavBar />
      <SideBar routerTree={routerTree} />
      <div className="px-6 lg:flex lg:ml-80">
        <Suspense fallback={LoadingComp}>
          {Comp ? <Comp components={MDXComponents} /> : LoadingComp}
        </Suspense>
      </div>
    </SidebarProvider>
  );
};

export default MDXPage;
