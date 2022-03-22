// 替换 <remote /> 为 src 里内容

let inHTMLBlock = false;

const normalizeContent = (content) =>
  content
    .split("\n")
    .map((line) => {
      if (line.includes("/style") || line.includes("/div")) {
        inHTMLBlock = false;
        return null;
      }
      if (inHTMLBlock) {
        return null;
      }
      if (line.includes("style") || line.includes("div")) {
        inHTMLBlock = true;
        return null;
      }
      return line;
    })
    .filter((i) => i !== null)
    .join("\n");

const loader = async function (content) {
  const callback = this.async();

  let result;
  try {
    result = await Promise.all(
      content
        .split("\n")
        .map(async (line) => {
          // remove style block
          if (line.includes("remote")) {
            const reg = new RegExp(/".*"/);
            let res = reg.exec(line);
            if (res) {
              const str = res[0];
              res = str.slice(1, str.length - 1);
            }
            const text = await fetch(res).then((res) => res.text());

            return normalizeContent(text);
          } else {
            return line;
          }
        })
        .filter((i) => i)
    );
    result = result.join("\n");
  } catch (err) {
    return callback(err);
  }

  return callback(null, result);
};

module.exports = loader;
