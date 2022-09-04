/**
 * 替换 <remote /> 为 src 里内容
 * Author: FoundTheWOUT
 * */

import { parseFragment } from "parse5";
import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toHtml } from "hast-util-to-html";
import { fromParse5 } from "hast-util-from-parse5";
import { remove } from "unist-util-remove";
import fetch from "node-fetch";

function normalizeHTML(tree) {
  tree = remove(tree, { tagName: "style" });
  if (!tree) return;
  tree = remove(tree, { type: "comment" });
  if (!tree) return;
  return toHtml(tree, {
    closeSelfClosing: true,
  });
}

function normalizeContentPlugin() {
  return function (tree) {
    visit(tree, "html", (node) => {
      node.value = normalizeHTML(fromParse5(parseFragment(node.value))) ?? "";
    });
  };
}

/**
 *
 * @param {string} content - .md file
 * @returns
 */
const normalizeContent = (content) =>
  remark().use(normalizeContentPlugin).processSync(content).toString();

// TODO:
// function fetchContentPlugin(){}

/**
 *
 * @param {string} content - .mdx or .md file
 * @returns
 */
export async function loader(content, callback) {
  // console.log(content);
  // return remark().processSync(content).toString();

  Promise.all(
    content.split("\n").map(async (line) => {
      if (line.includes("remote")) {
        const reg = new RegExp(/(?<=src=").+(?="\s*)/g);
        let res = reg.exec(line);
        if (res.length) {
          const url = res[0];
          console.log("fetching:", url);
          return fetch(url)
            .then((res) => res.text())
            .then((text) => {
              // console.log(text);
              return normalizeContent(text);
            });
        }
        return Promise.resolve(line);
      } else {
        return Promise.resolve(line);
      }
    })
  ).then((res) => {
    // result = res.join("\n");
    callback(null, res.join("\n"));
  });
}
