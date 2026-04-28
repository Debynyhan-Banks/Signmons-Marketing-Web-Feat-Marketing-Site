# FE-012 Contract Mapping

Source contracts: `signmons-governance/SCREEN_ROUTE_API_MATRIX.md`,
`signmons-governance/SCREEN_INVENTORY.md`, `signmons-governance/MARKETING_SITEMAP.md`,
`signmons-governance/DATA_CONTRACTS.md`.

## Screen ID -> Route -> Source

| Screen ID | Route | Page Component |
| --- | --- | --- |
| SCR-PUB-014 | `/dispatch-scheduling` | `src/pages/site/SiteDispatchScheduling.tsx` |

## Ticket pillar -> Content key -> Test assertion

| Required pillar (TICKETS/FE-012.md) | Content key | Test assertion |
| --- | --- | --- |
| Scheduling controls | `board.lanes` + `governance.points` (windows respect availability, service-area, urgency) | `getByRole h2 "one queue across new, ready, assigned, and escalated work"` + `getByText "scheduling windows respect technician availability"` |
| Routing logic | `routing.rules` | `getByRole h2 "rule-based assignment, not freeform AI guessing"` + `getByText "emergency hvac no-heat call after hours"` |
| Technician assignment | `board.lanes[lane-assigned]` + `statusFlow.steps[status-assigned]` + `routing.rules[route-skill]` | covered by board h2 + status-flow h2 assertions |
| Customer update flow | `statusFlow.steps` ("On My Way" outbound update + "Completed" telemetry) | `getByRole h2 "structured status updates for owners, techs, and customers"` |

## Data contract dependency (display-only, no backend call)

| `DATA_CONTRACTS.md` entity | How it appears | Owning runtime ticket |
| --- | --- | --- |
| `SchedulingWindow` | Governance point about windows respecting availability + buffer | APP-016 |
| `Appointment` | `statusFlow.steps` lifecycle (Ready -> Assigned -> On My Way -> Completed) | APP-016 |
| `DispatchPolicy` | `routing.rules` (service-area, skill, after-hours, payment-gate) | APP-017 |
| Dispatch Mode Contract (manual / recommended / auto) | "Rule-based assignment, not freeform AI guessing" framing | APP-017 |

FE-012 does not introduce any new backend calls; the marketing page is a
display surface aligned to these contracts so future APP-016 / APP-017 work has
a public-facing reference.

## CTA Routes (mirrors LINK_CTA_MAP "Business Rules page" / "Brand Voice page" rows)

| CTA | Route | Verified by |
| --- | --- | --- |
| Nav: Book Revenue Demo | `/contact` | `SiteDispatchScheduling.test.tsx` (`getAllByRole link "book revenue demo"`) |
| Section CTA: Book Revenue Demo | `/contact` | same |
| Section CTA: See Live Demo | `/demo` | `SiteDispatchScheduling.test.tsx` (`getByRole link "see live demo"`) |
