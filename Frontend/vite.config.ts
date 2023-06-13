import { defineConfig } from "vite";

import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name].js",
        entryFileNames: "[name].js",
      },
    },
  },
  plugins: [react()],
  // server: {
  //   proxy: {
  //     'api/get_all_employees_data_from_bob': {
  //       target: 'https://sm-server.netlify.app/api/get_all_employees_data_from_bob',
  //       changeOrigin: true
  //     },
  //   }
  // }
});
