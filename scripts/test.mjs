import handler from "serve-handler";
import { createServer } from "http";
import { spawn } from "child_process";

const server = createServer((request, response) => {
  return handler(request, response);
});

const TEST_PORT = 5500;

server.listen(TEST_PORT, () => {
  console.log(`Running at http://localhost:${TEST_PORT}`);
  const child = spawn("pnpm.cmd", ["vitest"], { stdio: "inherit" });
  child.on("close", () => {
    server.close();
  });
});
