import { parse } from "acorn";

/**
 * AST transformer adds `getStaticProps` to the tree based on provided mapping.
 */
export default function createNextStaticProps(map) {
  return function transformer(tree) {
    tree.children.push({
      type: "mdxjsEsm",
      data: {
        estree: parse(
          `
          export const getStaticProps = async () => {
            return {
              props: ${map},
            }
          }`,
          {
            sourceType: "module",
          }
        ),
      },
    });
  };
}
