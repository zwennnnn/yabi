# Audit Protocol

## Setup

Clarify the target:
- Single route or complete site?
- Dev server or production URL?
- Login or special state required?
- Is mobile performance part of the test?

For complete sites, crawl routes first:

```bash
npm run crawl -- http://localhost:3000 yabi-test-results/routes.json
```

Then pass the route list into the audit:

```bash
npm run audit -- --routes yabi-test-results/routes.json
```

## Viewport Matrix

Minimum:
- Desktop: 1920x1080
- Laptop: 1440x900
- Tablet: 768x1024
- Mobile: 390x844

Desktop is the main showcase. Mobile is the durability test.

## Screenshot Review

Review scroll steps, not only the first viewport:
- Entry frame.
- Section midpoint.
- Transition midpoint.
- CTA and form area.
- Footer and closing frame.

ScrollTrigger and pinned scenes usually fail in transition frames.

## Evidence Order

1. Read `summary.json` for coarse risk.
2. Read `axe-report.json`, `network-errors.json`, `broken-media.json`, and
   `dom-signals.json` per route/viewport.
3. Inspect screenshots visually.
4. Classify findings as critical, medium, or low.

Verify JSON findings with screenshots when possible. Mark false positives as
candidate findings.
