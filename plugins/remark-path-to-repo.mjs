import { visit } from "unist-util-visit";

/**
 * @typedef {import('mdast').Root} Root - https://github.com/syntax-tree/mdast#root
 * @typedef {import('mdast').Heading} Heading - https://github.com/syntax-tree/mdast#heading
 */

const isRelativePath = (url) => url.includes("../../");

export default function plugin() {
  /** @param {Root} tree */
  return (tree) => {
    /** @param {Heading} node -  */
    const visitor = (node) => {
      if (isRelativePath(node.url)) {
        const repoUrl = node.url.replace(
          /\.\.\/\.\.\/registry\/dist/g,
          "https://github.com/the1812/Bilibili-Evolved/tree/master/registry/lib"
        );
        node.url = repoUrl.slice(0, repoUrl.length - 3);
      }
    };

    visit(tree, "link", visitor);
  };
}
