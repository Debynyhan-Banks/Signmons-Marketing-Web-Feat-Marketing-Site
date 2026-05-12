# Asset Usage Map

Purpose: map every asset ID to page route, section slot, and implementation priority.

References:
- `docs/ASSET_MANIFEST.md`
- `docs/ASSET_GENERATOR_PROMPTS.md`

---

## 1) Priority Order

### P0 (must-have before visual launch)
- BR-01, BR-02, BR-04
- HR-01, HR-02, HR-03, HR-04
- CH-01..CH-08
- HM-01, HM-02, HM-03
- IN-01..IN-05

### P1 (high-conversion support)
- HM-04, HM-05
- FP-03, FP-04, FP-05
- TS-01..TS-03
- TR-01, TR-02

### P2 (expansion/SEO depth)
- FP-01, FP-02, FP-06
- ID-01..ID-08
- SH-01..SH-05

---

## 2) Route-to-Asset Mapping

## `/` Home (`SCR-PUB-001`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Header/brand | BR-01 (dark), BR-03 | Nav logo + favicon | eager |
| Hero visual | HR-01 (desktop), HR-02 (tablet), HR-03 (mobile) | Right-side hero composition or full hero background depending layout mode | eager |
| Hero optional isolated phone | HR-04 or HR-05 | Use only if not using fully baked hero composite | eager |
| Hero status chips | CH-01..CH-08 | Floating overlays around phone/hero panel | eager |
| Hero glows | HR-06..HR-08 | Subtle layered glow accents | eager |
| Pain section visual | HM-01 | Beside or behind pain cards | eager |
| Revenue gate comparison | HM-02 | Typical vs Signmons flow block | eager |
| How it works icons | HM-03 | 5-step row | eager |
| Proof backdrop | HM-04 | Behind KPI card cluster | lazy |
| Integrations strip | IN-01..IN-05 | Logo row near lower fold | eager |
| Testimonials | TS-01..TS-03 | Social proof cards | lazy |
| Final CTA visual | HM-05 | Right side or background accent in final CTA | lazy |
| Trust badges | TR-01, TR-02 | Near pricing teaser/final CTA | lazy |

## `/pricing` (`SCR-PUB-006`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Brand | BR-01 or BR-02 | Based on nav theme | eager |
| Pricing hero support | HR-04/HR-05 (optional) | Small supporting visual only | lazy |
| Trust badges | TR-01, TR-02 | Near payment/performance disclosure | eager |
| Memphis accents | SH-01..SH-05 | Sparse decorative anchors | lazy |

## `/demo` (`SCR-PUB-007`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Demo hero | HR-01/HR-02/HR-03 | Adaptive demo header visual | eager |
| Chips | CH-01..CH-08 | Timeline state cards | eager |
| Isolated phone | HR-04/HR-05 | Main device visual | eager |
| Glow overlays | HR-06..HR-08 | Depth and focus accents | eager |

## `/contact` (`SCR-PUB-009`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Side illustration | HR-05 or HM-05 | Keep low-distraction next to form | lazy |
| Trust badges | TR-01, TR-02 | Under submit CTA | eager |

## `/done-for-you-setup` (`SCR-PUB-011`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Setup hero visual | FP-03 (light crop) or new derivative | Show guided implementation workflow | eager |
| Accent shapes | SH-01..SH-05 | Background corners only | lazy |

## `/business-rules` (`SCR-PUB-012`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Rules graph | FP-01 | Main explainer visual | eager |
| Chips | CH-08, CH-03, CH-05 | Scenario cards (Emergency/Payment/Dispatch) | eager |

## `/brand-voice` (`SCR-PUB-013`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Brand voice mock | FP-02 | Before/after script section | eager |
| Accent glows | HR-06/HR-07 | Subtle section polish | lazy |

## `/dispatch-scheduling` (`SCR-PUB-014`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Dispatch board mock | FP-03 | Primary page hero visual | eager |
| Optional phone/chips | HR-04 + CH-04/CH-05 | Secondary callouts | lazy |

## `/revenue-dashboard` (`SCR-PUB-015`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Revenue dashboard mock | FP-04 | Primary hero visual | eager |
| Proof background | HM-04 | KPI area depth | lazy |
| Trust badges | TR-01, TR-02 | Near billing/audit copy | lazy |

## `/roi-calculator` (`SCR-PUB-016`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| ROI calculator mock | FP-05 | Hero-side explanatory visual | eager |
| Final CTA support | HM-05 | Bottom conversion block | lazy |

## `/compare/answering-services` (`SCR-PUB-017`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Comparison flow | HM-02 | Core compare module | eager |
| Phone + chips | HR-04 + CH-01..CH-06 | Signmons capability side | eager |

## `/compare/field-service-software` (`SCR-PUB-018`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Comparison flow | HM-02 (variant) | FSM vs front-office positioning | eager |
| Dashboard preview | FP-04 | Revenue proof side | eager |

## `/customer-technician-experience` (`SCR-PUB-019`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Journey diagram | FP-06 | Primary visual explainer | eager |
| Dispatch context | FP-03 (crop) | Tech lane callout | lazy |

## `/industries/*` (`SCR-PUB-004` child routes)

| Route Group | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| HVAC | ID-01 | Hero visual | eager |
| Plumbing | ID-02 | Hero visual | eager |
| Electrical | ID-03 | Hero visual | eager |
| Drains | ID-04 | Hero visual | eager |
| Roofing | ID-05 | Hero visual | eager |
| Construction | ID-06 | Hero visual | eager |
| Landscaping | ID-07 | Hero visual | eager |
| Multi-location | ID-08 | Hero visual | eager |

## `/trust-safety` + legal routes (`SCR-PUB-005`, `SCR-PUB-010`)

| Section | Asset IDs | Placement Notes | Load Priority |
| --- | --- | --- | --- |
| Trust badges | TR-01, TR-02 | Top trust strip + footer repeats | eager |
| Memphis accents | SH-04/SH-05 | Minimal decorative texture | lazy |

---

## 3) Implementation Notes

- Prefer `picture` with responsive source sets for hero and industry visuals.
- Keep one visual language: do not mix illustration styles between sections.
- Do not overuse shapes; memphis accents should frame, not dominate.
- For conversion pages, reserve top-left text-safe areas in all baked backgrounds.

### Suggested Loading Strategy

- Eager: above-the-fold assets and primary conversion visuals.
- Lazy: testimonials, deep-section support visuals, decorative overlays.

### Naming and Variant Rule

If asset variants are needed, suffix as:
- `-desktop`, `-tablet`, `-mobile`
- `@2x` for high-density fallback

Example:
- `hero-desktop.webp`
- `hero-mobile.webp`
- `hero-desktop@2x.webp`
