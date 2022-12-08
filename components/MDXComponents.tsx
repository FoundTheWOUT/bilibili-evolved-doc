/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line jsx-a11y/alt-text

import * as React from "react";
import { H1, H2, H3, H4 } from "./Heading";
import "highlight.js/styles/github-dark.css";
import { Components } from "@mdx-js/react/lib";
import { ClipboardIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import Link from "next/link";
// import SyntaxHighlighter from "react-syntax-highlighter";

const P = (p: JSX.IntrinsicElements["p"]) => (
  <p className="my-4 whitespace-pre-wrap" {...p} />
);

const Strong = (strong: JSX.IntrinsicElements["strong"]) => (
  <strong className="font-bold" {...strong} />
);

const OL = (p: JSX.IntrinsicElements["ol"]) => (
  <ol className="my-3 ml-6 list-decimal" {...p} />
);
const LI = (p: JSX.IntrinsicElements["li"]) => (
  <li className="mb-1 leading-relaxed" {...p} />
);
const UL = (p: JSX.IntrinsicElements["ul"]) => (
  <ul className="my-3 ml-6 list-disc overflow-y-auto" {...p} />
);

const Divider = () => (
  <hr className="border-border dark:border-border-dark my-6 block border-b" />
);

// const Gotcha = ({ children }: { children: React.ReactNode }) => (
//   <ExpandableCallout type="gotcha">{children}</ExpandableCallout>
// );
// const Note = ({ children }: { children: React.ReactNode }) => (
//   <ExpandableCallout type="note">{children}</ExpandableCallout>
// );

const Blockquote = ({
  children,
  ...props
}: JSX.IntrinsicElements["blockquote"]) => {
  return (
    <>
      <blockquote
        className="relative my-8 flex rounded-lg bg-gray-100 bg-opacity-50 py-4 px-8 leading-6 shadow-inner dark:bg-neutral-700"
        {...props}
      >
        <span className="relative block">{children}</span>
      </blockquote>
    </>
  );
};

const Pre = ({ children }: JSX.IntrinsicElements["pre"]) => {
  const plainText = (children as any)?.[1]?.props?.children;
  const [checked, setChecked] = React.useState(false);
  const handleClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: notify.
  };

  return (
    <pre className="relative my-2 w-full">
      {checked ? (
        <ClipboardCheckIcon
          className="absolute right-0 m-2 w-5 cursor-pointer text-emerald-500"
          onClick={() => {
            handleClipboard(plainText);
          }}
        />
      ) : (
        <ClipboardIcon
          className="absolute right-0 m-2 w-5 cursor-pointer text-white"
          onClick={() => {
            handleClipboard(plainText);
            setChecked(true);
          }}
        />
      )}
      <code className="hljs w-full rounded">{children}</code>
    </pre>
  );
};

const InlineCode = ({ ...props }: JSX.IntrinsicElements["code"]) => {
  return (
    <span
      className="rounded-md bg-sky-50 px-1 font-medium text-sky-700 dark:bg-sky-900 dark:text-sky-300"
      {...props}
    />
  );
};

export const MDXComponents: Components = {
  p: P,
  strong: Strong,
  blockquote: Blockquote,
  ol: OL,
  ul: UL,
  li: LI,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  hr: Divider,
  code: InlineCode,
  pre: Pre,
  // table
  table: ({ ...props }) => (
    <table
      className="mx-auto my-8 w-full table-fixed text-xs md:w-auto md:table-auto md:text-base"
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <th
      className="border border-sky-700 bg-sky-50 px-4 py-2 text-sky-700 dark:bg-sky-900 dark:text-sky-300"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className="border border-sky-700 px-4 py-2" {...props} />
  ),
  a: ({ href, ...props }) => {
    if (!href?.startsWith("http")) {
      return (
        <Link href={href!} legacyBehavior>
          <a className="text-sky-500 hover:text-sky-700" {...props} />
        </Link>
      );
    }
    return (
      <a
        className="text-sky-500 hover:text-sky-700"
        href={href}
        target="_blank"
        rel="noreferrer"
        {...props}
      ></a>
    );
  },
  img: ({ ...props }) => {
    return (
      <span className="m-2 flex">
        <img className="max-h-[60rem] rounded-lg" {...props} alt="" />
      </span>
    );
  },
};
