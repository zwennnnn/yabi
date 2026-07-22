const { chromium } = require('playwright');
const { AxeBuilder } = require('@axe-core/playwright');
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const OUT_ROOT = path.resolve(__dirname, '..', 'yabi-test-results');
const OUT_DIR = path.join(
  OUT_ROOT,
  new Date().toISOString().replace(/[:.]/g, '-'),
);

const VIEWPORTS = [
  { name: 'desktop', width: 1920, height: 1080 },
  { name: 'laptop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 },
];

function readOption(name) {
  const index = args.indexOf(name);
  if (index === -1) return null;
  return args[index + 1] || null;
}

function positionalUrls() {
  const urls = [];
  for (let i = 0; i < args.length; i += 1) {
    if (args[i].startsWith('--')) {
      i += 1;
      continue;
    }
    urls.push(args[i]);
  }
  return urls;
}

function loadTargets() {
  const routesFile = readOption('--routes');
  if (routesFile) {
    const parsed = JSON.parse(fs.readFileSync(path.resolve(routesFile), 'utf8'));
    return Array.isArray(parsed) ? parsed : parsed.routes;
  }

  const urls = positionalUrls();
  return urls.length ? urls : ['http://localhost:3000'];
}

const SCROLL_STEPS = Number(readOption('--steps')) || 24;
const TARGETS = loadTargets();

function safeName(value) {
  return value
    .replace(/^https?:\/\//, '')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 90)
    .toLowerCase() || 'route';
}

async function collectDomSignals(page) {
  return page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const all = Array.from(document.querySelectorAll('*'));

    const horizontalOverflow = all
      .map((element) => {
        const rect = element.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) return null;
        if (rect.right > viewportWidth + 2 || rect.left < -2) {
          return {
            tag: element.tagName.toLowerCase(),
            className: String(element.className || '').slice(0, 120),
            text: String(element.textContent || '').trim().slice(0, 120),
            rect: {
              left: Math.round(rect.left),
              right: Math.round(rect.right),
              width: Math.round(rect.width),
            },
          };
        }
        return null;
      })
      .filter(Boolean)
      .slice(0, 80);

    const forbiddenPatterns = [];
    for (const element of all) {
      const style = window.getComputedStyle(element);
      const className = String(element.className || '');
      const text = String(element.textContent || '').trim();
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      if (/\b(linear|radial|conic)-gradient\s*\(/i.test(style.backgroundImage)) {
        forbiddenPatterns.push({
          type: 'gradient',
          tag: element.tagName.toLowerCase(),
          className: className.slice(0, 120),
        });
      }

      if (/\b(card|feature-card|pricing-card|testimonial-card)\b/i.test(className)) {
        forbiddenPatterns.push({
          type: 'card-class',
          tag: element.tagName.toLowerCase(),
          className: className.slice(0, 120),
        });
      }

      if (/\b(step\s*[1-9]|adim\s*[1-9]|adım\s*[1-9])\b/i.test(text)) {
        forbiddenPatterns.push({
          type: 'numbered-process-copy',
          tag: element.tagName.toLowerCase(),
          text: text.slice(0, 120),
        });
      }
    }

    const textNodes = all
      .map((element) => {
        const rect = element.getBoundingClientRect();
        const text = String(element.textContent || '').trim();
        if (!text || rect.width < 8 || rect.height < 8) return null;
        const style = window.getComputedStyle(element);
        if (style.visibility === 'hidden' || style.display === 'none') return null;
        return {
          tag: element.tagName.toLowerCase(),
          className: String(element.className || '').slice(0, 80),
          text: text.slice(0, 80),
          rect: {
            left: rect.left,
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            width: rect.width,
            height: rect.height,
          },
        };
      })
      .filter(Boolean)
      .slice(0, 220);

    const overlapCandidates = [];
    for (let i = 0; i < textNodes.length; i += 1) {
      for (let j = i + 1; j < textNodes.length; j += 1) {
        const a = textNodes[i];
        const b = textNodes[j];
        const left = Math.max(a.rect.left, b.rect.left);
        const right = Math.min(a.rect.right, b.rect.right);
        const top = Math.max(a.rect.top, b.rect.top);
        const bottom = Math.min(a.rect.bottom, b.rect.bottom);
        const area = Math.max(0, right - left) * Math.max(0, bottom - top);
        const minArea = Math.min(a.rect.width * a.rect.height, b.rect.width * b.rect.height);
        if (area > 120 && area / minArea > 0.25) {
          overlapCandidates.push({
            a: { tag: a.tag, className: a.className, text: a.text },
            b: { tag: b.tag, className: b.className, text: b.text },
            overlapRatio: Number((area / minArea).toFixed(2)),
          });
        }
      }
    }

    return {
      viewport: { width: viewportWidth, height: viewportHeight },
      horizontalOverflow,
      forbiddenPatterns: forbiddenPatterns.slice(0, 120),
      overlapCandidates: overlapCandidates.slice(0, 80),
    };
  });
}

