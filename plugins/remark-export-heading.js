const visit = require("unist-util-visit");
const slugger = require("github-slugger")();

/**
 * @typedef {import('mdast').Root} Root - https://github.com/syntax-tree/mdast#root
 * @typedef {import('mdast').Heading} Heading - https://github.com/syntax-tree/mdast#heading
 */

/**
 * @author https://github.com/expo/expo
 */

module.exports = () => {
  slugger.reset();
  /** @param {Root} tree */
  return (tree) => {
    const headings = [];

    /** @param {Heading} node -  */
    const parseNodeToSting = (node) => {
      return node.children
        .map((child) => {
          if (child.type === "text") {
            return child.value;
          } else {
            throw Error("node type is not text");
          }
        })
        .join(" ");
    };

    /** @param {Heading} node -  */
    const visitor = (node) => {
      if (node.children.length > 0) {
        const title = node.children
          .map((child) => {
            if (child.type === "link") {
              return parseNodeToSting(child);
            }
            return child.value;
          })
          .join(" ");
        headings.push({
          id: node.data?.id ?? slugger.slug(title),
          depth: node.depth,
          type:
            node.children.find((node) => node.type !== "text")?.type || "text",
          title,
        });
      }
    };

    visit(tree, "heading", visitor);

    tree.children.push({
      type: "export",
      value: `export const headings = ${JSON.stringify(headings)};`,
    });
  };
};
