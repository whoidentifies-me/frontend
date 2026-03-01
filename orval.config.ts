declare const process: { env: Record<string, string | undefined> };
import { defineConfig } from "orval";

export default defineConfig({
  api: {
    output: {
      mode: "tags-split",
      target: "src/api/generated/index.ts",
      client: "solid-start",
      baseUrl: process.env.VITE_API_URL || "http://localhost:8080",
      mock: false,
      clean: true,
      prettier: true,
      override: {
        mutator: {
          path: "./src/api/fetchInstance.ts",
          name: "fetchInstance",
        },
      },
    },
    input: {
      target: "./openapi.yaml",
    },
  },
});
