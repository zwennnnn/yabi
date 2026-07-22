const fs = require('fs');
const path = require('path');

const root = path.resolve(process.argv[2] || process.cwd());
const outDir = path.resolve(process.argv[3] || path.join(root, 'yabi-static-audit'));

const ignoredDirs = new Set([
  '.git',
  '.next',
  'build',
  'dist',
  'node_modules',
  'coverage',
  'yabi-test-results',
  'yabi-static-audit',
]);

const extensions = new Set([
  '.astro',
  '.css',
  '.html',
  '.js',
  '.jsx',
  '.mdx',
  '.scss',
  '.svelte',
  '.ts',
  '.tsx',
  '.vue',
]);

const rules = [
  {
    id: 'gradient-background',
    severity: 'medium',
    pattern: /\b(linear|radial|conic)-gradient\s*\(/i,
    message: 'Gradient usage detected; YABI requires a real visual/material reason.',
  },
  {
    id: 'generic-card-copy',
    severity: 'medium',
    pattern: /\b(card|feature-card|pricing-card|testimonial-card)\b/i,
    message: 'Card/grid naming detected; inspect for generic AI layout.',
  },
  {
    id: 'numbered-process',
    severity: 'medium',
    pattern: /\b(step\s*[1-9]|adim\s*[1-9]|adım\s*[1-9])\b/i,
    message: 'Numbered process language detected; avoid default step sections.',
  },
  {
    id: 'generic-icons',
    severity: 'low',
    pattern: /\b(fontawesome|heroicons|fa-[a-z0-9-]+|hero-icon)\b/i,
    message: 'Generic icon system reference detected; prefer project-specific visual language.',
  },
  {
    id: 'cheap-reveal',
    severity: 'low',
    pattern: /\b(fade[-_ ]?in|slide[-_ ]?up|animate[-_ ]?in)\b/i,
    message: 'Generic reveal naming detected; inspect motion quality.',
  },
];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (!ignoredDirs.has(entry.name)) {
        files.push(...walk(path.join(dir, entry.name)));
      }
      continue;
    }

    if (extensions.has(path.extname(entry.name).toLowerCase())) {
      files.push(path.join(dir, entry.name));
    }
  }

  return files;
}

function auditFile(file) {
  const text = fs.readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const findings = [];

  lines.forEach((line, index) => {
    for (const rule of rules) {
      if (rule.pattern.test(line)) {
        findings.push({
          rule: rule.id,
          severity: rule.severity,
          file: path.relative(root, file).replace(/\\/g, '/'),
          line: index + 1,
          message: rule.message,
          sample: line.trim().slice(0, 180),
        });
      }
    }
  });

  return findings;
}

fs.mkdirSync(outDir, { recursive: true });
const findings = walk(root).flatMap(auditFile);
const grouped = findings.reduce((acc, finding) => {
  acc[finding.severity] = (acc[finding.severity] || 0) + 1;
  return acc;
}, {});

const jsonPath = path.join(outDir, 'findings.json');
const mdPath = path.join(outDir, 'findings.md');

fs.writeFileSync(jsonPath, JSON.stringify({ root, counts: grouped, findings }, null, 2));

const markdown = [
  '# YABI Static Audit',
  '',
  `Root: ${root}`,
  `Findings: ${findings.length}`,
  '',
  ...findings.map(
    (finding) =>
      `- ${finding.severity.toUpperCase()} ${finding.rule} ${finding.file}:${finding.line} - ${finding.message}`,
  ),
  '',
].join('\n');

fs.writeFileSync(mdPath, markdown);

console.log(`Findings: ${findings.length}`);
console.log(`JSON: ${jsonPath}`);
console.log(`MD: ${mdPath}`);

if (findings.some((finding) => finding.severity === 'high')) {
  process.exitCode = 1;
}
