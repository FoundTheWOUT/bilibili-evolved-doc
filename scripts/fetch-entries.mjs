import { access, mkdirSync } from "fs";
import { writeFile } from "fs/promises";
import fetch from "node-fetch";
import path from "path";

const BASE_URL = "https://github.com/the1812/Bilibili-Evolved/raw";

const writeToPublic = (target, text) => {
  const _dir = path.join(path.join(process.cwd(), "./public/entries"));
  const file_path = path.join(_dir, target);
  access(_dir, (err) => {
    if (err) {
      mkdirSync(_dir);
    } else {
      writeFile(file_path, text);
    }
  });
};

export default async function () {
  try {
    await fetch(BASE_URL + "/master/dist/bilibili-evolved.user.js")
      .then((res) => res.text())
      .then((text) =>
        // write to public
        writeToPublic("bilibili-evolved.user.js", text)
      );

    await fetch(BASE_URL + "/preview/dist/bilibili-evolved.preview.user.js")
      .then((res) => res.text())
      .then(
        (text) => writeToPublic("bilibili-evolved.preview.user.js", text)
        // write to public
      );
  } catch (error) {
    console.log(error);
  }
}
