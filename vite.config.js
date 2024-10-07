import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
  },
  base: "/reactChat/", // 빌드된 파일의 기본 경로 설정
  build: {
    outDir: "dist/reactChat", // 빌드된 파일이 저장될 디렉토리 설정
  },
  server: {
    port: 8586, // 개발 서버의 포트 번호 설정
  },
});
