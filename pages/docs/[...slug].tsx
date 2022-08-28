import React, { Suspense } from "react";
import { MDXComponents } from "components/MDXComponents";
import { useMdxPath } from "hooks/useMdxPath";
import { SideBar, SidebarProvider } from "components/SideBar";
import NavBar from "components/NavBar";
import { useRouterTree } from "hooks/useRouterTree";

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
        <Suspense fallback={<div>loading</div>}>
          <Comp components={MDXComponents} />
          {/* <MDXProvider components={_MDXComponents}>{children}</MDXProvider>; */}
        </Suspense>
      </div>
    </SidebarProvider>
  );
};

export default MDXPage;
