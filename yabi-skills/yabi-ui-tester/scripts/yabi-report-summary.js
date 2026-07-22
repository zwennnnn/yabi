const fs = require('fs');
const path = require('path');

const resultsRoot = path.resolve(__dirname, '..', 'yabi-test-results');
const explicitRun = process.argv[2] ? path.resolve(process.argv[2]) : null;

function latestRun() {
  if (!fs.existsSync(resultsRoot)) return null;
  return fs
    .readdirSync(resultsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(resultsRoot, entry.name))
    .sort()
    .pop();
}

function severity(row) {
  if (
    row.consoleLogs > 0 ||
    row.networkErrors > 0 ||
    row.brokenMedia > 0 ||
    row.horizontalOverflow > 0 ||
    row.axeViolations > 0
  ) {
    return 'CRITICAL';
  }
  if (row.forbiddenPatterns > 0 || row.overlapCandidates > 0) {
    return 'MEDIUM';
  }
  return 'LOW';
}

const runDir = explicitRun || latestRun();
if (!runDir) {
  console.error('No yabi-test-results run directory found.');
  process.exit(1);
}

const summaryPath = path.join(runDir, 'summary.json');
if (!fs.existsSync(summaryPath)) {
  console.error(`Missing summary.json in ${runDir}`);
  process.exit(1);
}

const summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
const counts = { CRITICAL: 0, MEDIUM: 0, LOW: 0 };
for (const row of summary) counts[severity(row)] += 1;

const lines = [
  `# YABI-UI-TESTER Report`,
  '',
  `Run: ${runDir}`,
  `Routes x viewports: ${summary.length}`,
  `Critical rows: ${counts.CRITICAL}`,
  `Medium rows: ${counts.MEDIUM}`,
  `Low rows: ${counts.LOW}`,
  '',
  '## Findings',
  '',
  ...summary.map((row) => {
    const route = row.route || 'unknown route';
    return `- ${severity(row)} ${route} ${row.viewport}: console=${row.consoleLogs}, network=${row.networkErrors}, media=${row.brokenMedia}, axe=${row.axeViolations}, overflow=${row.horizontalOverflow}, forbidden=${row.forbiddenPatterns}, overlap=${row.overlapCandidates}`;
  }),
  '',
  'Inspect screenshots before final judgement. JSON is evidence, not the whole verdict.',
  '',
];

const reportPath = path.join(runDir, 'report.md');
fs.writeFileSync(reportPath, lines.join('\n'));
console.log(lines.join('\n'));
console.log(`Report written: ${reportPath}`);
