# P0 Asset Status

Generated: 2026-05-12

## Scope
P0 assets from `docs/ASSET_MANIFEST.md`:
- BR-01, BR-02, BR-04
- HR-01, HR-02, HR-03, HR-04
- CH-01..CH-08
- HM-01, HM-02, HM-03
- IN-01..IN-05

## Status (`./scripts/check-p0-assets.sh`)

| ID | Required File | Status |
|---|---|---|
| BR-01 | `/public/assets/brand/logo-dark.svg` | present (placeholder fallback: `.png`) |
| BR-02 | `/public/assets/brand/logo-light.svg` | present (placeholder fallback: `.png`) |
| BR-04 | `/public/assets/brand/og-home.jpg` | present (placeholder fallback: `.png`) |
| HR-01 | `/public/assets/hero/hero-desktop.webp` | present (placeholder fallback: `.png`) |
| HR-02 | `/public/assets/hero/hero-tablet.webp` | present (placeholder fallback: `.png`) |
| HR-03 | `/public/assets/hero/hero-mobile.webp` | present (placeholder fallback: `.png`) |
| HR-04 | `/public/assets/hero/phone-iso.png` | present |
| CH-01 | `/public/assets/hero/chip-incoming-call.svg` | present |
| CH-02 | `/public/assets/hero/chip-lead-qualified.svg` | present |
| CH-03 | `/public/assets/hero/chip-payment-secured.svg` | present |
| CH-04 | `/public/assets/hero/chip-job-dispatched.svg` | present |
| CH-05 | `/public/assets/hero/chip-tech-assigned.svg` | present |
| CH-06 | `/public/assets/hero/chip-client-notified.svg` | present |
| CH-07 | `/public/assets/hero/chip-follow-up.svg` | present |
| CH-08 | `/public/assets/hero/chip-emergency-no-heat.svg` | present |
| HM-01 | `/public/assets/sections/pain-revenue-leak.webp` | present (placeholder fallback: `.png/.svg`) |
| HM-02 | `/public/assets/sections/compare-flow.svg` | present |
| HM-03 | `/public/assets/sections/how-step-icons.svg` | present |
| IN-01 | `/public/assets/integrations/jobber.svg` | present |
| IN-02 | `/public/assets/integrations/housecall-pro.svg` | present |
| IN-03 | `/public/assets/integrations/servicetitan.svg` | present |
| IN-04 | `/public/assets/integrations/quickbooks.svg` | present |
| IN-05 | `/public/assets/integrations/slack.svg` | present |

## Already Present (non-P0-required)

- `/public/assets/hero/signmons-cellphone.png`
- `/public/assets/hero/signmons.png`

## Notes

- Placeholder phase is complete and gate passes.
- Final production phase should replace fallback `.png/.svg` files with target `.webp/.jpg/.svg` outputs from `docs/ASSET_GENERATOR_PROMPTS.md`.

## Next Actions

1. Replace hero placeholders (`HR-01..HR-03`) with final rendered compositions.
2. Replace `HM-01` placeholder with final high-detail leak visual.
3. Keep running `./scripts/check-p0-assets.sh` after each replacement batch.
