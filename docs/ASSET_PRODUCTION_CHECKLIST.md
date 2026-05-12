# Asset Production Checklist

Purpose: one execution checklist to produce, QA, and integrate all visual assets for the high-ticket marketing site.

References:
- `docs/ASSET_MANIFEST.md`
- `docs/ASSET_GENERATOR_PROMPTS.md`
- `docs/ASSET_USAGE_MAP.md`

---

## 0) Pre-Production Setup

- [ ] Confirm canonical style direction: corporate memphis + futuristic premium
- [ ] Confirm pricing/offer direction reflected in visuals (revenue protection, payment-first dispatch)
- [ ] Create local folders exactly as defined in manifest under `/public/assets/...`
- [ ] Lock naming convention (`kebab-case`, exact IDs)
- [ ] Choose output pipeline (generator + manual edit tool)

Done criteria:
- All folders exist
- Team agrees on one visual style guide and does not mix styles

---

## 1) Produce P0 Assets First (Launch-Critical)

### 1.1 Brand Core
- [ ] BR-01 `logo-dark.svg`
- [ ] BR-02 `logo-light.svg`
- [ ] BR-04 `og-home.jpg`

### 1.2 Hero Core
- [ ] HR-01 `hero-desktop.webp`
- [ ] HR-02 `hero-tablet.webp`
- [ ] HR-03 `hero-mobile.webp`
- [ ] HR-04 `phone-iso.png`

### 1.3 Status Chips
- [ ] CH-01..CH-08 (all 8)

### 1.4 Core Home Visuals
- [ ] HM-01 `pain-revenue-leak.webp`
- [ ] HM-02 `compare-flow.svg`
- [ ] HM-03 `how-step-icons.svg`

### 1.5 Integrations
- [ ] IN-01..IN-05 (all 5 logo variants)

Done criteria:
- Home can render with full premium visual stack without placeholders

---

## 2) Produce P1 Assets (Conversion Support)

- [ ] HM-04 `proof-metrics-bg.webp`
- [ ] HM-05 `final-cta-shield.webp`
- [ ] FP-03 `dispatch-board.webp`
- [ ] FP-04 `revenue-dashboard.webp`
- [ ] FP-05 `roi-calculator.webp`
- [ ] TS-01..TS-03 testimonial portraits
- [ ] TR-01, TR-02 trust badges

Done criteria:
- Pricing, revenue dashboard, and ROI pages have complete visual support

---

## 3) Produce P2 Assets (Depth + Expansion)

- [ ] FP-01 `business-rules-graph.svg`
- [ ] FP-02 `brand-voice-mock.webp`
- [ ] FP-06 `customer-tech-flow.svg`
- [ ] ID-01..ID-08 industry hero visuals
- [ ] SH-01..SH-05 memphis shape library

Done criteria:
- Industry + compare + supporting pages are asset-complete

---

## 4) Export Rules (Hard Requirements)

- [ ] Raster hero/section visuals in WEBP
- [ ] Transparent object renders in PNG (WEBP optional secondary)
- [ ] Logos/icons/diagrams in SVG
- [ ] Create mobile-specific variants where specified
- [ ] No missing dimensions (match manifest exactly)

Done criteria:
- Every exported file matches manifest size + format + background policy

---

## 5) Optimization Pass

- [ ] Compress hero assets (`<350 KB` target for hero desktop)
- [ ] Keep above-the-fold total media under `~900 KB`
- [ ] SVG cleanup (remove unnecessary metadata)
- [ ] Validate transparency is preserved on PNG overlays
- [ ] Ensure no visible artifacts from compression

Done criteria:
- Asset payload passes performance budget targets without quality collapse

---

## 6) Integration Pass (Repo)

- [ ] Copy assets to exact repo paths in `/public/assets/...`
- [ ] Verify filenames match manifest exactly
- [ ] Update component imports/paths only after files are present
- [ ] Remove stale placeholder assets
- [ ] Confirm route-level mapping against `ASSET_USAGE_MAP.md`

Done criteria:
- No 404 asset paths
- No placeholder artwork on target routes

---

## 7) Visual QA Checklist

### Desktop
- [ ] Hero composition is balanced and text-safe
- [ ] Chips are readable and not overlapping critical copy
- [ ] Memphis accents support hierarchy, not clutter
- [ ] Card contrast is high and premium

### Tablet
- [ ] Hero density reduced appropriately
- [ ] Key focal objects remain clear

### Mobile
- [ ] Hero remains scannable in first viewport
- [ ] No cropped focal object heads/edges
- [ ] CTA buttons remain prominent above fold where possible

Done criteria:
- No visual collisions, no readability failures, no awkward crops

---

## 8) Conversion QA Checklist

- [ ] Hero communicates outcome in 3–5 seconds
- [ ] Pain -> solution -> proof -> CTA narrative is visually obvious
- [ ] Primary CTA visually dominant
- [ ] Trust/logos/badges support confidence without noise
- [ ] No section feels generic or stock

Done criteria:
- Page feels like premium system demo, not a template site

---

## 9) Final Technical Validation

- [ ] `npm run -s build`
- [ ] `npm run -s lint`
- [ ] `npm test -- --runInBand`
- [ ] Manual responsive check in browser devtools
- [ ] Compare before/after screenshots for regressions

Done criteria:
- All gates green and no broken image route

---

## 10) Handoff Package (Required)

- [ ] `ASSET_MANIFEST.md` updated if any file changed
- [ ] `ASSET_GENERATOR_PROMPTS.md` updated for any new/replaced asset
- [ ] `ASSET_USAGE_MAP.md` updated for route placement changes
- [ ] Evidence screenshots for Home, Pricing, Demo, Contact
- [ ] Short changelog of added/removed assets

Done criteria:
- Another contributor can continue work with zero ambiguity

---

## Fast Start (If You Need One-Day Delivery)

1. Complete all P0 assets only
2. Integrate Home + Pricing + Demo visuals
3. Run technical gates
4. Ship visual v1
5. Add P1/P2 in phased follow-up PRs
