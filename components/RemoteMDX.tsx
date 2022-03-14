import React from "react";
import { compile } from "@mdx-js/mdx";

interface Props {
  url: string;
}

const RemoteMDX = ({ url }: Props) => {
  //TODO:
  // 1.fetch doc from url.
  // 2.parse doc using mdx compile.
  // 3.render the compiled file whit MDXComponent.(return the MDXComponent)
  fetch(
    "https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@preview-fixes/doc/features/features.md"
  )
    .then((res) => res.text())
    .then((res) => {
      console.log(typeof res);
      return compile(res);
    })
    .then((v) => {
      console.log(v);
    });
  return <div>Hi</div>;
};

export default RemoteMDX;
