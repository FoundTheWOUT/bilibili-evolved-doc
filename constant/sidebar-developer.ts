import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

export default {
  title: "Developer Manual",
  hide: true,
  routes: [
    {
      title: "开始",
      path: "/docs/developer",
      Comp: dynamic(() => import("/docs/developer/index.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "环境搭建",
      path: "/docs/developer/environment",
      Comp: dynamic(() => import("/docs/developer/environment.md"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "组件(插件)开发",
      path: "/docs/developer/component",
      Comp: dynamic(() => import("/docs/developer/component.md"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "API",
      path: "/docs/developer/api",
      Comp: dynamic(() => import("/docs/developer/api.md"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
  ],
};
