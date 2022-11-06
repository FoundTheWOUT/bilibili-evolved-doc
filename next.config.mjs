// import rehypeStaticProps from "./plugins/rehype-static-props.mjs";

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["tsx", "md", "mdx"],
  env: {
    buildAt: new Date().toISOString(),
  },
  // reactStrictMode: true,
  images: {
    domains: ["user-images.githubusercontent.com", "cdn.jsdelivr.net"],
  },
};

export default config;
