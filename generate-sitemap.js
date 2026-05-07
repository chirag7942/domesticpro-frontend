/**
 * generate-sitemap.js  (project root)
 *
 * Generates a sitemap.xml in the dist/ folder after prerendering.
 * Run via:  npm run sitemap
 * Or as part of:  npm run build:ssg
 *
 * Update SITE_URL and ROUTES_CONFIG for your actual domain and pages.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = "https://domesticpro.in";

/**
 * Route configuration for sitemap.
 * priority: 0.0–1.0 (1.0 = highest)
 * changefreq: always | hourly | daily | weekly | monthly | yearly | never
 */
const ROUTES_CONFIG = [
  // ── Homepage ───────────────────────────────────────────────────────────────
  { path: "/", priority: "1.0", changefreq: "weekly" },

  // ── Service pages (matching your old sitemap order + priorities) ───────────
  { path: "/services/live-in-support", priority: "0.9", changefreq: "monthly" },
  { path: "/services/baby-caretaker", priority: "0.9", changefreq: "monthly" },
  { path: "/services/cooking-help", priority: "0.9", changefreq: "monthly" },
  { path: "/services/patient-care", priority: "0.9", changefreq: "monthly" },
  { path: "/services/japa", priority: "0.9", changefreq: "monthly" },
  { path: "/services/drivers", priority: "0.8", changefreq: "monthly" }, // 0.8 per your old sitemap

  // ── Key commercial pages ───────────────────────────────────────────────────
  { path: "/pricing", priority: "0.8", changefreq: "monthly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "yearly" },

  // ── Referral pages (new — not in your old sitemap) ─────────────────────────
  { path: "/refer-a-helper", priority: "0.5", changefreq: "monthly" },
  { path: "/refer-a-household", priority: "0.5", changefreq: "monthly" },

  // ── Legal pages ────────────────────────────────────────────────────────────
  { path: "/privacy-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/refund-policy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms-and-conditions", priority: "0.3", changefreq: "yearly" },
];

function generateSitemap() {
  const now = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const urlEntries = ROUTES_CONFIG.map(
    ({ path: routePath, priority, changefreq }) => {
      const loc = `${SITE_URL}${routePath}`;
      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    },
  ).join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;

  const outputPath = path.join(__dirname, "dist", "sitemap.xml");
  fs.writeFileSync(outputPath, sitemap.trim());
  console.log(
    `\n🗺️  Sitemap generated: dist/sitemap.xml (${ROUTES_CONFIG.length} URLs)\n`,
  );
}

generateSitemap();
