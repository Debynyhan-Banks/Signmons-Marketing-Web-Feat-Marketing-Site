# Asset Generator Prompts

Purpose: copy/paste prompt bank for every asset in `ASSET_MANIFEST.md`.

Use this default suffix on every prompt:
- `Output: [WIDTH]x[HEIGHT], [FORMAT], [BACKGROUND RULE].`
- `Negative prompt: low-res, blurry, noisy, watermark, text artifacts, unreadable UI text, distorted hands, extra limbs, messy composition, over-saturated colors, flat generic stock style.`

Global prefix to prepend:
- `Premium SaaS marketing illustration in corporate memphis + futuristic visual language, clean geometry, high contrast, navy/cyan/blue palette, conversion-focused composition, modern UI polish, high production quality, no visual clutter.`

---

## A) Brand Core

### BR-01 `/public/assets/brand/logo-dark.svg`
Prompt:
`Create a clean, modern wordmark logo reading “signmons” for dark backgrounds. Minimal geometry, strong legibility at small sizes, no glow effects, no gradients required, professional B2B SaaS look. Vector-first construction.`
Output: vector SVG, transparent background.

### BR-02 `/public/assets/brand/logo-light.svg`
Prompt:
`Create a clean, modern wordmark logo reading “signmons” for light backgrounds. Dark text treatment, strong contrast, minimal geometry, professional B2B SaaS look. Vector-first construction.`
Output: vector SVG, transparent background.

### BR-03 `/public/assets/brand/mark.png`
Prompt:
`Create a standalone icon mark for Signmons that suggests protected revenue flow and intelligence. Simple geometric form, scalable, premium enterprise SaaS style. No text.`
Output: 512x512 PNG, transparent background.

### BR-04 `/public/assets/brand/og-home.jpg`
Prompt:
`Create a social share card for a high-ticket trades SaaS. Show a premium dark UI phone mockup on the right, subtle memphis accents, and clean negative space on the left for headline overlay. Mood: trustworthy, revenue protection, fast response.`
Output: 1200x630 JPG, baked background.

---

## B) Hero System

### HR-01 `/public/assets/hero/hero-desktop.webp`
Prompt:
`Design a premium homepage hero composition for a trades AI front-office system. Show dark control-panel aesthetics: angled smartphone with call/chat/payment/dispatch UI, floating status chips, subtle neon glows, geometric memphis accents. Keep left side composition open for headline and CTAs. Convey: call -> qualify -> payment -> dispatch.`
Output: 2400x1400 WEBP, baked background.

### HR-02 `/public/assets/hero/hero-tablet.webp`
Prompt:
`Create a tablet-optimized variant of the hero composition with reduced density and larger readable focal objects. Keep the same narrative: call captured, payment secured, job dispatched. Maintain premium dark SaaS look.`
Output: 1600x1200 WEBP, baked background.

### HR-03 `/public/assets/hero/hero-mobile.webp`
Prompt:
`Create a mobile-first vertical hero composition. Strong central phone focal point, 2-3 clear floating chips, clean top/bottom spacing for text and CTA overlays. Keep design high-contrast and scannable.`
Output: 1200x1800 WEBP, baked background.

### HR-04 `/public/assets/hero/phone-iso.png`
Prompt:
`Create an isolated 3D smartphone render in perspective with a dark-mode operations UI showing incoming call, qualification, payment secured, and dispatch confirmation. Premium lighting, realistic materials, clean silhouette.`
Output: 1800x2400 PNG, transparent background.

### HR-05 `/public/assets/hero/signmons-cellphone.png`
Prompt:
`Create a clean isolated phone render intended to sit under hero text blocks. Slight angle, readable UI blocks, polished glass and metal finish, subtle neon accent reflections.`
Output: 1400x2200 PNG, transparent background.

### HR-06 `/public/assets/hero/glow-cyan-lg.png`
Prompt:
`Create a soft cyan radial glow bloom for UI overlay use. No hard edges, smooth falloff.`
Output: 1600x1600 PNG, transparent background.

### HR-07 `/public/assets/hero/glow-blue-md.png`
Prompt:
`Create a medium blue radial glow bloom for UI overlay use. Smooth gradient falloff.`
Output: 1000x1000 PNG, transparent background.

### HR-08 `/public/assets/hero/glow-violet-sm.png`
Prompt:
`Create a small violet radial glow accent with smooth transparency for decorative UI layering.`
Output: 600x600 PNG, transparent background.

---

## C) Notification/UI Chip Pack

