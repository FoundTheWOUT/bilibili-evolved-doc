import sideBarUser from "constant/sidebar-user";
import sideBarDeveloper from "constant/sidebar-developer";
import { useRouter } from "next/router";

export const useRouterTree = () => {
  const {
    query: { slug },
  } = useRouter();
  const tree = slug && slug.includes("user") ? sideBarUser : sideBarDeveloper;
  return {
    tree,
    getNode(path: string) {
      for (let route of tree.routes) {
        if (route.path === path) {
          return route;
        }
      }
    },
  };
};
