const yaml = require("js-yaml");
const visit = require("unist-util-visit");

/**
 * @author https://github.com/expo/expo
 */
// 通过 `remark-frontmatter` 处理后获得的 meta 数据
module.exports = () => {
  return (tree) => {
    let yamlTransformed = false;

    visit(tree, "yaml", (node) => {
      const data = yaml.load(node.value);
      node.type = "export";
      node.value = `export const meta = ${JSON.stringify(data)};`;
      node.position = undefined;

      yamlTransformed = true;

      return visit.EXIT;
    });

    if (!yamlTransformed) {
      tree.children.push({
        type: "export",
        value: `export const meta = {};`,
      });
    }
  };
};