### CH-01 `/public/assets/hero/chip-incoming-call.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Incoming Call”. Include tiny waveform accent. Rounded corners, neon cyan edge, modern enterprise UI style.`
Output: 320x120 SVG, transparent background.

### CH-02 `/public/assets/hero/chip-lead-qualified.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Lead Qualified”. Rounded corners, subtle glow, clean typography.`
Output: 320x120 SVG, transparent background.

### CH-03 `/public/assets/hero/chip-payment-secured.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Payment Secured”. Emphasize trust and confirmation with green-cyan accent.`
Output: 320x120 SVG, transparent background.

### CH-04 `/public/assets/hero/chip-job-dispatched.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Job Dispatched”. Include motion arrow motif.`
Output: 320x120 SVG, transparent background.

### CH-05 `/public/assets/hero/chip-tech-assigned.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Tech Assigned”. Add check/badge motif.`
Output: 320x120 SVG, transparent background.

### CH-06 `/public/assets/hero/chip-client-notified.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Client Notified”. Message bubble icon, clean neon edge.`
Output: 320x120 SVG, transparent background.

### CH-07 `/public/assets/hero/chip-follow-up.svg`
Prompt:
`Create a dark glass status chip with icon and text: “Follow-up”. Use circular refresh/automation motif.`
Output: 320x120 SVG, transparent background.

### CH-08 `/public/assets/hero/chip-emergency-no-heat.svg`
Prompt:
`Create an emergency alert chip with icon and text: “Emergency: No Heat”. Keep premium style but with controlled red accent for urgency.`
Output: 320x120 SVG, transparent background.

---

## D) Homepage Section Visuals

### HM-01 `/public/assets/sections/pain-revenue-leak.webp`
Prompt:
`Create a dramatic but clean visual metaphor for revenue leak in home services: industrial pipe/drain concept, controlled red highlights for loss, dark navy environment, premium composition.`
Output: 1600x900 WEBP, baked background.

### HM-02 `/public/assets/sections/compare-flow.svg`
Prompt:
`Create a side-by-side flow diagram: left “Typical Flow” (risk path), right “Signmons Flow” (controlled path). Use clear icons and arrows. Left uses restrained red accents, right uses cyan/green success accents.`
Output: 1600x900 SVG, transparent background.

### HM-03 `/public/assets/sections/how-step-icons.svg`
Prompt:
`Create a 5-icon horizontal strip for steps: Answer, Qualify, Collect, Dispatch, Notify. Unified line style, modern, high contrast, subtle neon accents.`
Output: 1920x320 SVG sprite, transparent background.

### HM-04 `/public/assets/sections/proof-metrics-bg.webp`
Prompt:
`Create a subtle futuristic analytics backdrop for metric cards. Grid, light chart motifs, low visual noise, dark navy/cyan palette.`
Output: 1600x900 WEBP, baked background.

### HM-05 `/public/assets/sections/final-cta-shield.webp`
Prompt:
`Create a premium “revenue protection” visual using shield + flow line motifs. Clean composition for final CTA support, subtle glow.`
Output: 1200x900 WEBP, transparent preferred.

---

## E) Integrations and Trust

### IN-01..IN-05 `/public/assets/integrations/*.svg`
Prompt:
`Create monochrome integration logo variants optimized for dark backgrounds. Keep original brand recognizability while reducing visual noise.`
Output: SVG, transparent background.

### TR-01 `/public/assets/brand/security-badge.svg`
Prompt:
`Create a compact trust badge labeled for security/compliance in enterprise SaaS style. Clean icon + short text lockup.`
Output: 160x60 SVG, transparent background.

### TR-02 `/public/assets/brand/payment-badge.svg`
Prompt:
`Create a compact trust badge for secure payments and verified billing in enterprise SaaS style.`
Output: 160x60 SVG, transparent background.

---

## F) Testimonials

### TS-01 `/public/assets/testimonials/operator-01.webp`
Prompt:
`Create a realistic portrait of a trades business owner (friendly, credible, professional), neutral background, web-ready crop.`
Output: 800x800 WEBP.

### TS-02 `/public/assets/testimonials/operator-02.webp`
Prompt:
`Create a realistic portrait of a dispatcher/admin in trades operations, credible and professional, neutral background.`
Output: 800x800 WEBP.

### TS-03 `/public/assets/testimonials/operator-03.webp`
Prompt:
`Create a realistic portrait of a technician/owner operator, trustworthy and practical, neutral background.`
Output: 800x800 WEBP.

---

## G) Feature Pages

