#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const violations = [];
let checksRun = 0;

const requiredFiles = [
  'src/App.tsx',
  'src/data/pricingContent.ts',
  'src/data/siteContent.ts',
  'src/pages/site/SitePricing.tsx',
  'public/site/pricing.html',
];

const activePricingFiles = [
  'src/data/pricingContent.ts',
  'src/data/siteContent.ts',
  'src/pages/site/SitePricing.tsx',
  'public/site/pricing.html',
];

const bannedPhrases = [
  'Unlimited calls',
  'No per-call fees',
  'Start Free Trial',
  'Simple. Flat. No Surprises.',
];

const readText = (relativePath) => {
  const fullPath = path.join(root, relativePath);
  if (!existsSync(fullPath)) {
    violations.push(`[missing-file] ${relativePath} does not exist.`);
    return '';
  }

  return readFileSync(fullPath, 'utf8');
};

const firstLineForPattern = (text, pattern) => {
  const lines = text.split('\n');

  for (let index = 0; index < lines.length; index += 1) {
    if (pattern.test(lines[index])) {
      return index + 1;
    }
  }

  return -1;
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

const forbidPattern = (filePath, pattern, description) => {
  checksRun += 1;
  const text = readText(filePath);

  if (!text) {
    return;
  }

  const regex = new RegExp(pattern.source, pattern.flags);

  if (regex.test(text)) {
    const line = firstLineForPattern(text, pattern);
    const lineSuffix = line > 0 ? `:${line}` : '';
    violations.push(`[forbidden-pattern] ${description} found in ${filePath}${lineSuffix}.`);
  }
};

for (const file of requiredFiles) {
  checksRun += 1;
  if (!existsSync(path.join(root, file))) {
    violations.push(`[missing-file] ${file} does not exist.`);
  }
}

requirePattern(
  'src/App.tsx',
  /import\s+SitePricing\s+from\s+'\.\/pages\/site\/SitePricing';/,
  'React pricing route import',
);

forbidPattern(
  'src/App.tsx',
  /['"]\/pricing['"]\s*:\s*['"]pricing\.html['"]/,
  'legacy static pricing route mapping',
);

requirePattern(
  'src/App.tsx',
  /normalizedPath\s*===\s*'\/pricing'/,
  'explicit React pricing route branch',
);

requirePattern(
  'public/site/pricing.html',
  /window\.location\.replace\('\/pricing'\)/,
  'legacy pricing redirect script',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'starter'[\s\S]*?monthlyPrice:\s*199[\s\S]*?annualMonthlyPrice:\s*159/,
  'starter plan price ladder (199\/159)',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'growth'[\s\S]*?monthlyPrice:\s*499[\s\S]*?annualMonthlyPrice:\s*399/,
  'growth plan price ladder (499\/399)',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'pro'[\s\S]*?monthlyPrice:\s*999[\s\S]*?annualMonthlyPrice:\s*799/,
  'pro plan price ladder (999\/799)',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'enterprise'[\s\S]*?customPriceLabel:\s*'Custom from \$2,500\/mo'/,
  'enterprise anchor price label',
);

requirePattern(
  'src/data/pricingContent.ts',
  /fair-usage protections/i,
  'fair-usage messaging',
);

requirePattern(
  'src/data/pricingContent.ts',
  /Missed-call SMS recovery workflows/,
  'missed-call recovery feature messaging',
);

for (const phrase of bannedPhrases) {
  const pattern = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');

  for (const filePath of activePricingFiles) {
    forbidPattern(filePath, pattern, `legacy pricing phrase "${phrase}"`);
  }
}

if (violations.length > 0) {
  console.error('pricing:check failed');
  for (const violation of violations) {
    console.error(`- ${violation}`);
  }
  process.exit(1);
}

console.log(`pricing:check passed (${checksRun} checks)`);
