# UI Standards (Marketing Frontend)

This is the canonical UI contract for this repository.

## Purpose
- Keep visual design consistent across sections and pages.
- Enforce reusable React + MUI component patterns.
- Prevent styling drift from ad-hoc color and typography overrides.

## Source Of Truth
- Tokens: `/Users/debynyhanbanks/Web Projects/signmons-marketing-web-feat-marketing-site/src/design/tokens.ts`
- Theme: `/Users/debynyhanbanks/Web Projects/signmons-marketing-web-feat-marketing-site/src/design/muiTheme.ts`
- Shared UI components: `/Users/debynyhanbanks/Web Projects/signmons-marketing-web-feat-marketing-site/src/components/ui/`
- App theme wiring: `/Users/debynyhanbanks/Web Projects/signmons-marketing-web-feat-marketing-site/src/main.tsx`

## Mandatory Rules
- Use MUI components for layout and typography in reusable UI components.
- Reference colors, effects, spacing, radii, and typography from `tokens.ts` or MUI theme values.
- Do not hardcode hex/RGBA color literals in `src/components/ui/*`.
- Keep section-level primitives reusable (`SectionBlock`, `GlassCard`, `FeatureListCard`).
- Keep motion subtle and purposeful; no readability-blocking animation.

## Enforcement
- Script: `npm run -s ui:check`
- CI gate: `.github/workflows/ci.yml` executes `ui:check` on pull requests and branch pushes.

If `ui:check` fails, PR must not merge until token/theme/component consistency is restored.
