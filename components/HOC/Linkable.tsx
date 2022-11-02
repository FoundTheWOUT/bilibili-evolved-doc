import Link from "next/link";
import React, { forwardRef } from "react";
import { RouteItem } from "components/SideBar";

// 检测路由是否有 path 属性，有则使用 Link 包裹，没有则返回原始 JSX
const Linkable = (component: any, route: RouteItem) => {
  return route.path ? (
    <Link href={route.path} key={route.title} passHref legacyBehavior>
      {component}
    </Link>
  ) : (
    component
  );
};

export default Linkable;
