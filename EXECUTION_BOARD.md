# Signmons Marketing Execution Board

Canonical governance source: `/Users/debynyhanbanks/Web Projects/signmons-governance`.
Global pointer: `/Users/debynyhanbanks/Web Projects/signmons-governance/GLOBAL_EXECUTION_POINTER.md`.

## Rules

1. Execute only the ticket listed in `Now`.
2. If global pointer is owned by another repo, this board remains standby.
3. One focused commit per ticket.
4. Required frontend gates for active ticket:
   - `npm run -s build`
   - `npm run -s lint`
   - `npm test -- --runInBand`

## Now

- Standby: blocked by global `Now` ticket `APP-006` (backend owner).

## Next

- FE-006 Demo route wired to live backend flow (`SCR-PUB-007`)
- FE-007 Contact capture (email-min) to backend storage endpoint (`SCR-PUB-009`)
- FE-008 Route and CTA parity hardening (`SCR-PUB-001`, `SCR-PUB-006`, `SCR-PUB-007`, `SCR-PUB-009`)

## Done

- FE-001 through FE-005 shipped on prior branches/PRs.
