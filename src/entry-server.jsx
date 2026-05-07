/**
 * entry-server.jsx
 *
 * WHY renderToPipeableStream instead of renderToString:
 *
 *   renderToString is synchronous. When it encounters a React.lazy component
 *   that hasn't rendered before, the lazy wrapper throws a Promise (Suspense
 *   mechanism). renderToString cannot handle that throw — it immediately emits
 *   a <!--$!--><template data-msg="Switched to client rendering..."> marker and
 *   produces empty page content.
 *
 *   The ROUTE_PRELOADS trick below loads the module into Node's module cache,
 *   so the lazy Promise resolves in one microtask. But renderToString is
 *   synchronous — it never yields that microtask.
 *
 *   renderToPipeableStream with onAllReady:
 *     1. Starts rendering
 *     2. Hits React.lazy → throws Promise
 *     3. Suspense boundary catches it
 *     4. Waits for the Promise to resolve (one microtask, module is cached)
 *     5. Re-renders the component with the loaded module
 *     6. onAllReady fires — ALL Suspense boundaries have resolved
 *     7. Pipes complete, fully-rendered HTML to our Writable collector
 *
 *   Result: every prerendered route gets full page content, zero SSR abort
 *   markers, zero hydration mismatches.
 *
 * ROUTE_PRELOADS:
 *   Still valuable as a warm-up. Ensures the module is already in Node's
 *   cache before renderToPipeableStream starts, so the lazy Promise resolves
 *   in a single microtask rather than a full async import round-trip.
 *   This cuts per-route render time noticeably, especially for larger pages.
 *
 * onAllReady vs onShellReady:
 *   onShellReady fires as soon as the shell (non-suspended content) is ready,
 *   which would still miss lazy-loaded page bodies. onAllReady fires only after
 *   every single Suspense boundary — including our page-level ones — has
 *   resolved. For SSG we always want the complete document.
 */

import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Writable } from "node:stream";
import AppRoutes from "./AppRoutes.jsx";

// ── Pre-load map — must mirror the lazy() calls in AppRoutes.jsx exactly ──────
const ROUTE_PRELOADS = {
  "/about": () => import("./pages/AboutUs.jsx"),
  "/refer-a-helper": () => import("./pages/ReferAHelper.jsx"),
  "/refer-a-household": () => import("./pages/ReferAHousehold.jsx"),
  "/pricing": () => import("./pages/Pricing.jsx"),
  "/contact": () => import("./pages/ContectNow.jsx"),
  "/services/baby-caretaker": () => import("./pages/products/Nanny.jsx"),
  "/services/cooking-help": () => import("./pages/products/Cook.jsx"),
  "/services/drivers": () => import("./pages/products/Driver.jsx"),
  "/services/japa": () => import("./pages/products/Japa.jsx"),
  "/services/live-in-support": () => import("./pages/products/HouseHelp.jsx"),
  "/services/patient-care": () => import("./pages/products/PatientCare.jsx"),
  "/terms-and-conditions": () => import("./pages/TermsAndCondition.jsx"),
  "/refund-policy": () => import("./pages/RefundPolicy.jsx"),
  "/privacy-policy": () => import("./pages/PrivacyPolicy.jsx"),
};

/**
 * render(url) → Promise<{ html: string, helmetContext: object }>
 *
 * Called once per route by prerender.js.
 * Returns a complete HTML string ready to inject into the template.
 */
export async function render(url) {
  // ── 1. Warm the module cache for this route ──────────────────────────────
  const preload = ROUTE_PRELOADS[url];
  if (preload) {
    try {
      await preload();
    } catch (err) {
      // Non-fatal: renderToPipeableStream will still resolve the lazy import,
      // just with a slightly longer wait. Log and continue.
      console.warn(`[SSR] Failed to preload module for ${url}:`, err.message);
    }
  }

  // ── 2. Render with full Suspense support ─────────────────────────────────
  const helmetContext = {};

  return new Promise((resolve, reject) => {
    const chunks = [];
    let settled = false;

    // One-shot settle helpers to prevent double-resolve/reject
    function finish(result) {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      resolve(result);
    }

    function fail(err) {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      reject(err);
    }

    const { pipe, abort } = renderToPipeableStream(
      <React.StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <AppRoutes />
          </StaticRouter>
        </HelmetProvider>
      </React.StrictMode>,
      {
        /**
         * onAllReady fires once every Suspense boundary has resolved.
         * At this point helmetContext is fully populated and it is safe
         * to flush the complete HTML document.
         */
        onAllReady() {
          const writable = new Writable({
            write(chunk, _encoding, callback) {
              chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
              callback();
            },
          });

          writable.on("finish", () =>
            finish({
              html: Buffer.concat(chunks).toString("utf-8"),
              helmetContext,
            })
          );

          writable.on("error", fail);

          pipe(writable);
        },

        /**
         * onShellError fires when the root shell itself errors (very rare).
         * Reject so prerender.js can report the route as failed.
         */
        onShellError: fail,

        /**
         * onError fires for non-fatal errors inside Suspense boundaries.
         * Log them but do not abort — renderToPipeableStream recovers.
         */
        onError(err) {
          console.error(`[SSR] Non-fatal render error for ${url}:`, err);
        },
      }
    );

    // Safety net: abort after 30 s to avoid hanging the build
    const timeoutId = setTimeout(() => {
      abort();
      fail(new Error(`[SSR] Render timeout (30 s) for ${url}`));
    }, 30_000);
  });
}