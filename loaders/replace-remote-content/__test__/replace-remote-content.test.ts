import { loaderPromise as __replaceFun } from "../main.mjs";
import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "fs/promises";
import handler from "serve-handler";
import { createServer } from "http";

// first, host
const TEST_PORT = 5500;
beforeAll(async () => {
  const server = createServer((request, response) => {
    return handler(request, response, {
      // ! fix the path
      rewrites: [
        {
          source: "__test__/:name",
          destination: "loaders/replace-remote-content/__test__/:name",
        },
      ],
    });
  });
  server.listen(TEST_PORT, () => {
    console.log(`Running at http://localhost:${TEST_PORT}`);
  });

  return async () => {
    server.close();
  };
});

describe("Unit Test replace RemoteContent", () => {
  it("can fetch remote content", async () => {
    const content = '<remote src="http://127.0.0.1:5500/__test__/example.md"/>';

    const res = await __replaceFun(content);
    expect(res).toMatchSnapshot();
  });

  it("fetch remote content, and select two section", async () => {
    const content =
      '<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks" section-two="Twice a day, and some days more often"/>';

    const res = await __replaceFun(content);
    expect(res).toMatchSnapshot();
  });

  it("cache hit", async () => {
    const content = `<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>

## Foo
Bar

<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>

<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>
`;

    const res = await __replaceFun(content);
    expect(res).toMatchSnapshot();
  });

  it("html tag", async () => {
    const template = `# 合集包

合集包提供了批量的功能安装链接, 方便一次性安装大量功能.

#### 简洁至上

简化各种多余界面元素, 专注于内容本身.

包含以下功能:
删除广告, 删除直播水印, 删除视频弹窗, 禁用特殊弹幕样式, 简化评论区, 简化直播间, 简化首页, 自动收起直播侧栏, 隐藏视频推荐, 隐藏直播推荐, 隐藏视频标题层, 自动隐藏侧栏

<details>
<summary><strong>jsDelivr Stable</strong></summary>
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/utils/remove-promotions.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/live/remove-watermark.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/video/player/remove-popup.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/special-danmaku.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/simplify/comments.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/simplify/live.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/simplify/home.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/live/side-bar.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/hide/video/related-videos.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/hide/video/recommended-live.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/hide/video/top-mask.js
https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@v2/registry/dist/components/style/auto-hide-sidebar.js
</details>

<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>
`;
    const res = await __replaceFun(template);
    expect(res).toMatchSnapshot();
  });

  it("should return mdx properly", async () => {
    const mdx = (
      await readFile("loaders/replace-remote-content/__test__/example.mdx")
    ).toString();
    const res = await __replaceFun(mdx);
    expect(res).toMatchSnapshot();
  });

  it("html image self close", async () => {
    const template = `<remote src="http://127.0.0.1:5500/__test__/image-self-close.md"/>`;
    const res = await __replaceFun(template);
    expect(res).toMatchSnapshot();
  });

  it("should remove html comment", async () => {
    const template = `<remote src="http://127.0.0.1:5500/__test__/html-comment.md"/>`;
    const res = await __replaceFun(template);
    expect(res).eq("\n\n");
  });

  it("don't break mdast structure", async () => {
    const content =
      '<remote src="http://127.0.0.1:5500/__test__/changelog.md"/>';

    const res = (await __replaceFun(content)) as string;
    expect(res.replaceAll("\r", "")).toMatchSnapshot();
  });
});
