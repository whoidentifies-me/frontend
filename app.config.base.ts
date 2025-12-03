import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export const baseConfig = {
  vite: {
    plugins: [tailwindcss() as any, imagetools()],
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
  },
};
