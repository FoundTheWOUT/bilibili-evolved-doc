import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["__test__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
