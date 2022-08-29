import classNames from "classnames";
import React, { useEffect, useState } from "react";
import GithubSlugger from "github-slugger";

export type TocHeader = {
  url: string;
  depth: number;
  text: string;
};

interface TocProps {
  headers: TocHeader[];
}

export default function Toc({ headers }: TocProps) {
  const [activeHeader, setActiveHeader] = useState(0);

  useEffect(() => {
    const handleDocumentScroll = () => {
      const pageHeight = document.body.scrollHeight;
      const scrollPosition = window.scrollY + window.innerHeight;

      if (scrollPosition >= 0 && pageHeight - scrollPosition <= 75) {
        // Scrolled to bottom of page.
        setActiveHeader(headers.length - 1);
        return;
      }

      const headersAnchors = Array.from(
        document.getElementsByClassName("anchor")
      );

      let index = -1;
      while (index < headersAnchors.length - 1) {
        const headerAnchor = headersAnchors[index + 1];
        const { top } = headerAnchor.getBoundingClientRect();

        if (top >= 50) {
          break;
        }
        index += 1;
      }

      setActiveHeader(Math.max(index, 0));
    };

    document.addEventListener("scroll", handleDocumentScroll);
    return () => {
      document.removeEventListener("scroll", handleDocumentScroll);
    };
  }, []);

  return (
    <div className="ml-4 text-sm hidden xl:block">
      {/* <div className="fixed right-0 top-0 pt-8 w-72 text-sm hidden lg:block"> */}
      <div className="sticky top-8 w-64 max-h-[75vh] overflow-y-auto dark:text-white">
        {/* TODO: loading */}
        {headers.length == 0 && <div>loading</div>}
        {headers.map((header, i) => {
          let slugger = new GithubSlugger();
          slugger.reset();
          const id = slugger.slug(header.text);

          return (
            <div
              className={classNames(
                "px-4 pb-2 pl-1 hover:text-sky-600 cursor-pointer",
                {
                  "text-sky-600 dark:text-sky-300": activeHeader === i,
                }
              )}
              key={i}
            >
              <a
                href={`#${id}`}
                className={
                  header.depth >= 2
                    ? "pl-2"
                    : header.depth === 1
                    ? "pl-1"
                    : "pl-0"
                }
              >
                {header.text}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
