import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const isLocal = mode !== "production";

  const httpsOptions = isLocal
    ? {
        key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
        cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
      }
    : undefined;

  return {
    define: {
      global: "globalThis",
    },
    plugins: [react(), svgr(), visualizer({ open: true, gzipSize: true, brotliSize: true })],
    resolve: {
      alias: [
        { find: "@components", replacement: path.resolve(__dirname, "src/components") },
        { find: "@assets", replacement: path.resolve(__dirname, "src/assets") },
        { find: "@utils", replacement: path.resolve(__dirname, "src/utils") },
        { find: "@pages", replacement: path.resolve(__dirname, "src/pages") },
        { find: "@hooks", replacement: path.resolve(__dirname, "src/hooks") },
        { find: "@store", replacement: path.resolve(__dirname, "src/store") },
        { find: "@layout", replacement: path.resolve(__dirname, "src/layout") },
        { find: "@api", replacement: path.resolve(__dirname, "src/api") },
      ],
    },
    server: {
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
        },
      },
      https: httpsOptions,
    },
    optimizeDeps: {
      include: ["crypto-browserify", "stream-browserify"],
    },
  };
});
