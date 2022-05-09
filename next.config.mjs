/** @type {import('next').NextConfig} */
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { remarkMdxFrontmatter } from "remark-mdx-frontmatter";
import remarkExportHeading from "./plugins/remark-export-heading.mjs";
import exportToProps from "./plugins/export-to-props.mjs";
import rehypeSlug from "rehype-slug";
// import remarkFrontmatter from 'remark-frontmatter'

const config = {
  pageExtensions: ["tsx", "md", "mdx"],
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
};

export default config;
