import replaceRemoteContent from "loaders/replace-remote-content.mjs";
// const replaceRemoteContent = (content) => content;

describe("Unit Test replace RemoteContent", () => {
  it("can fetch remote content", () => {
    const content =
      '<remote src="https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@master/doc/features/features.md"/>';
    expect(replaceRemoteContent(content)).not.empty;
  });
});
