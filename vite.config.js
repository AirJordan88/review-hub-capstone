import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      "#app": "/app.js",
      "#api": "/api",
      "#middleware": "/middleware",
      "#db": "/db",
      "#utils": "/utils",
    },
  },
});
