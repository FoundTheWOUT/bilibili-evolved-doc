import { MDXProvider } from "@mdx-js/react";
import React, { PropsWithChildren } from "react";
import { MDXComponents } from "./MDXComponents";
import MDXWrapper from "./MDXWrapper";

type MDXPageProps = PropsWithChildren<{}>;

export const MDXPage = ({ children }: MDXPageProps) => {
  const _MDXComponents = {
    ...MDXComponents,
    wrapper: MDXWrapper,
  };

  return <MDXProvider components={_MDXComponents}>{children}</MDXProvider>;
};
