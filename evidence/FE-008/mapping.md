# FE-008 Contract Mapping

Source contracts: `signmons-governance/LINK_CTA_MAP.md`,
`signmons-governance/SCREEN_ROUTE_API_MATRIX.md`.

## CTA Routes -> Implementation -> Test

| LINK_CTA_MAP Location | Route/Action | Implementation | Test Assertion |
| --- | --- | --- | --- |
| Header nav -> Demo | `/demo` | `src/components/site/SiteNavigation.tsx` + `src/utils/cta.ts` | `SiteCtaParity.test.tsx` ("keeps high-intent home CTAs on live routes") |
| Home hero -> Experience the Demo | `/demo` | `src/pages/site/SiteHome.tsx` -> `src/utils/cta.ts` | `SiteCtaParity.test.tsx` ("keeps high-intent home CTAs on live routes") |
| Pricing plans -> Book Revenue Demo / Build My AI Dispatcher / Talk to Sales | `/contact` | `src/pages/site/SitePricing.tsx` -> `src/utils/cta.ts` | `SiteCtaParity.test.tsx` ("keeps pricing CTAs on the contact route") |
| Contact success -> Live Demo | `/demo` | `src/pages/site/SiteContact.tsx` | `SiteCtaParity.test.tsx` ("keeps contact success live demo link on the demo route") |
| Footer nav -> Demo | `/demo` | `src/components/site/SiteFooter.tsx` | covered by header/home parity assertion (same href contract) |

## Backend Endpoints -> Frontend Call Site

| SCREEN_ROUTE_API_MATRIX Endpoint | Frontend Call | Source |
| --- | --- | --- |
| `POST /api/marketing/try-demo` | `startLiveDemo()` | `src/pages/site/SiteDemo.tsx` |
| `GET /api/marketing/try-demo/:leadId` | `pollDemoStatus()` (primary) | `src/pages/site/SiteDemo.tsx` |
| `POST /api/marketing/try-demo/status` | `pollDemoStatus()` (fallback) | `src/pages/site/SiteDemo.tsx` |
| `POST /api/marketing/lead-capture` | contact form submit (FE-007 carry-in) | `src/pages/site/SiteContact.tsx` |

## Screen ID -> Route -> Source

| Screen ID | Route | Page Component |
| --- | --- | --- |
| SCR-PUB-001 | `/` | `src/pages/site/SiteHome.tsx` |
| SCR-PUB-006 | `/pricing` | `src/pages/site/SitePricing.tsx` |
| SCR-PUB-007 | `/demo` | `src/pages/site/SiteDemo.tsx` |
| SCR-PUB-009 | `/contact` | `src/pages/site/SiteContact.tsx` |
