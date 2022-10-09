import remarkGfm from "remark-gfm";
import remarkExportHeading from "./plugins/remark-export-heading.mjs";
import recmakInjectProps from "./plugins/recma-lift-up-props.mjs";
import remarkPathToRepo from "./plugins/remark-path-to-repo.mjs";
import rehypeHighlight from "./plugins/rehype-highlight.mjs";
import rehypeSlug from "rehype-slug";
// import rehypeStaticProps from "./plugins/rehype-static-props.mjs";

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["tsx", "md", "mdx"],
  env: {
    buildAt: new Date().toISOString(),
  },
  // reactStrictMode: true,
  webpack: (config, { dev, isServer, ...options }) => {
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
      // loader 倒序加载
      use: [
        options.defaultLoaders.babel,
        {
          loader: "@mdx-js/loader",
          options: {
            providerImportSource: "@mdx-js/react",
            remarkPlugins: [remarkGfm, remarkExportHeading, remarkPathToRepo],
            rehypePlugins: [
              rehypeHighlight,
              rehypeSlug,
              // [rehypeStaticProps, `{headings}`],
            ],
            recmaPlugins: [[recmakInjectProps, ["headings"]]],
          },
        },
        "./loaders/replace-remote-content",
      ],
    });

    return config;
  },
  images: {
    domains: ["user-images.githubusercontent.com", "cdn.jsdelivr.net"],
  },
};

export default config;
