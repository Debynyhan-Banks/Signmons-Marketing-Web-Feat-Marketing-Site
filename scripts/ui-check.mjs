#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const violations = [];
let checksRun = 0;

const requiredFiles = [
  'docs/UI_STANDARDS.md',
  'DOCS_INDEX.md',
  'src/design/tokens.ts',
  'src/design/muiTheme.ts',
  'src/main.tsx',
  'src/components/ui/SectionBlock.tsx',
  'src/components/ui/GlassCard.tsx',
  'src/components/ui/FeatureListCard.tsx',
];

const readText = (relativePath) => {
  const fullPath = path.join(root, relativePath);

  if (!existsSync(fullPath)) {
    violations.push(`[missing-file] ${relativePath} does not exist.`);
    return '';
  }

  return readFileSync(fullPath, 'utf8');
};

const requirePattern = (filePath, pattern, description) => {
  checksRun += 1;
  const text = readText(filePath);

  if (!text) {
    return;
  }

  if (!pattern.test(text)) {
    violations.push(`[required-pattern] ${description} missing in ${filePath}.`);
  }
};

const containsRawColorLiteral = (text) => {
  const hexPattern = /#[0-9A-Fa-f]{3,8}\b/;
  const rgbaPattern = /rgba?\(/;
  return hexPattern.test(text) || rgbaPattern.test(text);
};

for (const file of requiredFiles) {
  checksRun += 1;
  if (!existsSync(path.join(root, file))) {
    violations.push(`[missing-file] ${file} does not exist.`);
  }
}

requirePattern('DOCS_INDEX.md', /UI_STANDARDS\.md/, 'docs index UI standards pointer');

requirePattern('src/design/muiTheme.ts', /import\s+\{\s*colors,\s*typography,\s*spacing,\s*radii\s*\}\s+from\s+'\.\/tokens';/, 'theme imports token primitives');

requirePattern(
  'src/design/muiTheme.ts',
  /primary:\s*\{[\s\S]*?main:\s*colors\.brand\.primary/,
  'theme palette uses brand primary token',
);
requirePattern('src/design/muiTheme.ts', /fontFamily:\s*typography\.fontFamily/, 'theme typography uses token font family');
requirePattern('src/design/muiTheme.ts', /borderRadius:\s*parseInt\(radii\.md,\s*10\)/, 'theme shape uses radius token');

requirePattern('src/main.tsx', /ThemeProvider\s+theme=\{muiTheme\}/, 'app wrapped by MUI ThemeProvider');

const uiDir = path.join(root, 'src/components/ui');
if (existsSync(uiDir)) {
  const files = readdirSync(uiDir).filter((name) => name.endsWith('.tsx'));
  for (const fileName of files) {
    checksRun += 1;
    const relativePath = `src/components/ui/${fileName}`;
    const text = readText(relativePath);

    if (!text) {
      continue;
    }

    if (containsRawColorLiteral(text)) {
      violations.push(`[raw-color-literal] ${relativePath} contains hex/RGBA color literals; use tokens/theme values instead.`);
    }
  }
}

if (violations.length > 0) {
  console.error('ui:check failed');
  for (const violation of violations) {
    console.error(` - ${violation}`);
  }
  process.exit(1);
}

console.log(`ui:check passed (${checksRun} checks)`);
