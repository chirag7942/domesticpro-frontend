/**
 * prerender.js  (project root)
 *
 * Run AFTER the normal Vite client build and AFTER the SSR build:
 *   npm run build          →  builds client  → dist/
 *   npm run build:server   →  builds SSR entry → dist-server/
 *   npm run prerender      →  this script runs, writes HTML per-route
 *
 * OR use the combined command:
 *   npm run build:ssg      →  does all three in sequence
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW IT WORKS:
 *
 *  1. Reads dist/index.html (the normal Vite client build output).
 *  2. For each route, calls the render(url) function from our SSR build
 *     (dist-server/entry-server.js), which uses ReactDOMServer.renderToString.
 *  3. Injects the rendered HTML string into the template at <!--ssr-outlet-->.
 *  4. Injects per-page <title>, <meta> tags captured by react-helmet-async.
 *  5. Writes the final HTML to:
 *       dist/index.html         for route "/"
 *       dist/about/index.html   for route "/about"
 *       etc.
 *
 *  The result is a fully static site deployable to any CDN/static host.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ── Routes to prerender ───────────────────────────────────────────────────────
// Add every public URL you want to appear as a real HTML file.
// Internal/noindex routes like /demand-form can be omitted — they'll still
// work as a normal SPA page because the client JS handles them.
const ROUTES_TO_PRERENDER = [
  "/",
  "/about",
  "/contact",
  "/pricing",
  "/refer-a-helper",
  "/refer-a-household",
  "/services/baby-caretaker",
  "/services/cooking-help",
  "/services/drivers",
  "/services/japa",
  "/services/live-in-support",
  "/services/patient-care",
  "/terms-and-conditions",
  "/refund-policy",
  "/privacy-policy",
];

// ── Paths ─────────────────────────────────────────────────────────────────────
const distClient = path.resolve(__dirname, "dist");
const distServer = path.resolve(__dirname, "dist-server");
const templatePath = path.join(distClient, "index.html");
const serverEntryPath = path.join(distServer, "entry-server.js");

async function prerender() {
  // 1. Sanity checks
  if (!fs.existsSync(templatePath)) {
    throw new Error(
      `dist/index.html not found. Run "npm run build" first.\n  Expected: ${templatePath}`,
    );
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(
      `dist-server/entry-server.js not found. Run "npm run build:server" first.\n  Expected: ${serverEntryPath}`,
    );
  }

  // 2. Load template HTML (from normal Vite client build)
  const template = fs.readFileSync(templatePath, "utf-8");

  // 3. Load the SSR render function
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  console.log(`\n🔨 Prerendering ${ROUTES_TO_PRERENDER.length} routes...\n`);

  for (const url of ROUTES_TO_PRERENDER) {
    try {
      // 4. Render the React tree for this URL
      const { html: appHtml, helmetContext } = render(url);
      const { helmet } = helmetContext;

      // 5. Build <head> injection from helmet (title, meta, og tags, etc.)
      //    These come from the <Helmet> / <SEO> components in each page.
      const headTags = [
        helmet?.title?.toString() ?? "",
        helmet?.meta?.toString() ?? "",
        helmet?.link?.toString() ?? "",
        helmet?.script?.toString() ?? "",
      ].join("\n    ");

      // 6. Inject into template
      //    - Replace <!--helmet-outlet--> with captured head tags
      //    - Replace <!--ssr-outlet--> with rendered HTML
      let finalHtml = template
        .replace("<!--helmet-outlet-->", headTags)
        .replace("<!--ssr-outlet-->", appHtml);

      // 7. Determine output path
      //    /              → dist/index.html
      //    /about         → dist/about/index.html
      //    /services/japa → dist/services/japa/index.html
      const routePath = url === "/" ? "/index.html" : `${url}/index.html`;
      const outputPath = path.join(distClient, routePath);
      const outputDir = path.dirname(outputPath);

      // 8. Write file
      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(outputPath, finalHtml);

      console.log(`  ✅  ${url}  →  dist${routePath}`);
    } catch (err) {
      console.error(`  ❌  Failed to prerender: ${url}`);
      console.error(err);
      // Don't abort entire prerender — log and continue
    }
  }

  console.log("\n🎉 Prerendering complete!\n");
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
