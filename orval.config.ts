import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "tags-split",
      target: "src/api/generated/index.ts",
      client: "solid-start",
      mock: false,
      clean: true,
      prettier: true,
    },
    input: {
      target: "./openapi.yaml",
    },
  },
});
