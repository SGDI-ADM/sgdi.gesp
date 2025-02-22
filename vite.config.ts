import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    themePlugin(),
    ...(process.env.NODE_ENV !== "production" &&
    process.env.REPL_ID !== undefined
      ? [
          await import("@replit/vite-plugin-cartographer").then((m) =>
            m.cartographer(),
          ),
        ]
      : []),
  ],
  root: './client',
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'client/index.html')
      }
    }
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, './client/src')
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, "shared"),
      },
    ],
  },
})
