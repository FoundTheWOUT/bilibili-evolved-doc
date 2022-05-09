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
      if (line.includes("<img")) return normalizeImgBlock(line);

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
          if (line.includes("remote")) {
            const reg = new RegExp(/(?<=src=").+(?="\s*)/g);
            let res = reg.exec(line);
            let text = "";
            const d = new Date();
            if (res.length) {
              const url = `${res[0]}?spam=${Number(d)}`;
              console.log("fetching:", url);
              text = await fetch(url).then((res) => res.text());
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
    return callback(err);
  }

  return callback(null, result);
};

module.exports = loader;
