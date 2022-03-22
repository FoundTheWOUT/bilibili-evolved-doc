/** @type {import('next').NextConfig} */

module.exports = {
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
            remarkPlugins: [
              require("remark-frontmatter", ["yaml"]),
              require("./plugins/remark-export-heading"),
              require("./plugins/remark-yaml"),
            ],
          },
        },
        "./plugins/replace-remote-content",
      ],
    });

    return config;
  },
};
