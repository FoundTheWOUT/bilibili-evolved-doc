import { loader } from "loaders/replace-remote-content/main.mjs";
// const replaceRemoteContent = (content) => content;
import { describe, it, expect } from "vitest";
const __replaceFun = (
  template: string,
  options?: { dry: boolean; section: string[] }
) =>
  new Promise<string>((resolve, reject) => {
    loader(
      template,
      (_, value) => {
        resolve(value);
      },
      options
    );
  });

// first, host

describe("Unit Test replace RemoteContent", () => {
  it("can fetch remote content", async () => {
    const content = '<remote src="http://127.0.0.1:5500/__test__/example.md"/>';

    const res = await __replaceFun(content);
    // console.log("res:", res);
    expect(res).not.empty;
  });

  it("fetch remote content, and select two section", async () => {
    const content =
      '<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks" section-two="Twice a day, and some days more often"/>';

    const res = await __replaceFun(content);
    // console.log("res:", res);
    expect(res).eq(
      `### Sugaring time begins in February and lasts for two to six weeks

well into March. Weather permitting, Grandad always started tapping on Washington's Birthday. The sugaring season, as we called it, required thawing days and freezing nights to allow the sap to flow. Rain spoiled the sap and wind dried up the tap holes so it was a fair-weather industry. Grandad hand-drilled his tap holes using a No. 8 wood bit, drilling about 1/2 inch deep into the vein of a sugar maple tree. Into this hole, a wood spile would then be tapped and after drilling another, a pail was hung to collect the sap as it steadily dripped from the spile. The wooden spiles were about eight inches in length and three-quarters of an inch in diameter. Ours were made from elderberry as that scrub has a soft center that could be cleaned out to make a tube. Our maple grove was along the brook and the edge of the field about a have mile up from the house. There were approximately 200 sugar maples large enough to tap on Grandad's farm and the scars on the trunks of many of the older trees indicated the number of years they had been supplying sap.

## Twice a day, and some days more often

the sap was collected from each tree and carried up to the saphouse. The kettles were filled and, with a good hot fire beneath, thirty pails of sap would boil down to about eight quarts of syrup in four to five hours. As the sap boiled down and thickened it was removed from the fire and strained and then placed in the brass kettle over a low fire for the last bit of boiling down to syrup. The syrup, as it came from the saphouse, was usually not quite thick enough so it was Grandma's job to boil it a little longer on the back of the old wood-burning kitchen stove. For a thicker cream sugar (we called it "slush") and for sugar cakes, additional boiling and beating were required with all hands taking a turn. The beating cooled the heavy syrup and as it cooled it became granular and almost white. Our reward was the pan to "lick" out and hot syrup poured out on the snow for taffy.

### My brothers, sisters, and I, as youngsters

were at the saphouse every chance we got during the sugaring season, playing in the brook and jumping from rock to rock. If you slipped and got wet, the fire was always handy. When we grew older we helped to gather the sap, split wood, and tend the fire. After Grandad's death, I did the whole bit myself for a few years.
`
    );
  });

  it("cache hit", async () => {
    const content = `<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>

## Foo
Bar

<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>

<remote src="http://127.0.0.1:5500/__test__/example.md" section="Sugaring time begins in February and lasts for two to six weeks"/>
`;

    const res = await __replaceFun(content);
    // console.log("res:");
    // console.log(res);
    // console.log(
    //   "------------------------------------ res:end ----------------------------------"
    // );
    expect(res)
      .eq(`### Sugaring time begins in February and lasts for two to six weeks

well into March. Weather permitting, Grandad always started tapping on Washington's Birthday. The sugaring season, as we called it, required thawing days and freezing nights to allow the sap to flow. Rain spoiled the sap and wind dried up the tap holes so it was a fair-weather industry. Grandad hand-drilled his tap holes using a No. 8 wood bit, drilling about 1/2 inch deep into the vein of a sugar maple tree. Into this hole, a wood spile would then be tapped and after drilling another, a pail was hung to collect the sap as it steadily dripped from the spile. The wooden spiles were about eight inches in length and three-quarters of an inch in diameter. Ours were made from elderberry as that scrub has a soft center that could be cleaned out to make a tube. Our maple grove was along the brook and the edge of the field about a have mile up from the house. There were approximately 200 sugar maples large enough to tap on Grandad's farm and the scars on the trunks of many of the older trees indicated the number of years they had been supplying sap.

## Foo

Bar

### Sugaring time begins in February and lasts for two to six weeks

well into March. Weather permitting, Grandad always started tapping on Washington's Birthday. The sugaring season, as we called it, required thawing days and freezing nights to allow the sap to flow. Rain spoiled the sap and wind dried up the tap holes so it was a fair-weather industry. Grandad hand-drilled his tap holes using a No. 8 wood bit, drilling about 1/2 inch deep into the vein of a sugar maple tree. Into this hole, a wood spile would then be tapped and after drilling another, a pail was hung to collect the sap as it steadily dripped from the spile. The wooden spiles were about eight inches in length and three-quarters of an inch in diameter. Ours were made from elderberry as that scrub has a soft center that could be cleaned out to make a tube. Our maple grove was along the brook and the edge of the field about a have mile up from the house. There were approximately 200 sugar maples large enough to tap on Grandad's farm and the scars on the trunks of many of the older trees indicated the number of years they had been supplying sap.

### Sugaring time begins in February and lasts for two to six weeks

well into March. Weather permitting, Grandad always started tapping on Washington's Birthday. The sugaring season, as we called it, required thawing days and freezing nights to allow the sap to flow. Rain spoiled the sap and wind dried up the tap holes so it was a fair-weather industry. Grandad hand-drilled his tap holes using a No. 8 wood bit, drilling about 1/2 inch deep into the vein of a sugar maple tree. Into this hole, a wood spile would then be tapped and after drilling another, a pail was hung to collect the sap as it steadily dripped from the spile. The wooden spiles were about eight inches in length and three-quarters of an inch in diameter. Ours were made from elderberry as that scrub has a soft center that could be cleaned out to make a tube. Our maple grove was along the brook and the edge of the field about a have mile up from the house. There were approximately 200 sugar maples large enough to tap on Grandad's farm and the scars on the trunks of many of the older trees indicated the number of years they had been supplying sap.
`);
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
    expect(res).eq(`# 合集包

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

### Sugaring time begins in February and lasts for two to six weeks

well into March. Weather permitting, Grandad always started tapping on Washington's Birthday. The sugaring season, as we called it, required thawing days and freezing nights to allow the sap to flow. Rain spoiled the sap and wind dried up the tap holes so it was a fair-weather industry. Grandad hand-drilled his tap holes using a No. 8 wood bit, drilling about 1/2 inch deep into the vein of a sugar maple tree. Into this hole, a wood spile would then be tapped and after drilling another, a pail was hung to collect the sap as it steadily dripped from the spile. The wooden spiles were about eight inches in length and three-quarters of an inch in diameter. Ours were made from elderberry as that scrub has a soft center that could be cleaned out to make a tube. Our maple grove was along the brook and the edge of the field about a have mile up from the house. There were approximately 200 sugar maples large enough to tap on Grandad's farm and the scars on the trunks of many of the older trees indicated the number of years they had been supplying sap.
`);
  });
});
