import { visit } from "unist-util-visit";
import Slugger from "github-slugger";
import { valueToEstree } from "estree-util-value-to-estree";
const slugger = new Slugger();

/**
 * @typedef {import('mdast').Root} Root - https://github.com/syntax-tree/mdast#root
 * @typedef {import('mdast').Heading} Heading - https://github.com/syntax-tree/mdast#heading
 */

/**
 * @author https://github.com/expo/expo
 */

export default function plugin() {
  slugger.reset();
  /** @param {Root} tree */
  return (tree) => {
    const headings = [];

    /** @param {Heading} node -  */
    const parseNodeToSting = (node) => {
      // node is text
      if (node.type === "text") {
        return node.value;
      }
      // node is link
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
        // parse text and link
        const title = node.children.map(parseNodeToSting).join(" ");
        headings.push({
          id: node.data?.id || slugger.slug(title),
          depth: node.depth,
          type:
            node.children.find((node) => node.type !== "text")?.type || "text",
          title,
        });
      }
    };

    visit(tree, "heading", visitor);

    /**
     * equivalence to
     *
     * export const headings = [...]
     */
    const tocExport = {
      type: "mdxjsEsm",
      data: {
        estree: {
          type: "Program",
          sourceType: "module",
          body: [
            {
              type: "ExportNamedDeclaration",
              specifiers: [],
              source: null,
              declaration: {
                type: "VariableDeclaration",
                kind: "const",
                declarations: [
                  {
                    type: "VariableDeclarator",
                    id: {
                      type: "Identifier",
                      name: "headings",
                    },
                    init: valueToEstree(headings),
                  },
                ],
              },
            },
          ],
        },
      },
    };
    tree.children.push(tocExport);
  };
}
