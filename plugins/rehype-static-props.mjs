import { fromJs } from "esast-util-from-js";

/**
 * AST transformer adds `getStaticProps` to the tree based on provided mapping.
 * @param {string} propsObject
 */
export default function createNextStaticProps(propsObject) {
  const template = `
  export const getStaticProps = async () => {
    return {
      props: ${propsObject},
    }
  }`;
  return function transformer(tree) {
    tree.children.push({
      type: "mdxjsEsm",
      data: {
        estree: fromJs(template, { module: true }),
      },
    });
  };
}
