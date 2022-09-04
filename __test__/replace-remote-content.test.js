import { loader } from "loaders/replace-remote-content/main.mjs";
// const replaceRemoteContent = (content) => content;
import { describe, it, expect } from "vitest";
const __replaceFun = loader;

describe("Unit Test replace RemoteContent", () => {
  it("can fetch remote content", () => {
    const content =
      '<remote src="https://cdn.jsdelivr.net/gh/the1812/Bilibili-Evolved@master/doc/features/features.md"/>';
    __replaceFun(content, (content) => {
      expect(content).not.empty;
    });
  });
});
