const fs = require('fs');
const path = require('path');

const outFile = process.argv[2] || path.join(process.cwd(), 'yabi-brief.md');

const template = `# YABI Site Brief

## Project
- Brand/product:
- Industry:
- Site type:
- Primary audience:
- Primary conversion:
- Required routes:
- Required integrations:

## Tone
- Color direction:
- Typography direction:
- Visual references:
- Forbidden references:

## World Premise
- Concrete premise:
- Light behavior:
- Material language:
- Motion physics:
- Page-to-page continuity:

## Content
- Existing copy to preserve:
- New copy needed:
- Legal/compliance constraints:
- SEO requirements:

## Build Constraints
- Framework:
- Asset sources:
- Performance target:
- Accessibility target:
- Deadline:
`;

fs.writeFileSync(outFile, template, 'utf8');
console.log(`Created ${path.resolve(outFile)}`);
