# FE-003 Parity QA Checklist

Date: 2026-04-22
Branch: codex/fe-003-reusable-components
Preview: http://127.0.0.1:4174

## Desktop (1440x900)
- [x] `/` renders with expected hero/canvas treatment and CTA visible.
- [x] `/demo` renders nav, hero, demo frame, chat panel, and footer.
- [x] `/contact` renders nav, contact options grid, form fields, and footer.
- [x] No missing assets or obvious layout breakage observed in captured screens.

Artifacts:
- `evidence/FE-003/screens/home-desktop.png`
- `evidence/FE-003/screens/demo-desktop.png`
- `evidence/FE-003/screens/contact-desktop.png`

## Mobile (390x844 viewport)
- [x] `/` keeps core hero content and CTA visible in a single-column flow.
- [x] `/demo` stacks content vertically and keeps cards/chat legible.
- [x] `/contact` stacks cards/form controls and keeps CTA visible.
- [x] Footer links remain reachable on mobile pages.

Artifacts:
- `evidence/FE-003/screens/home-mobile.png`
- `evidence/FE-003/screens/demo-mobile.png`
- `evidence/FE-003/screens/contact-mobile.png`

## Notes
- Mobile captures were generated with Chromium viewport emulation (`390x844`) rather than WebKit device preset because WebKit runtime is not installed in this environment.
