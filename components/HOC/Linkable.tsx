import Link from "next/link";
import React from "react";
import { RouteItem } from "components/SideBar";

const Linkable = (component: JSX.Element, route: RouteItem) => {
  return route.path ? (
    <Link href={route.path} key={route.title}>
      <a>{component}</a>
    </Link>
  ) : (
    component
  );
};

export default Linkable;
