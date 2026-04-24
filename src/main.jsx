/**
 * src/main.jsx  — CLIENT entry point (unchanged behaviour)
 *
 * Changed from your original:
 *   - Routes are now in AppRoutes.jsx (shared with server entry)
 *   - ReactDOM.createRoot → ReactDOM.hydrateRoot so it hydrates the
 *     server-prerendered HTML instead of wiping it and re-rendering.
 *   - HelmetProvider wraps the app (was already there via react-helmet-async).
 *
 * Everything else (BrowserRouter, Suspense, lazy imports) stays exactly
 * the same as before.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";

import AppRoutes from "./AppRoutes.jsx";

// ── Scroll restoration ───────────────────────────────────────────────────────
import ScrollToTop from "./components/ScrollToTop";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// hydrateRoot is used instead of createRoot so React "attaches" to the
// existing server-rendered HTML rather than blowing it away and re-rendering.
// For routes that were NOT prerendered (e.g. /demand-form), the div#root
// will still be empty and hydrateRoot gracefully falls back to a fresh render.
ReactDOM.hydrateRoot(
  document.getElementById("root"),
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);