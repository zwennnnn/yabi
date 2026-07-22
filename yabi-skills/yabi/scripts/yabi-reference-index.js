const fs = require('fs');
const path = require('path');

const skillRoot = path.resolve(__dirname, '..');
const skillFile = path.join(skillRoot, 'SKILL.md');
const refsRoot = path.join(skillRoot, 'references');

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return null;
  const fields = {};
  for (const line of match[1].split(/\r?\n/)) {
    const index = line.indexOf(':');
    if (index > -1) {
      fields[line.slice(0, index).trim()] = line.slice(index + 1).trim();
    }
  }
  return fields;
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const frontmatter = parseFrontmatter(read(skillFile));
const refs = fs.existsSync(refsRoot)
  ? walk(refsRoot).filter((file) => file.endsWith('.md'))
  : [];

console.log('YABI reference index');
console.log(`name: ${frontmatter?.name || 'missing'}`);
console.log(`description: ${frontmatter?.description ? 'present' : 'missing'}`);
console.log(`references: ${refs.length}`);

for (const file of refs) {
  console.log(`- ${path.relative(skillRoot, file).replace(/\\/g, '/')}`);
}

if (!frontmatter?.name || !frontmatter?.description) {
  process.exitCode = 1;
}
