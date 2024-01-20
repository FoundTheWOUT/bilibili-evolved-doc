/**
 * 替换 <remote /> 为 src 里内容
 * Author: FoundTheWOUT
 * */

import { remark } from "remark";
import { visit } from "unist-util-visit";
import { toHtml } from "hast-util-to-html";
import { fromHtml } from "hast-util-from-html";
import { fromMarkdown } from "mdast-util-from-markdown";
import { remove } from "unist-util-remove";
import fetch from "node-fetch";

// TODO, check valid jsx.
const isJsxNode = (node) => {
  // if is tsx component, should not handle it.
  if (
    node.value[0] == "<" &&
    (/[A-Z]/.test(node.value[1]) || /[A-Z]/.test(node.value[2]))
  ) {
    return true;
  }
  return false;
};

const normalizeHTML = (tree) => {
  tree = remove(tree, { tagName: "style" });
  if (!tree) return;
  tree = remove(tree, { type: "comment" });
  if (!tree) return;
  return toHtml(tree, {
    closeSelfClosing: true,
  });
};

const normalizeContentPlugin = () => {
  return (tree) => {
    visit(tree, (node) => {
      if (!node.value) return;
      // ! only modify img
      if (
        node.type == "html" &&
        (node.value.includes("<img") ||
          node.value.includes("<!-") ||
          node.value.includes("<style"))
      ) {
        if (isJsxNode(node)) return;
        const tree = fromHtml(node.value, { fragment: true }) ?? "";
        node.value = normalizeHTML(tree);
      }
      if (node.type == "code" && node.lang == "powershell") {
        node.lang = "shell";
      }
    });
  };
};

const handleSectionSelect = (tree, options) => {
  if (options.section.length == 0) return tree;
  let depth = -1; // depth != -1 meaning should retained the node.
  let index = 0;
  while (index < tree.children.length) {
    // select the current node
    const node = tree.children[index];
    switch (node.type) {
      case "heading":
        /**
         * for example, a md:
         * ### Foo <- selected section
         * Bar
         * ## Jack <- drop content from here
         * 19
         */
        if (depth !== -1 && node.depth <= depth) {
          depth = -1;
        }
        for (let child of node.children) {
          if (options.section.includes(child.value)) {
            depth = node.depth; // record the depth
            index++;
          } else if (depth !== -1) {
            index++;
          } else {
            tree.children.splice(index, 1);
          }
        }
        break;
      default:
        if (depth == -1) {
          // if not collecting item, remove it from children directly.
          tree.children.splice(index, 1);
        } else {
          index++;
        }
        break;
    }
  }
  return tree;
};
// TODO: write to local.
const cache = new Map();
const fetchContentPlugin = (options = {}) => {
  const { section, dry } = options;
  return async (tree) => {
    if (dry && section) {
      handleSectionSelect(tree, options);
      return;
    }
    const promises = [];
    let preFragmentLength = 0;
    // 1. select mdxJsxFlowElement type, and get content from url.
    // mdast -> hast for later use
    visit(tree, "html", (node, offset, parent) => {
      if (isJsxNode(node)) return;
      const hast = fromHtml(node.value, { fragment: true });
      if (
        hast.children &&
        hast.children[0] &&
        hast.children[0].tagName == "remote"
      ) {
        const hastNode = hast.children[0];
        let url = null;
        let sections = [];
        for (let [attrName, value] of Object.entries(hastNode.properties)) {
          if (attrName == "src") {
            url = value;
          }
          if (/section/g.test(attrName)) {
            sections.push(value);
          }
        }
        if (url) {
          promises.push(() => {
            console.log("fetching:", url);
            const encodedUrl = encodeURI(url);
            const cacheContent = cache.get(encodedUrl);
            let _p = null;
            if (cacheContent) {
              console.log("url:", url, "hit cache!");
              _p = Promise.resolve(cacheContent);
            } else {
              _p = fetch(url)
                .then((res) => res.text())
                .then((text) => {
                  cache.set(encodedUrl, text);
                  return text;
                });
            }

            return _p
              .then((text) => {
                console.log("compiling markdown to mdast...");
                return fromMarkdown(text);
              })
              .then((mdast) => {
                console.log("selecting section...");
                return handleSectionSelect(mdast, { section: sections });
              })
              .then((mdast) => {
                parent.children.splice(
                  offset + preFragmentLength,
                  1,
                  ...mdast.children
                );
                preFragmentLength += mdast.children.length - 1;
              })
              .catch((error) => {
                console.log("fetch content error:", error);
              });
          });
        }
      }
    });

    for (let p of promises) {
      try {
        await p();
      } catch (error) {
        switch (process.env.NODE_ENV) {
          case "development":
            console.error(error);
          default: {
            throw Error(error);
            process.exit(0);
          }
        }
      }
    }
  };
};

/**
 *
 * @param {string} content - .mdx or .md file
 * @param {(_:undefined,value:string)=>void} callback
 * @param {{dry:boolean}|undefined}options - when passing the dry options, the loader would not find <remote>, but treat it like a file which after fetching content from url.
 * @returns
 */
export async function loader(content, callback, options) {
  remark()
    .use(fetchContentPlugin, options)
    .use(normalizeContentPlugin)
    .process(content)
    .then((res) => {
      callback(null, res.toString());
    });
}

export const loaderPromise = (template, options) =>
  new Promise((resolve, reject) => {
    loader(
      template,
      (_, value) => {
        resolve(value);
      },
      options
    );
  });