### FP-01 `/public/assets/feature-pages/business-rules-graph.svg`
Prompt:
`Create a rules engine graph showing branching logic for emergency, payment gate, routing, and escalation. Clear nodes and connectors, readable labels, premium SaaS style.`
Output: 1600x1000 SVG, transparent background.

### FP-02 `/public/assets/feature-pages/brand-voice-mock.webp`
Prompt:
`Create a product mock illustrating brand voice controls and script examples (before/after style). Dark UI, clean panels, clear hierarchy.`
Output: 1400x900 WEBP, baked background.

### FP-03 `/public/assets/feature-pages/dispatch-board.webp`
Prompt:
`Create a dispatch board UI mock with lanes (new, ready, assigned, escalated), urgency badges, assignee cards, and status chips.`
Output: 1800x1100 WEBP, baked background.

### FP-04 `/public/assets/feature-pages/revenue-dashboard.webp`
Prompt:
`Create a revenue analytics dashboard UI mock with KPI cards, trend chart, conversion funnel, and payment metrics. Premium dark SaaS style.`
Output: 1800x1100 WEBP, baked background.

### FP-05 `/public/assets/feature-pages/roi-calculator.webp`
Prompt:
`Create an ROI calculator UI mock with input sliders, assumptions panel, and large net gain output card.`
Output: 1400x900 WEBP, baked background.

### FP-06 `/public/assets/feature-pages/customer-tech-flow.svg`
Prompt:
`Create a journey diagram showing customer updates and technician notifications across job lifecycle states.`
Output: 1600x900 SVG, transparent background.

---

## H) Industry Pages

### ID-01 `/public/assets/industries/hvac.webp`
Prompt:
`Create an HVAC-focused scene showing urgent call capture and payment-first dispatch flow.`
Output: 1800x1200 WEBP, baked background.

### ID-02 `/public/assets/industries/plumbing.webp`
Prompt:
`Create a plumbing-focused scene showing leak urgency, qualification, and technician dispatch.`
Output: 1800x1200 WEBP, baked background.

### ID-03 `/public/assets/industries/electrical.webp`
Prompt:
`Create an electrical-focused scene highlighting safety urgency, fast triage, and controlled dispatch.`
Output: 1800x1200 WEBP, baked background.

### ID-04 `/public/assets/industries/drains.webp`
Prompt:
`Create a drains/sewer-focused scene with emergency routing and payment gate emphasis.`
Output: 1800x1200 WEBP, baked background.

### ID-05 `/public/assets/industries/roofing.webp`
Prompt:
`Create a roofing-focused intake and scheduling scene with weather urgency context.`
Output: 1800x1200 WEBP, baked background.

### ID-06 `/public/assets/industries/construction.webp`
Prompt:
`Create a construction service intake scene with estimate qualification and scheduled dispatch.`
Output: 1800x1200 WEBP, baked background.

### ID-07 `/public/assets/industries/landscaping.webp`
Prompt:
`Create a landscaping intake scene with recurring service routing and customer updates.`
Output: 1800x1200 WEBP, baked background.

### ID-08 `/public/assets/industries/multi-location.webp`
Prompt:
`Create a multi-location command view showing centralized intake and distributed dispatch control.`
Output: 1800x1200 WEBP, baked background.

---

## I) Memphis Shape Library

### SH-01 `/public/assets/shapes/arc-cyan.svg`
Prompt:
`Create a clean cyan arc shape accent with smooth vector edges and balanced thickness.`
Output: 256x256 SVG, transparent background.

### SH-02 `/public/assets/shapes/arc-violet.svg`
Prompt:
`Create a clean violet arc shape accent matching SH-01 style.`
Output: 256x256 SVG, transparent background.

### SH-03 `/public/assets/shapes/triangle-blue.svg`
Prompt:
`Create a geometric blue triangle accent with subtle rounding and modern vector proportions.`
Output: 256x256 SVG, transparent background.

### SH-04 `/public/assets/shapes/dot-grid.svg`
Prompt:
`Create a repeating dot-grid tile for subtle UI texture.`
Output: 512x512 SVG tile, transparent background.

### SH-05 `/public/assets/shapes/circle-cutout.svg`
Prompt:
`Create a circle/crescent cutout accent shape for memphis-style corner decoration.`
Output: 256x256 SVG, transparent background.

---

## Optional Prompt Controls (if generator supports)

- CFG/Guidance: medium-high (`6-8`) for composition consistency
- Stylization: medium (`35-55`) to avoid over-artistic noise
- Seed: keep fixed per asset family for visual consistency
