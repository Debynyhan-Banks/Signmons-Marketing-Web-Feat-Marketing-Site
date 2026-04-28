# FE-008 Acceptance Criteria Checklist

Date: 2026-04-28
Branch: codex/fe-008-live-demo-parity
Ticket: TICKETS/FE-008.md
Screens: SCR-PUB-001, SCR-PUB-006, SCR-PUB-007, SCR-PUB-009

## Acceptance Criteria

- [x] **AC-1: `/demo` calls live backend and returns a status handle.**
  - Implementation: `src/pages/site/SiteDemo.tsx` `startLiveDemo()` POSTs to
    `siteDemoContent.liveFlow.api.submitEndpoint` (`POST /api/marketing/try-demo`)
    and reads `leadId` from the response.
  - Test: `src/pages/site/SiteDemo.test.tsx` -> "starts live demo flow and
    resolves status by leadId".
  - Implementation commit: `34fde74 feat(fe-008): add live demo api flow and cta route parity`.

- [x] **AC-2: Demo handles pending, success, and failure states without dead-ends.**
  - Implementation: `pollDemoStatus()` polls
    `GET /api/marketing/try-demo/:leadId` (with `POST /api/marketing/try-demo/status`
    fallback), normalizes status via `normalizeStatus`, and routes to
    `isSuccessStatus` / `isFailureStatus` branches with explicit copy plus
    a retry path. No silent dead-ends remain.
  - Tests:
    - `SiteDemo.test.tsx` -> "starts live demo flow and resolves status by leadId" (success path)
    - `SiteDemo.test.tsx` -> "shows failure state when backend returns failed status" (failure path)
  - Implementation commit: `2e38ffc feat(fe-008): harden demo states and CTA route parity`.

- [x] **AC-3: CTA routes match `LINK_CTA_MAP.md` and `SCREEN_ROUTE_API_MATRIX.md`.**
  - Implementation: `src/utils/cta.ts` action handlers + page wiring.
  - Test: `src/pages/site/SiteCtaParity.test.tsx`
    - "keeps high-intent home CTAs on live routes" -> `/demo`, `/contact`
    - "keeps pricing CTAs on the contact route" -> `/contact`
    - "keeps contact success live demo link on the demo route" -> `/demo`
  - Implementation commits: `34fde74`, `2e38ffc`.

- [x] **AC-4: Frontend gates pass with evidence.**
  - `npm run -s build`: PASS (335 modules transformed, built in 1.34s) -> `evidence/FE-008/build.txt`
  - `npm run -s lint`: PASS (no findings) -> `evidence/FE-008/lint.txt`
  - `npm test -- --runInBand`: PASS (5 files, 14 tests) -> `evidence/FE-008/test.txt`

## Theme Carry-In (non-AC, on branch)

- `1f2d181 chore(theme): migrate to blue/cyan design token palette`
- `2cea861 fix(theme): remove pink legacy pages and align site glow palette`

These commits realign tokens to the Electric Blue + Midnight Navy palette and remove
legacy pink artifacts. They do not introduce FE-008 logic; included for reviewer context.

## Notes

- All four FE-008 implementation commits were already on the branch before this
  evidence commit; commit history was deliberately not rewritten.
- Test runtime warnings about `src=""` are pre-existing image placeholder noise
  (no functional impact, no failing assertions).
