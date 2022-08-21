import { execSync } from "child_process";
import fetchEntries from "./fetch-entries.mjs";

(async function main() {
  await fetchEntries();
  execSync("next build", { stdio: "inherit" });
})();
