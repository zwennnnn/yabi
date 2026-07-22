const fs = require('fs');
const path = require('path');

const resultsRoot = path.resolve(__dirname, '..', 'yabi-test-results');

function runDirs() {
  if (!fs.existsSync(resultsRoot)) return [];
  return fs
    .readdirSync(resultsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(resultsRoot, entry.name))
    .sort();
}

function pickRuns() {
  const explicit = process.argv.slice(2).map((item) => path.resolve(item));
  if (explicit.length >= 2) return explicit.slice(0, 2);
  const dirs = runDirs();
  return dirs.slice(-2);
}

function loadSummary(dir) {
  return JSON.parse(fs.readFileSync(path.join(dir, 'summary.json'), 'utf8'));
}

function totals(rows) {
  return rows.reduce(
    (acc, row) => {
      for (const key of [
        'consoleLogs',
        'networkErrors',
        'brokenMedia',
        'horizontalOverflow',
        'forbiddenPatterns',
        'overlapCandidates',
      ]) {
        acc[key] += Number(row[key] || 0);
      }
      acc.axeViolations += Number(row.axeViolations || 0);
      return acc;
    },
    {
      consoleLogs: 0,
      networkErrors: 0,
      brokenMedia: 0,
      horizontalOverflow: 0,
      forbiddenPatterns: 0,
      overlapCandidates: 0,
      axeViolations: 0,
    },
  );
}

const [beforeDir, afterDir] = pickRuns();
if (!beforeDir || !afterDir) {
  console.error('Need two run directories to compare.');
  process.exit(1);
}

const before = totals(loadSummary(beforeDir));
const after = totals(loadSummary(afterDir));

console.log('# YABI Run Comparison');
console.log('');
console.log(`Before: ${beforeDir}`);
console.log(`After: ${afterDir}`);
console.log('');

for (const key of Object.keys(before)) {
  const delta = after[key] - before[key];
  const sign = delta > 0 ? '+' : '';
  console.log(`- ${key}: ${before[key]} -> ${after[key]} (${sign}${delta})`);
}
