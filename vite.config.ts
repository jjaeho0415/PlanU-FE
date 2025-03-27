import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [react(), svgr()],
    define: {
      global: "window",
    },
    resolve: {
      alias: [
        {
          find: "@components",
          replacement: path.resolve(__dirname, "src/components"),
        },
        {
          find: "@assets",
          replacement: path.resolve(__dirname, "src/assets"),
        },
        {
          find: "@utils",
          replacement: path.resolve(__dirname, "src/utils"),
        },
        {
          find: "@pages",
          replacement: path.resolve(__dirname, "src/pages"),
        },
        {
          find: "@hooks",
          replacement: path.resolve(__dirname, "src/hooks"),
        },
        {
          find: "@store",
          replacement: path.resolve(__dirname, "src/store"),
        },
        {
          find: "@layout",
          replacement: path.resolve(__dirname, "src/layout"),
        },
        {
          find: "@api",
          replacement: path.resolve(__dirname, "src/api"),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
        },
      },
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
      https: {
        key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
      },
    },
  };
});
