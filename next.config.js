/** @type {import('next').NextConfig} */

module.exports = {
  pageExtensions: ["tsx", "md", "mdx"],
  // reactStrictMode: true,
  webpack: (config, { dev, isServer, ...options }) => {
    // Add our custom markdown loader in order to support frontmatter
    // and layout
    config.module.rules.push({
      test: /.mdx?$/, // load both .md and .mdx files
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
      ],
    });

    return config;
  },
};
