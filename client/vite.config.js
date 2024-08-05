import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  // 현재 작업 디렉토리에서 환경 변수를 로드합니다.
  const env = loadEnv(mode, process.cwd());

  // 환경 변수가 올바르게 로드되었는지 확인합니다.
  console.log("API URL:", env.VITE_APP_SPRING_API_URL);

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_APP_SPRING_API_URL, // 환경 변수를 사용합니다.
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
