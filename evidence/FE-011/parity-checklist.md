# FE-011 Acceptance Criteria Checklist

Date: 2026-04-28
Branch: codex/fe-011-brand-voice
Ticket: TICKETS/FE-011.md
Screen: SCR-PUB-013 — Brand Voice and AI Personality
Route: `/brand-voice` (per `SCREEN_ROUTE_API_MATRIX.md`)

## Acceptance Criteria

- [x] **AC-1: Route exists and is linked from public flow.**
  - Route registration: `src/App.tsx` resolves `/brand-voice`, `/brand-voice.html`,
    and `/site/brand-voice.html` to `<SiteBrandVoice />`.
  - Public-flow linkage: page CTAs route back into the canonical conversion paths
    `Book Revenue Demo -> /contact` and `See Live Demo -> /demo`, mirroring the
    FE-009/FE-010 contract pattern.
  - Test: `SiteBrandVoice.test.tsx` asserts every "Book Revenue Demo" link
    resolves to `/contact` and the "See Live Demo" link resolves to `/demo`.

- [x] **AC-2: Content explains greeting, tone, prohibited phrases, fee language, escalation language, and closeout messaging controls.**
  - All six controls are rendered as `<h3>` cards inside the
    `brand-voice-controls` section with description + concrete example.
  - Test asserts `<h3>` headings for each of: Greeting, Tone, Prohibited Phrases,
    Fee Language, Escalation Language, Closeout Messaging.

- [x] **AC-3: Copy includes human fallback for urgent/unclear cases.**
  - `humanFallback` section explicitly states "Voice is persuasive intake, not
    the final authority." (matches `SAAS_SCOPE_DOD.md` §4 product rule).
  - Trigger list covers urgent, unclear, policy-sensitive, failed, and VIP paths
    (all five fallback categories from §4 product rules).
  - Test asserts the persuasive-intake line and the urgent + unclear trigger
    copy are present.

- [x] **AC-4: Frontend gates pass with evidence.**
  - `npm run -s build`: PASS — 341 modules, built in 1.41s -> `evidence/FE-011/build.txt`
  - `npm run -s lint`: PASS — clean (no findings) -> `evidence/FE-011/lint.txt`
  - `npm test -- --runInBand`: PASS — 9 files / 21 tests -> `evidence/FE-011/test.txt`

## Copy Guardrails (`SAAS_SCOPE_DOD.md` §7)

- [x] No "zero staff required" claim.
- [x] No "2-minute setup" or full-workflow speed claim.
- [x] No unsupported performance metrics (no "3x bookings", no "98% answer rate").
- [x] Tenant brand voice copy stays scoped to the six controls listed in §4 product rules.
- [x] SMS confirmation note retained in governance section (canonical channel rule).

## Files Touched

| File | Why |
| --- | --- |
| `src/types/site.ts` | Added `SiteBrandVoiceContent`, `SiteBrandVoiceControl`, `SiteBrandVoiceFallbackTrigger` types. |
| `src/data/siteContent.ts` | Added `siteBrandVoiceContent` data block (hero, six controls, human fallback, governance, CTA, footer). |
| `src/pages/site/SiteBrandVoice.tsx` | New page component for `/brand-voice`. |
| `src/pages/site/SiteBrandVoice.test.tsx` | Vitest covering AC-1..AC-3 markers. |
| `src/styles/site/brand-voice.css` | Page-scoped styles (mirrors business-rules pattern). |
| `src/App.tsx` | Registered `/brand-voice` (+ `.html` + `/site/...html`) route. |
| `src/main.tsx` | Imported `brand-voice.css`. |
| `evidence/FE-011/{build,lint,test,parity-checklist,mapping}` | Gate logs + AC mapping. |
