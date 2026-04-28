# FE-012 Acceptance Criteria Checklist

Date: 2026-04-28
Branch: codex/fe-012-dispatch-scheduling
Ticket: TICKETS/FE-012.md
Screen: SCR-PUB-014 — Dispatch and Scheduling
Route: `/dispatch-scheduling` (per `SCREEN_ROUTE_API_MATRIX.md` and `MARKETING_SITEMAP.md`)

## Ticket Objective Coverage

The FE-012 ticket calls out four content pillars: scheduling controls, routing
logic, technician assignment, and customer update flow. All four are present
in the page and asserted by the test.

| Required pillar | Section | Source |
| --- | --- | --- |
| Scheduling controls | `governance.points` (windows respect technician availability, service-area, urgency) + `board.lanes` (preferred window + payment-gate state on every card) | `siteDispatchSchedulingContent` |
| Routing logic | `routing.rules` (emergency / skill / payment-gate examples) | same |
| Technician assignment | `board.lanes[id=lane-assigned]` + `routing.rules[id=route-skill]` + `statusFlow.steps[id=status-assigned]` | same |
| Customer update flow | `statusFlow.steps` (Ready -> Assigned -> On My Way -> Completed; "On My Way" triggers outbound customer update) | same |

## Acceptance Criteria

- [x] **AC-1: Route exists.**
  - `src/App.tsx` resolves `/dispatch-scheduling`, `/dispatch-scheduling.html`,
    and `/site/dispatch-scheduling.html` to `<SiteDispatchScheduling />`.
  - Matches `MARKETING_SITEMAP.md` line `/dispatch-scheduling -> SCR-PUB-014`.

- [x] **AC-2: Page sections aligned to MARKETING_SITEMAP build priority "Sprint 2: High-ticket explanation -> Dispatch & Scheduling".**
  - Hero, Dispatch Board (4 lanes), Routing Logic (3 rules), Scheduling
    Lifecycle (4 steps), Policy Integrity (3 governance points), CTA.
  - Test asserts the three section h2s plus a routing example and a governance
    bullet that proves scheduling-window policy is on the page.

- [x] **AC-3: CTA targets map to LINK_CTA_MAP.**
  - Page CTAs: `Book Revenue Demo -> /contact` (nav + section CTA, both
    instances) and `See Live Demo -> /demo`. Pattern matches the existing
    "Business Rules page" and "Brand Voice page" rows in
    `signmons-governance/LINK_CTA_MAP.md` (which collectively govern the
    `/contact` + `/demo` CTA contract for high-ticket explanation pages).
  - Test asserts every "Book Revenue Demo" link resolves to `/contact` and the
    "See Live Demo" link resolves to `/demo`.

- [x] **AC-4: Frontend gates pass with evidence.**
  - `npm run -s build`: PASS — vite v7.3.1, 343 modules, **built in 1.41s** -> `evidence/FE-012/build.txt`
  - `npm run -s lint`: PASS — clean (zero findings) -> `evidence/FE-012/lint.txt`
  - `npm test -- --runInBand`: PASS — **10 files / 22 tests** -> `evidence/FE-012/test.txt`

## Non-Goals (per ticket)

- [x] No backend dispatch implementation changes (no new endpoints; `SchedulingWindow`, `Appointment`, `DispatchPolicy` are display dependencies only — owned by APP-016 / APP-017).
- [x] No APP screen implementation in this ticket.

## Copy Guardrails (`SAAS_SCOPE_DOD.md` §7)

- [x] No "zero staff required" claim; explicit human escalation path retained.
- [x] No "2-minute setup" or unsupported speed claim.
- [x] No unsupported performance metrics (no "3x bookings", "98% answer rate").
- [x] Dispatch Mode Contract respected — copy frames routing as "rule-based assignment, not freeform AI guessing", consistent with manual / recommended / auto tiering in `DATA_CONTRACTS.md` §"Dispatch Mode Contract".
- [x] Human fallback for urgent / unclear / failed / policy-sensitive cases reaffirmed in `governance.points`.

## Files in this branch (per commit `7d2664d`)

| File | Why |
| --- | --- |
| `src/types/site.ts` | `SiteDispatchSchedulingContent` + supporting interfaces. |
| `src/data/siteContent.ts` | `siteDispatchSchedulingContent` data block. |
| `src/pages/site/SiteDispatchScheduling.tsx` | New page component. |
| `src/pages/site/SiteDispatchScheduling.test.tsx` | Vitest covering all four sections + CTA parity. |
| `src/styles/site/dispatch-scheduling.css` | Page-scoped styles. |
| `src/App.tsx` | Registered `/dispatch-scheduling` route trio. |
| `src/main.tsx` | Imported `dispatch-scheduling.css`. |
| `evidence/FE-012/{build,lint,test,parity-checklist,mapping}` | Gate logs + AC mapping. |
