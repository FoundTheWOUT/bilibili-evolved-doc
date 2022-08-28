import { MDXProvider } from "@mdx-js/react";
import dynamic from "next/dynamic";

export default {
  title: "User Manual",
  hide: true,
  routes: [
    {
      title: "😊 欢迎使用",
      path: "/docs/user",
      Comp: dynamic(() => import("/docs/user/index.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "📦 安装",
      path: "/docs/user/install",
      Comp: dynamic(() => import("/docs/user/install.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "⚙ 设置",
      path: "/docs/user/settings",
      Comp: dynamic(() => import("/docs/user/settings.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "📚 组件（插件）",
      path: "/docs/user/features",
      Comp: dynamic(() => import("/docs/user/features.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "📅 更新日志",
      path: "/docs/user/changelog",
      Comp: dynamic(() => import("/docs/user/changelog.md"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "❓ Q&A",
      path: "/docs/user/Q&A",
      Comp: dynamic(() => import("/docs/user/Q&A.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "从 v1 迁移",
      path: "/docs/user/migrate-v1",
      Comp: dynamic(() => import("/docs/user/migrate-v1.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
    {
      title: "🍞 投喂",
      path: "/docs/user/donate",
      Comp: dynamic(() => import("/docs/user/donate.mdx"), {
        suspense: true,
      }) as typeof MDXProvider,
    },
  ],
};
