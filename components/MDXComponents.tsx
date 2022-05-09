/* eslint-disable @next/next/no-img-element */
// eslint-disable-next-line jsx-a11y/alt-text

import * as React from "react";
import { H1, H2, H3, H4 } from "./Heading";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { Components } from "@mdx-js/react/lib";
import { ClipboardIcon, ClipboardCheckIcon } from "@heroicons/react/solid";
import Link from "next/link";

const P = (p: JSX.IntrinsicElements["p"]) => (
  <p className="whitespace-pre-wrap my-4 dark:text-white" {...p} />
);

const Strong = (strong: JSX.IntrinsicElements["strong"]) => (
  <strong className="font-bold" {...strong} />
);

const OL = (p: JSX.IntrinsicElements["ol"]) => (
  <ol className="ml-6 my-3 list-decimal dark:text-white" {...p} />
);
const LI = (p: JSX.IntrinsicElements["li"]) => (
  <li className="leading-relaxed mb-1 dark:text-white" {...p} />
);
const UL = (p: JSX.IntrinsicElements["ul"]) => (
  <ul className="ml-6 my-3 list-disc dark:text-white" {...p} />
);

const Divider = () => (
  <hr className="my-6 block border-b border-border dark:border-border-dark" />
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
        className="py-4 px-8 my-8 shadow-inner bg-gray-100 dark:bg-neutral-700 bg-opacity-50 rounded-lg leading-6 flex relative"
        {...props}
      >
        <span className="block relative">{children}</span>
      </blockquote>
    </>
  );
};

const Pre = ({ children }: JSX.IntrinsicElements["pre"]) => {
  const { children: code } = (children as any).props;
  const highlighted = hljs.highlightAuto(code as string);

  const [checked, setChecked] = React.useState(false);
  const handleClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // TODO: notify.
  };

  return (
    <pre className="relative w-full my-2">
      {checked ? (
        <ClipboardCheckIcon
          className="w-5 absolute right-0 text-white m-2 cursor-pointer"
          onClick={() => {
            handleClipboard(code);
          }}
        />
      ) : (
        <ClipboardIcon
          className="w-5 absolute right-0 text-white m-2 cursor-pointer"
          onClick={() => {
            handleClipboard(code);
            setChecked(true);
          }}
        />
      )}
      <code
        className="hljs rounded w-full"
        dangerouslySetInnerHTML={{ __html: highlighted.value }}
      />
    </pre>
  );
};

const InlineCode = ({ ...props }: JSX.IntrinsicElements["code"]) => {
  return (
    <span
      className="font-medium bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300 rounded-md px-1"
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
  inlineCode: InlineCode,
  // table
  table: ({ ...props }) => (
    <table className="mx-auto my-8 dark:text-white" {...props} />
  ),
  th: ({ ...props }) => (
    <th
      className="bg-sky-50 dark:bg-sky-900 text-sky-700 dark:text-sky-300 border border-sky-700 px-4 py-2"
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td className="border border-sky-700 px-4 py-2" {...props} />
  ),
  a: ({ ...props }) => (
    <a className="text-sky-500 hover:text-sky-700" {...props}></a>
  ),
  img: ({ ...props }) => {
    return (
      <span className="flex m-2">
        <img className="rounded-lg max-h-[60rem]" {...props} />
      </span>
    );
  },
  figcaption: ({ ...props }) => (
    <figcaption className="dark:text-white" {...props} />
  ),
  summary: ({ ...props }) => (
    <summary className="dark:text-white cursor-pointer" {...props} />
  ),
};
