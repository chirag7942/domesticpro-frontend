import puppeteer from "puppeteer";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const PORT = 5050;
const DIST = "./dist";

const routes = [
  "/",
  "/about",
  "/pricing",
  "/contact",
  "/refer-a-helper",
  "/refer-a-household",
  "/services/baby-caretaker",
  "/services/cooking-help",
  "/services/drivers",
  "/services/japa",
  "/services/live-in-support",
  "/services/patient-care",
  "/terms-and-condition",
  "/refund-policy",
  "/privacy-policy",
];

// Wait until server responds
async function waitForServer(url, retries = 20) {
  for (let i = 0; i < retries; i++) {
    try {
      await fetch(url);
      console.log("✅ Server is ready");
      return;
    } catch {
      console.log(`⏳ Waiting for server... (${i + 1}/${retries})`);
      await new Promise((r) => setTimeout(r, 1000));
    }
  }
  throw new Error("❌ Server never started. Check sirv installation.");
}

// Start static server
const server = exec(`npx sirv ${DIST} --port ${PORT} --single`);

server.stdout.on("data", (d) => console.log("[server]", d.trim()));
server.stderr.on("data", (d) => console.error("[server error]", d.trim()));

await waitForServer(`http://localhost:${PORT}`);

const browser = await puppeteer.launch({ headless: true });

for (const route of routes) {
  const url = `http://localhost:${PORT}${route}`;
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
    await new Promise((r) => setTimeout(r, 2000));

    const html = await page.content();

    const dir = path.join(DIST, route);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), html);

    console.log(`✅ Prerendered: ${route}`);
  } catch (err) {
    console.error(`❌ Failed: ${route} →`, err.message);
  }

  await page.close();
}

await browser.close();
server.kill();
console.log("🎉 All pages prerendered!");
process.exit(0);