async function auditViewport(browser, targetUrl, viewport) {
  const routeDir = safeName(targetUrl);
  const dir = path.join(OUT_DIR, routeDir, viewport.name);
  fs.mkdirSync(dir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();

  const consoleLogs = [];
  const networkErrors = [];

  page.on('console', (msg) => {
    if (['warning', 'error'].includes(msg.type())) {
      consoleLogs.push({ type: msg.type(), text: msg.text() });
    }
  });

  page.on('pageerror', (error) => {
    consoleLogs.push({ type: 'pageerror', text: error.message });
  });

  page.on('response', (response) => {
    if (response.status() >= 400) {
      networkErrors.push({ url: response.url(), status: response.status() });
    }
  });

  await page.goto(targetUrl, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const scrollHeight = await page.evaluate(
    () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight),
  );

  for (let i = 0; i <= SCROLL_STEPS; i += 1) {
    const scrollY = Math.round((scrollHeight * i) / SCROLL_STEPS);
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(400);
    const fileName = `${String(i).padStart(3, '0')}-scroll-${scrollY}.png`;
    await page.screenshot({ path: path.join(dir, fileName) });
  }

  const brokenMedia = await page.evaluate(() => {
    const broken = [];
    document.querySelectorAll('img').forEach((img) => {
      if (!img.complete || img.naturalWidth === 0) {
        broken.push({ tag: 'img', src: img.currentSrc || img.src });
      }
    });
    document.querySelectorAll('video').forEach((video) => {
      if (video.readyState === 0) {
        broken.push({ tag: 'video', src: video.currentSrc || video.src });
      }
    });
    return broken;
  });

  const domSignals = await collectDomSignals(page);

  let axeResults = null;
  try {
    axeResults = await new AxeBuilder({ page }).analyze();
  } catch (error) {
    axeResults = { error: error.message };
  }

  fs.writeFileSync(path.join(dir, 'console-log.json'), JSON.stringify(consoleLogs, null, 2));
  fs.writeFileSync(path.join(dir, 'network-errors.json'), JSON.stringify(networkErrors, null, 2));
  fs.writeFileSync(path.join(dir, 'broken-media.json'), JSON.stringify(brokenMedia, null, 2));
  fs.writeFileSync(path.join(dir, 'dom-signals.json'), JSON.stringify(domSignals, null, 2));
  fs.writeFileSync(path.join(dir, 'axe-report.json'), JSON.stringify(axeResults, null, 2));

  await context.close();

  return {
    route: targetUrl,
    viewport: viewport.name,
    screenshots: SCROLL_STEPS + 1,
    consoleLogs: consoleLogs.length,
    networkErrors: networkErrors.length,
    brokenMedia: brokenMedia.length,
    horizontalOverflow: domSignals.horizontalOverflow.length,
    forbiddenPatterns: domSignals.forbiddenPatterns.length,
    overlapCandidates: domSignals.overlapCandidates.length,
    axeViolations: axeResults?.violations?.length ?? 'n/a',
  };
}

(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const summary = [];

  try {
    for (const targetUrl of TARGETS) {
      for (const viewport of VIEWPORTS) {
        console.log(`Testing ${targetUrl} on ${viewport.name} (${viewport.width}x${viewport.height})...`);
        summary.push(await auditViewport(browser, targetUrl, viewport));
      }
    }
  } finally {
    await browser.close();
  }

  fs.writeFileSync(path.join(OUT_DIR, 'summary.json'), JSON.stringify(summary, null, 2));
  console.log(`Done. Results: ${OUT_DIR}`);
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
