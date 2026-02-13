declare const process: { env: Record<string, string | undefined> };
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "tags-split",
      target: "src/api/generated/index.ts",
      client: "solid-start",
      baseUrl: process.env.VITE_API_URL || "",
      mock: false,
      clean: true,
      prettier: true,
    },
    input: {
      target: "./openapi.yaml",
    },
  },
});
