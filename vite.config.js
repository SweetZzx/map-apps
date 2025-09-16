import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "/map-apps/",  // 动态设置 base 路径
  build: {
    outDir: "dist",
  },
});
