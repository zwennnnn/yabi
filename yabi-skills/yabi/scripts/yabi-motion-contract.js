const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(process.argv[2] || process.cwd());
const sectionsRoot = path.join(projectRoot, 'src', 'components', 'sections');
const outDir = path.resolve(process.argv[3] || path.join(projectRoot, 'yabi-motion-contract'));

function readIfExists(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
}

function findSectionDirs() {
  if (!fs.existsSync(sectionsRoot)) return [];
  return fs
    .readdirSync(sectionsRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => path.join(sectionsRoot, entry.name));
}

function hasAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function auditSection(dir) {
  const name = path.basename(dir);
  const files = fs.readdirSync(dir);
  const jsxFile = files.find((file) => /^index\.(jsx|tsx|js|ts)$/.test(file));
  const cssFile = files.find((file) => /\.(css|scss|module\.css)$/.test(file));
  const componentText = jsxFile ? readIfExists(path.join(dir, jsxFile)) : '';
  const cssText = cssFile ? readIfExists(path.join(dir, cssFile)) : '';
  const combined = `${componentText}\n${cssText}`;

  const findings = [];

  if (!jsxFile) {
    findings.push('Missing index component file.');
  }

  if (!cssFile) {
    findings.push('Missing section-local CSS file.');
  }

  if (!/use[A-Z][A-Za-z0-9]*Scene|useSectionScene|useHeroScene|use[A-Z][A-Za-z0-9]*Motion/.test(componentText)) {
    findings.push('No section motion hook usage detected.');
  }

  if (!hasAny(combined, [/ScrollTrigger/, /gsap\./, /timeline\s*\(/, /useLayoutEffect/])) {
    findings.push('No GSAP/ScrollTrigger/useLayoutEffect signal detected.');
  }

  if (!hasAny(combined, [/clip-path/, /transform/, /translate/, /scale/, /rotate/, /mask/, /will-change/, /transition/, /animation/])) {
    findings.push('No CSS motion/transform signal detected.');
  }

  if (/fade[-_ ]?in|slide[-_ ]?up/i.test(combined)) {
    findings.push('Generic fade/slide naming detected; verify this is not repeated cheap motion.');
  }

  return {
    section: name,
    files: { component: jsxFile || null, styles: cssFile || null },
    status: findings.length ? 'needs-review' : 'passes-basic-contract',
    findings,
  };
}

fs.mkdirSync(outDir, { recursive: true });

const sections = findSectionDirs();
const results = sections.map(auditSection);
const summary = {
  projectRoot,
  sectionsRoot,
  sectionCount: sections.length,
  failingSections: results.filter((result) => result.findings.length).length,
  results,
};

const jsonPath = path.join(outDir, 'motion-contract.json');
const mdPath = path.join(outDir, 'motion-contract.md');

fs.writeFileSync(jsonPath, JSON.stringify(summary, null, 2));

const markdown = [
  '# YABI Motion Contract',
  '',
  `Project: ${projectRoot}`,
  `Sections: ${summary.sectionCount}`,
  `Needs review: ${summary.failingSections}`,
  '',
  ...results.flatMap((result) => [
    `## ${result.section}`,
    '',
    `Status: ${result.status}`,
    '',
    result.findings.length
      ? result.findings.map((finding) => `- ${finding}`).join('\n')
      : '- Basic section motion contract signals found.',
    '',
  ]),
].join('\n');

fs.writeFileSync(mdPath, markdown);

console.log(`Sections: ${summary.sectionCount}`);
console.log(`Needs review: ${summary.failingSections}`);
console.log(`JSON: ${jsonPath}`);
console.log(`MD: ${mdPath}`);

if (summary.failingSections > 0) {
  process.exitCode = 1;
}
