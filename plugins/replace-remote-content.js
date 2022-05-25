// const fetch = require("node-fetch");
const axios = require("axios").default;
// 替换 <remote /> 为 src 里内容

let inHTMLBlock = false;

const normalizeImgBlock = (line) => {
  if (typeof line !== "string") {
    console.error("line must be str");
  }
  line = line.trim();
  return line.slice(0, line.length - 1) + "/>";
};

const normalizeContent = (content) =>
  content
    .split("\n")
    .map((line) => {
      // TODO: end HTML tag.
      if (line.includes("<img")) return normalizeImgBlock(line);

      // remove HTML comment.
      if (line.includes("<!--")) {
        return null;
      }
      return line;
    })
    .filter((i) => i !== null)
    .join("\n");

const loader = async function (content) {
  const callback = this.async();

  let result = "";
  console.log("start replace remote content.");
  try {
    result = await Promise.all(
      content
        .split("\n")
        .map(async (line) => {
          if (line.includes("remote")) {
            const reg = new RegExp(/(?<=src=").+(?="\s*)/g);
            let res = reg.exec(line);
            let text = "";
            const d = new Date();
            if (res.length) {
              const url = `${res[0]}?spam=${Number(d)}`;
              console.log("fetching:", url);
              const { data } = await axios.get(url);
              text = data;
            }

            return normalizeContent(text);
          } else {
            return line;
          }
        })
        .filter((i) => i)
    );
    result = result.join("\n");
  } catch (err) {
    console.log("[replace-remote-content]: err,", err);
  }

  return callback(null, result);
};

module.exports = loader;
