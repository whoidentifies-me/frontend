import { defineConfig } from "@solidjs/start/config";
import { baseConfig } from "./app.config.base";

export default defineConfig({
  ...baseConfig,
  ssr: false,
  server: {
    static: true,
    prerender: {
      crawlLinks: true,
    },
  },
});
