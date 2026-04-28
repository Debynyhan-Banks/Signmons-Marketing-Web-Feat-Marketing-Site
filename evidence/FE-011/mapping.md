# FE-011 Contract Mapping

Source contracts: `signmons-governance/SCREEN_ROUTE_API_MATRIX.md`,
`signmons-governance/SCREEN_INVENTORY.md`, `signmons-governance/SAAS_SCOPE_DOD.md`.

## Screen ID -> Route -> Source

| Screen ID | Route | Page Component |
| --- | --- | --- |
| SCR-PUB-013 | `/brand-voice` | `src/pages/site/SiteBrandVoice.tsx` |

## Tenant Brand Voice Control (SAAS_SCOPE_DOD §4) -> Content -> Test

| Control (governance §4) | Content key | Test assertion |
| --- | --- | --- |
| Greeting | `controls.items[id=control-greeting]` | `<h3>Greeting</h3>` |
| Tone | `controls.items[id=control-tone]` | `<h3>Tone</h3>` |
| Prohibited phrases | `controls.items[id=control-prohibited]` | `<h3>Prohibited Phrases</h3>` |
| Fee language | `controls.items[id=control-fee]` | `<h3>Fee Language</h3>` |
| Escalation language | `controls.items[id=control-escalation]` | `<h3>Escalation Language</h3>` |
| Closeout messaging | `controls.items[id=control-closeout]` | `<h3>Closeout Messaging</h3>` |

## Human Fallback (SAAS_SCOPE_DOD §4) -> Trigger -> Source

| Fallback category (governance §4) | Trigger id | Source |
| --- | --- | --- |
| Urgent | `fallback-urgent` | `siteBrandVoiceContent.humanFallback.triggers` |
| Unclear | `fallback-unclear` | same |
| Policy-sensitive | `fallback-policy` | same |
| Failed | `fallback-failed` | same |
| (extension) VIP / dispute | `fallback-vip` | same |

## CTA Routes (mirrors LINK_CTA_MAP "Business Rules page" row)

| CTA | Route | Verified by |
| --- | --- | --- |
| Nav: Book Revenue Demo | `/contact` | `SiteBrandVoice.test.tsx` (`getAllByRole link "book revenue demo"`) |
| Section CTA: Book Revenue Demo | `/contact` | same |
| Section CTA: See Live Demo | `/demo` | `SiteBrandVoice.test.tsx` (`getByRole link "see live demo"`) |

## Backend / Contract Dependency

- `TenantBrandProfile` (per matrix) — display dependency only; FE-011 introduces
  no new backend call. APP-018 will own the runtime contract for tenant brand
  voice profile management.
