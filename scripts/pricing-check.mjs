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
  'Start Free Trial',
  'Simple. Flat. No Surprises.',
  'Deposit collection and payment link handoff',
  'Trade-specific intake scripts and objection handling',
  '$1.50 per qualifying AI-handled call',
  '$1.00 per qualifying AI-handled call',
  '$0.75 per qualifying AI-handled call',
  'Performance fees are disabled by default',
  'Custom from $3,500/mo',
  '$299 guided setup',
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
  /export interface SitePricingPlan[\s\S]*?includedCallVolume\?:\s*number;[\s\S]*?capacityLabel:\s*string;[\s\S]*?features:\s*SitePricingFeature\[];/,
  'SitePricingPlan includes nonfinancial capacity guidance and structured feature fields',
);

forbidPattern('src/types/site.ts', /setupFeeAmount:/, 'setup fee field');
forbidPattern('src/types/site.ts', /overageBlockPrice:/, 'overage price field');
forbidPattern('src/types/site.ts', /overagePolicy:/, 'overage policy field');
forbidPattern('src/types/site.ts', /qualifiedBookedJobFee:/, 'booked-job fee field');
forbidPattern('src/types/site.ts', /emergencyCapturedJobFee:/, 'emergency-capture fee field');
forbidPattern('src/types/site.ts', /performanceFeesEnabled:/, 'performance-fee toggle field');

// Starter checks
requireContains(starterBlock, "monthlyPrice: 299", 'starter monthly price');
requireContains(starterBlock, "annualMonthlyPrice: 249", 'starter annual monthly price');
requireContains(starterBlock, "includedCallVolume: 100", 'starter included call volume');
requireContains(starterBlock, "capacityLabel: '1 location • 1 phone number • Up to 2 technicians'", 'starter capacity');
requireContains(starterBlock, "label: 'Applicable Stripe booking-payment workflow'", 'starter Stripe boundary');
requireContains(starterBlock, "label: 'Missed-call text-back'", 'starter missed-call text-back');
requireContains(starterBlock, 'Planned Signmons Money: branded estimates', 'starter planned invoice baseline');
requireContains(
  starterBlock,
  "label: 'Booking-ready job summaries with customer, issue, urgency, and preferred window'",
  'starter booking-ready summary feature',
);
forbidContains(starterBlock, 'Deposit collection and service-fee preauthorization', 'starter deposit preauthorization');
forbidContains(starterBlock, 'After-hours call capture and emergency escalation', 'starter after-hours escalation');
forbidContains(starterBlock, 'Multi-tech routing for up to 5 active vehicles', 'starter multi-tech routing');

// Growth checks
requireContains(growthBlock, "monthlyPrice: 799", 'growth monthly price');
requireContains(growthBlock, "annualMonthlyPrice: 649", 'growth annual monthly price');
requireContains(growthBlock, "includedCallVolume: 500", 'growth included call volume');
requireContains(growthBlock, "capacityLabel: '1 location • Up to 5 technicians'", 'growth capacity');
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
requireContains(proBlock, "capacityLabel: 'Up to 3 locations • Up to 15 technicians'", 'pro capacity');
requireContains(
  proBlock,
  'Advanced after-hours dispatch rules by trade, service area, and technician availability',
  'pro advanced after-hours dispatch',
);
requireContains(proBlock, 'Custom escalation rules and failed-booking fallback', 'pro failed-booking fallback');
requireContains(proBlock, 'Optional photo intake by SMS (beta)', 'pro optional photo intake');
requireContains(proBlock, 'Planned QuickBooks Online accounting synchronization', 'pro planned accounting adapter');

// Enterprise checks
requireContains(
  enterpriseBlock,
  "capacityLabel: 'Contracted locations, technicians, and communication volume'",
  'enterprise contracted capacity',
);
requireContains(enterpriseBlock, "customPriceLabel: 'Custom fixed subscription'", 'enterprise fixed subscription label');
requireContains(enterpriseBlock, 'Multi-location reporting', 'enterprise multi-location reporting');

requirePattern(
  'src/data/pricingContent.ts',
  /title:\s*'Founding Partner Program'[\s\S]*?price:\s*'\$199\/mo'[\s\S]*?terms:\s*'Guided setup included'[\s\S]*?first 10 approved external businesses/i,
  'limited Founding Partner offer disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /title:\s*'One Predictable Subscription'[\s\S]*?fixed selected-plan subscription[\s\S]*?No setup, per-call overage, booked-job, emergency-capture, revenue-share, or required MVP add-on fees/i,
  'fixed subscription and no-outcome-fee disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /without a basic Signmons per-invoice fee/i,
  'basic invoice platform-fee disclosure',
);

requirePattern(
  'src/data/pricingContent.ts',
  /normal Twilio and AI usage is included/i,
  'normal Twilio and AI usage inclusion',
);

requirePattern(
  'src/data/pricingContent.ts',
  /Call capacity is a fair-use suitability guide—not a metered charge/i,
  'non-metered call-capacity guidance',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-after-hours-advanced'[\s\S]*?growth:\s*'no'/,
  'compare matrix reserves advanced after-hours for Pro',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-recovery-advanced'[\s\S]*?growth:\s*'no'/,
  'compare matrix reserves advanced recovery for Pro',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-after-hours-capture'[\s\S]*?growth:\s*'yes'/,
  'compare matrix keeps basic after-hours capture included in Growth',
);

requirePattern(
  'src/data/pricingContent.ts',
  /id:\s*'cmp-recovery-basic'[\s\S]*?starter:\s*'yes'[\s\S]*?growth:\s*'yes'/,
  'compare matrix includes missed-call text-back from Starter upward',
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
