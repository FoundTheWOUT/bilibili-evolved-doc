import { RemarkHeading } from "components/MDXWrapper";

// NOTE: This file should not be edited
// see https://nextjs.org/docs/basic-features/typescript for more information.

declare global {
  interface Window {
    headings: RemarkHeading[] | undefined;
  }
}

export {};
