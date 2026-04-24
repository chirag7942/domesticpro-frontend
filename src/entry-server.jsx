/**
 * entry-server.jsx
 *
 * This file is the SERVER entry point used ONLY at build time for SSG.
 * It is never loaded in the browser.
 *
 * It uses ReactDOMServer.renderToString + StaticRouter to render each
 * route to an HTML string, which the prerender script writes to disk.
 *
 * react-helmet-async's HelmetProvider captures per-page <head> tags
 * so that title, description, og:image etc. are baked into each HTML file.
 */

import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

// ── Import your actual App routes/components ─────────────────────────────────
// We import the same Routes used in main.jsx so every route renders identically.
// NOTE: Any component that uses browser-only APIs (window, localStorage, etc.)
// must guard those calls with:  if (typeof window !== 'undefined') { ... }
import AppRoutes from "./AppRoutes.jsx";

/**
 * render(url)
 *
 * Called by prerender.js for EACH route.
 * Returns { html, helmetContext } where:
 *   - html       = the rendered React tree as a string
 *   - helmetContext.helmet = title, meta, links etc. for this specific route
 */
export function render(url) {
  const helmetContext = {};

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <AppRoutes />
        </StaticRouter>
      </HelmetProvider>
    </React.StrictMode>
  );

  return { html, helmetContext };
}