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
  'src/types/site.ts',
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
  'Deposit collection and payment link handoff',
  'Trade-specific intake scripts and objection handling',
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

const requireContains = (text, expected, description) => {
  checksRun += 1;
  if (!text.includes(expected)) {
    violations.push(`[required-value] ${description} missing.`);
  }
};

const forbidContains = (text, expected, description) => {
  checksRun += 1;
  if (text.includes(expected)) {
    violations.push(`[forbidden-value] ${description} found.`);
  }
};

const extractPlanBlock = (pricingText, planId, nextPlanId) => {
  const startToken = `id: '${planId}'`;
  const start = pricingText.indexOf(startToken);

  checksRun += 1;
  if (start < 0) {
    violations.push(`[missing-plan] plan "${planId}" was not found in src/data/pricingContent.ts.`);
    return '';
  }

  const nextStart = nextPlanId ? pricingText.indexOf(`id: '${nextPlanId}'`, start + startToken.length) : -1;
  const end = nextStart > -1 ? nextStart : pricingText.length;
  return pricingText.slice(start, end);
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

const pricingText = readText('src/data/pricingContent.ts');
const starterBlock = extractPlanBlock(pricingText, 'starter', 'growth');
const growthBlock = extractPlanBlock(pricingText, 'growth', 'pro');
const proBlock = extractPlanBlock(pricingText, 'pro', 'enterprise');
const enterpriseBlock = extractPlanBlock(pricingText, 'enterprise');

requirePattern(
  'src/data/pricingContent.ts',
  /const STARTER_OVERAGE_POLICY = '\$1\.50 per qualifying AI-handled call';/,
  'starter per-call overage value',
);
requirePattern(
  'src/data/pricingContent.ts',
  /const GROWTH_OVERAGE_POLICY = '\$1\.00 per qualifying AI-handled call';/,
  'growth per-call overage value',
);
requirePattern(
  'src/data/pricingContent.ts',
  /const PRO_OVERAGE_POLICY = '\$0\.75 per qualifying AI-handled call';/,
  'pro per-call overage value',
);
requirePattern(
  'src/data/pricingContent.ts',
  /saveBadge:\s*'SAVE 15–20%'/,
  'annual discount range disclosure',
);

// Phase 2 schema contract checks
requirePattern(
  'src/types/site.ts',
  /export interface SitePricingFeature[\s\S]*?id:\s*string;[\s\S]*?label:\s*string;[\s\S]*?category:\s*SitePricingFeatureCategory;[\s\S]*?includedInTier:\s*SitePricingPlanId;/,
  'SitePricingFeature structured contract',
);
requirePattern(
  'src/types/site.ts',
  /export interface SitePricingPlan[\s\S]*?includedCallVolume\?:\s*number;[\s\S]*?setupFeeAmount:\s*number;[\s\S]*?vehicleRange:\s*string;[\s\S]*?overagePolicy:\s*string;[\s\S]*?features:\s*SitePricingFeature\[];/,
  'SitePricingPlan includes numeric and structured pricing fields',
);

// Starter checks
requireContains(starterBlock, "monthlyPrice: 299", 'starter monthly price');
requireContains(starterBlock, "annualMonthlyPrice: 249", 'starter annual monthly price');
requireContains(starterBlock, "includedCallVolume: 100", 'starter included call volume');
requireContains(starterBlock, "setupFeeAmount: 499", 'starter setup fee amount');
requireContains(starterBlock, "vehicleRange: 'Single vehicle or owner-operator'", 'starter vehicle range');
requireContains(starterBlock, "overagePolicy: STARTER_OVERAGE_POLICY", 'starter overage policy');
requireContains(starterBlock, "label: 'Payment link handoff'", 'starter payment handoff');
requireContains(starterBlock, 'Planned Signmons Money: branded estimates', 'starter planned invoice baseline');
requireContains(
  starterBlock,
  "label: 'Booking-ready job summaries with customer, issue, urgency, and preferred window'",
  'starter booking-ready summary feature',
);
forbidContains(starterBlock, 'Deposit collection and service-fee preauthorization', 'starter deposit preauthorization');
forbidContains(starterBlock, 'Basic missed-call SMS recovery', 'starter missed-call recovery');
forbidContains(starterBlock, 'After-hours call capture and emergency escalation', 'starter after-hours escalation');
forbidContains(starterBlock, 'Multi-tech routing for up to 5 active vehicles', 'starter multi-tech routing');

// Growth checks
requireContains(growthBlock, "monthlyPrice: 799", 'growth monthly price');
requireContains(growthBlock, "annualMonthlyPrice: 649", 'growth annual monthly price');
requireContains(growthBlock, "includedCallVolume: 500", 'growth included call volume');
requireContains(growthBlock, "setupFeeAmount: 1000", 'growth setup fee amount');
requireContains(growthBlock, "vehicleRange: '2-5 active vehicles'", 'growth vehicle range');
requireContains(growthBlock, "overagePolicy: GROWTH_OVERAGE_POLICY", 'growth overage policy');
requireContains(growthBlock, 'After-hours call capture and emergency escalation', 'growth after-hours capture');
requireContains(
  growthBlock,
  'Emergency, high-priority, and standard call classification',
  'growth urgency classification',
);
requireContains(growthBlock, 'Multi-tech routing for up to 5 active vehicles', 'growth multi-tech routing');
requireContains(growthBlock, 'Deposit collection and service-fee preauthorization', 'growth payment preauthorization');
requireContains(growthBlock, 'Service fee disclosure and booking policy enforcement', 'growth fee policy enforcement');
requireContains(
  growthBlock,
  'HVAC, plumbing, electrical, drains, and construction triage flows',
  'growth trade-specific triage',
);
requireContains(growthBlock, 'Human handoff alerts for urgent or unclear calls', 'growth handoff alerts');
requireContains(growthBlock, 'Planned Signmons Money: deposits, partial payments', 'growth planned invoice workflow');

// Pro checks
requireContains(proBlock, "monthlyPrice: 1499", 'pro monthly price');
requireContains(proBlock, "annualMonthlyPrice: 1249", 'pro annual monthly price');
requireContains(proBlock, "includedCallVolume: 1500", 'pro included call volume');
requireContains(proBlock, "setupFeeAmount: 2500", 'pro setup fee amount');
requireContains(proBlock, "vehicleRange: '5-15 active vehicles'", 'pro vehicle range');
requireContains(proBlock, "overagePolicy: PRO_OVERAGE_POLICY", 'pro overage policy');
requireContains(
  proBlock,
  'Advanced after-hours dispatch rules by trade, service area, and technician availability',
  'pro advanced after-hours dispatch',
);
requireContains(proBlock, 'Custom escalation rules and failed-booking fallback', 'pro failed-booking fallback');
requireContains(proBlock, 'Optional photo intake by SMS (beta)', 'pro optional photo intake');
requireContains(proBlock, 'Planned QuickBooks Online accounting synchronization', 'pro planned accounting adapter');

// Enterprise checks
requireContains(enterpriseBlock, "setupFeeAmount: 5000", 'enterprise setup fee amount');
requireContains(enterpriseBlock, "setupFeeLabel: 'Custom implementation from $5,000'", 'enterprise setup fee label');
requireContains(enterpriseBlock, "customPriceLabel: 'Custom from $3,500/mo'", 'enterprise custom price anchor');
requireContains(enterpriseBlock, 'Multi-location reporting', 'enterprise multi-location reporting');

requirePattern(
  'src/data/pricingContent.ts',
  /title:\s*'Founding Partner Program'[\s\S]*?price:\s*'\$199\/mo'[\s\S]*?setup:\s*'\$299 guided setup'[\s\S]*?first 10 approved external businesses/i,
  'limited Founding Partner offer disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /Performance fees are disabled by default/i,
  'performance fees disabled-by-default disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /without a basic Signmons per-invoice fee/i,
  'basic invoice platform-fee disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /Disclosed Pass-Through Provider Fees/,
  'complete monthly-total formula',
);

requirePattern(
  'src/data/pricingContent.ts',
  /title:\s*'Advanced after-hours emergency escalation'/,
  'advanced after-hours emergency add-on title',
);

requirePattern(
  'src/data/pricingContent.ts',
  /title:\s*'Advanced missed-call recovery campaigns'/,
  'advanced missed-call recovery add-on title',
);

forbidPattern(
  'src/data/pricingContent.ts',
  /title:\s*'After-hours emergency escalation'/,
  'legacy emergency add-on title',
);

forbidPattern(
  'src/data/pricingContent.ts',
  /title:\s*'Missed-call SMS recovery'/,
  'legacy recovery add-on title',
);

requirePattern(
  'src/data/pricingContent.ts',
  /per-tier qualifying-call overage/i,
  'updated pricing note with per-tier qualifying-call overage',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-after-hours-advanced'[\s\S]*?growth:\s*'Add-on'/,
  'compare matrix distinguishes advanced after-hours as Growth add-on',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-recovery-advanced'[\s\S]*?growth:\s*'Add-on'/,
  'compare matrix distinguishes advanced recovery as Growth add-on',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-after-hours-capture'[\s\S]*?growth:\s*'yes'/,
  'compare matrix keeps basic after-hours capture included in Growth',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-recovery-basic'[\s\S]*?growth:\s*'yes'/,
  'compare matrix keeps basic recovery included in Growth',
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
