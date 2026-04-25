// import rehypeStaticProps from "./plugins/rehype-static-props.mjs";

/** @type {import('next').NextConfig} */
const config = {
  pageExtensions: ["tsx", "md", "mdx"],
  env: {
    buildAt: new Date().toISOString(),
  },
  // reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      new URL("https://contrib.rocks"),
      new URL("https://user-images.githubusercontent.com"),
      new URL("https://cdn.jsdelivr.net"),
      new URL("https://avatars.githubusercontent.com"),
    ],
  },
};

export default config;
