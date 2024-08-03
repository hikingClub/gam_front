import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

console.log("API URL:", process.env.VITE_APP_SPRING_API_URL);

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.VITE_APP_SPRING_API_URL,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});
