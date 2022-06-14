import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkExportHeading from "./plugins/remark-export-heading.mjs";
import exportToProps from "./plugins/export-to-props.mjs";
import remarkPathToRepo from "./plugins/remark-path-to-repo.mjs";
import rehypeSlug from "rehype-slug";
// import remarkFrontmatter from 'remark-frontmatter'

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
            remarkPlugins: [
              remarkGfm,
              remarkFrontmatter,
              remarkMdxFrontmatter,
              remarkExportHeading,
              remarkPathToRepo,
              // require("remark-frontmatter", ["yaml"]),
              // require("./plugins/remark-export-heading"),
              // require("./plugins/remark-yaml"),
            ],
            rehypePlugins: [
              rehypeSlug,
              [
                exportToProps,
                `{
              headings
            }`,
              ],
            ],
          },
        },
        "./plugins/replace-remote-content.js",
      ],
    });

    return config;
  },
  images: {
    domains: ["user-images.githubusercontent.com"],
  },
};

export default config;
