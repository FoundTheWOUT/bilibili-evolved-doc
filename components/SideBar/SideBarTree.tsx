import React from "react";
import { RouteItem } from ".";
import SideBarItem from "./SideBarItem";

interface SideBarTreeProps {
  routerTree: RouteItem;
  curPath: string;
  level: number;
}

const SideBarTree = ({ routerTree, curPath, level }: SideBarTreeProps) => (
  <ul>
    {routerTree.routes &&
      routerTree.routes.map((route) => {
        const { title } = route;

        if (route.routes) {
          return (
            <li key={title}>
              <SideBarItem route={route} selected={curPath} level={level} />
              <SideBarTree
                routerTree={route}
                curPath={curPath}
                level={level + 1}
              />
            </li>
          );
        }
        return (
          <li key={title}>
            <SideBarItem route={route} selected={curPath} level={level} />
          </li>
        );
      })}
  </ul>
);

export default SideBarTree;
