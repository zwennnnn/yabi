const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

const startUrl = process.argv[2] || 'http://localhost:3000';
const outFile = path.resolve(process.argv[3] || path.join('yabi-test-results', 'routes.json'));
const maxRoutes = Number(process.argv[4]) || 40;

function normalize(url) {
  const parsed = new URL(url);
  parsed.hash = '';
  return parsed.toString().replace(/\/$/, '');
}

(async () => {
  const origin = new URL(startUrl).origin;
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const visited = new Set();
  const queue = [normalize(startUrl)];

  try {
    while (queue.length && visited.size < maxRoutes) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);

      console.log(`Crawling ${current}`);
      await page.goto(current, { waitUntil: 'networkidle' });

      const links = await page.evaluate(() =>
        Array.from(document.querySelectorAll('a[href]'))
          .map((anchor) => anchor.href)
          .filter(Boolean),
      );

      for (const link of links) {
        try {
          const normalized = normalize(link);
          if (new URL(normalized).origin === origin && !visited.has(normalized)) {
            queue.push(normalized);
          }
        } catch (_) {
          // Ignore malformed hrefs.
        }
      }
    }
  } finally {
    await browser.close();
  }

  const routes = Array.from(visited);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, JSON.stringify(routes, null, 2));
  console.log(`Wrote ${routes.length} routes to ${outFile}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
