import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

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
  "/pay",
];

const distClient = path.resolve(__dirname, "dist");
const distServer = path.resolve(__dirname, "dist-server");
const templatePath = path.join(distClient, "index.html");
const serverEntryPath = path.join(distServer, "entry-server.js");

async function prerender() {
  if (!fs.existsSync(templatePath)) {
    throw new Error(`dist/index.html not found. Run "npm run build" first.`);
  }
  if (!fs.existsSync(serverEntryPath)) {
    throw new Error(
      `dist-server/entry-server.js not found. Run "npm run build:server" first.`,
    );
  }

  const template = fs.readFileSync(templatePath, "utf-8");
  const { render } = await import(pathToFileURL(serverEntryPath).href);

  console.log(`\n🔨 Prerendering ${ROUTES_TO_PRERENDER.length} routes...\n`);

  let successCount = 0;
  let failCount = 0;

  for (const url of ROUTES_TO_PRERENDER) {
    try {
      // render() is now async because of the preload step
      const { html: appHtml, helmetContext } = await render(url);
      const { helmet } = helmetContext;

      const headTags = [
        helmet?.title?.toString() ?? "",
        helmet?.meta?.toString() ?? "",
        helmet?.link?.toString() ?? "",
        helmet?.script?.toString() ?? "",
      ]
        .filter(Boolean)
        .join("\n    ");

      const finalHtml = template
        .replace('content=""', `content="${url}"`)
        .replace("<!--helmet-outlet-->", headTags)
        .replace("<!--ssr-outlet-->", appHtml);

      // Verify the output actually contains page content
      if (
        url !== "/" &&
        !finalHtml.includes("</main>") &&
        finalHtml.split("\n").length < 20
      ) {
        console.warn(
          `  ⚠️   ${url} — HTML looks suspiciously short, check for SSR errors`,
        );
      }

      const routePath = url === "/" ? "/index.html" : `${url}/index.html`;
      const outputPath = path.join(distClient, routePath);
      const outputDir = path.dirname(outputPath);

      fs.mkdirSync(outputDir, { recursive: true });
      fs.writeFileSync(outputPath, finalHtml);

      console.log(`  ✅  ${url}  →  dist${routePath}`);
      successCount++;
    } catch (err) {
      console.error(`  ❌  Failed to prerender: ${url}`);
      console.error(`      ${err.message}`);
      if (process.env.PRERENDER_STRICT) {
        throw err;
      }
      failCount++;
    }
  }

  console.log(
    `\n🎉 Prerendering complete! ${successCount} succeeded, ${failCount} failed.\n`,
  );

  if (failCount > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error(err);
  process.exit(1);
});
