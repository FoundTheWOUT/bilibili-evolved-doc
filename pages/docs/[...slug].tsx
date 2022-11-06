import React from "react";
import { MDXComponents } from "components/MDXComponents";
import { SideBar, SidebarProvider } from "components/SideBar";
import NavBar from "components/NavBar";
import { GetStaticPaths, GetStaticProps } from "next";
import sideBarUser from "constant/sidebar-user";
import sideBarDeveloper from "constant/sidebar-developer";
import path from "path";
import { accessSync, constants } from "fs";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { readFile } from "fs/promises";
import remarkGfm from "remark-gfm";
import remarkExportHeading from "plugins/remark-export-heading.mjs";
import remarkPathToRepo from "plugins/remark-path-to-repo.mjs";
import rehypeHighlight from "plugins/rehype-highlight.mjs";
import rehypeSlug from "rehype-slug";
import { loaderPromise as remoteContentLoader } from "loaders/replace-remote-content/main.mjs";
import MDXWrapper from "components/MDXWrapper";

// const LoadingComp = (
//   <div className="h-[90vh] w-full flex justify-center items-center">
//     <Loading className="h-20 text-MAIN" />
//   </div>
// );

const MDXPage = ({ source, router, headings }: any) => {
  return (
    <SidebarProvider>
      <NavBar />
      <SideBar routerTree={router} />
      <div className="px-6 lg:flex lg:ml-80">
        <MDXWrapper router={router} headings={headings} meta={{}}>
          <MDXRemote {...source} components={MDXComponents} />
        </MDXWrapper>
      </div>
    </SidebarProvider>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const slug = context.params!.slug as string[];
  if (slug.length == 1) slug.push("index");
  let filePath = path.resolve(path.join("docs", slug.join("/")));
  try {
    accessSync(`${filePath}.mdx`, constants.R_OK);
    filePath = `${filePath}.mdx`;
  } catch (err) {
    filePath = `${filePath}.md`;
  }

  let file = "";
  try {
    const mdxFile = await readFile(filePath);
    file = mdxFile.toString();
    file = await remoteContentLoader(file);
  } catch (error) {
    console.error(error);
  }

  const headings: any[] = [];
  const mdxSource = await serialize(file, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        [remarkExportHeading, { headings }],
        remarkPathToRepo,
      ],
      rehypePlugins: [
        rehypeHighlight,
        rehypeSlug,
        // [rehypeStaticProps, `{headings}`],
      ],
    },
  });
  return {
    props: {
      router: slug[0] === "user" ? sideBarUser : sideBarDeveloper,
      source: mdxSource,
      headings,
    }, // will be passed to the page component as props
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [] as any[];
  sideBarUser.routes.forEach((route) => paths.push(route.path));
  sideBarDeveloper.routes.forEach((route) => paths.push(route.path));
  return {
    paths,
    fallback: false,
  };
};
export default MDXPage;
