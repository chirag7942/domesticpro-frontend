import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // ── SSR configuration ─────────────────────────────────────────────────────
  // noExternal: packages that must be bundled (not externalized) in SSR mode.
  // react-helmet-async uses ESM exports that need to be transformed by Vite.
  ssr: {
    noExternal: ["react-helmet-async"],
  },

  // ── Preview server (unchanged) ─────────────────────────────────────────────
  preview: {
    allowedHosts: [
      "domesticpro.in",
      "www.domesticpro.in",
      "domestic-pro.onrender.com",
    ],
  },

  // ── Build config (unchanged from your original) ───────────────────────────
  build: {
    target: "es2020",
    chunkSizeWarningLimit: 350,
    rollupOptions: {
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
