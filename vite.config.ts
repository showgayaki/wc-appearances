import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { APP_DESCRIPTION, APP_TITLE } from "./src/constants/app";

export default defineConfig({
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [
    react(),
    {
      name: "inject-app-metadata",
      transformIndexHtml(html) {
        return html.replaceAll("%APP_TITLE%", APP_TITLE).replaceAll("%APP_DESCRIPTION%", APP_DESCRIPTION);
      },
    },
  ],
});
