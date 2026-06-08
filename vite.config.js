import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  ssr: {
    noExternal: ["react-helmet-async"],
  },

  preview: {
    allowedHosts: [
      "domesticpro.in",
      "www.domesticpro.in",
      "domestic-pro.onrender.com",
    ],
  },

  optimizeDeps: {
    include: ["lucide-react"],
  },

  build: {
    target: "es2020",
    chunkSizeWarningLimit: 350,
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
      },
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/")
          ) {
            return "react-vendor";
          }
          if (
            id.includes("node_modules/react-router-dom/") ||
            id.includes("node_modules/@remix-run/")
          ) {
            return "router";
          }
          if (id.includes("node_modules/swiper/")) {
            return "swiper";
          }
          if (id.includes("node_modules/@fortawesome/")) {
            return "fontawesome";
          }
          if (id.includes("node_modules/axios/")) {
            return "axios";
          }
          if (id.includes("node_modules/lucide-react/")) {
            return "icons";
          }
        },
      },
    },
  },
});
