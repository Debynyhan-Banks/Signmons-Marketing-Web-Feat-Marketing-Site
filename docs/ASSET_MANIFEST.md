# Asset Manifest (High-Ticket Marketing Site)

Purpose: single source of truth for image production across hero, sections, and feature pages.

## 1) Global Art Direction (Use For Every Prompt)

- Style: corporate memphis + futuristic SaaS
- Tone: premium, high-trust, conversion-focused, clean
- Palette: deep navy, cyan, electric blue, violet accents, controlled red for risk
- Composition: strong hierarchy, high contrast, scannable shapes, minimal clutter
- Lighting: soft studio + neon edge glow
- Avoid: cartoonish low-detail renders, noisy backgrounds, generic stock look, unreadable tiny UI text

### Global Prompt Prefix

Use this at the start of each generator prompt:

`Premium SaaS marketing illustration in corporate memphis + futuristic visual language, clean geometry, high contrast, navy/cyan/blue palette, conversion-focused composition, modern UI polish, high production quality, no visual clutter.`

### Global Negative Prompt

`low-res, blurry, noisy, watermark, text artifacts, unreadable UI text, distorted hands, extra limbs, messy composition, over-saturated colors, flat generic stock style`

---

## 2) Folder Structure (Repo-Ready)

All files go under:

- `/public/assets/brand/`
- `/public/assets/hero/`
- `/public/assets/sections/`
- `/public/assets/icons/`
- `/public/assets/integrations/`
- `/public/assets/testimonials/`
- `/public/assets/feature-pages/`
- `/public/assets/industries/`
- `/public/assets/shapes/`

---

## 3) Required Assets

### A) Brand Core

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| BR-01 | `/public/assets/brand/logo-dark.svg` | SVG | vector | transparent | Primary Signmons wordmark for dark nav/footer |
| BR-02 | `/public/assets/brand/logo-light.svg` | SVG | vector | transparent | Primary Signmons wordmark for light sections |
| BR-03 | `/public/assets/brand/mark.png` | PNG | `512x512` | transparent | Standalone icon mark for app/favicon |
| BR-04 | `/public/assets/brand/og-home.jpg` | JPG | `1200x630` | baked | Social share card: headline + phone + trust vibe |

Generator brief (BR-04):
- Show a premium homepage preview with phone UI and concise headline.
- Keep text area clear on left for optional overlay in product.

### B) Hero System

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| HR-01 | `/public/assets/hero/hero-desktop.webp` | WEBP | `2400x1400` | baked | Main hero composition for desktop, phone + chips + control panel look |
| HR-02 | `/public/assets/hero/hero-tablet.webp` | WEBP | `1600x1200` | baked | Same concept, less density for tablet |
| HR-03 | `/public/assets/hero/hero-mobile.webp` | WEBP | `1200x1800` | baked | Vertical hero composition for mobile |
| HR-04 | `/public/assets/hero/phone-iso.png` | PNG | `1800x2400` | transparent | Isolated angled phone with dark UI |
| HR-05 | `/public/assets/hero/signmons-cellphone.png` | PNG | `1400x2200` | transparent | Alternate phone render, cleaner silhouette for inline use |
| HR-06 | `/public/assets/hero/glow-cyan-lg.png` | PNG | `1600x1600` | transparent | Soft cyan glow overlay |
| HR-07 | `/public/assets/hero/glow-blue-md.png` | PNG | `1000x1000` | transparent | Medium blue glow overlay |
| HR-08 | `/public/assets/hero/glow-violet-sm.png` | PNG | `600x600` | transparent | Small violet glow accent |

Generator brief (HR-01 to HR-03):
- Show "call -> qualify -> payment -> dispatch" system logic visually.
- Include floating chips and premium UI framing.
- Keep visual focus on phone + system cards, not character faces.

### C) Notification/UI Chip Pack

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| CH-01 | `/public/assets/hero/chip-incoming-call.svg` | SVG | `320x120` | transparent | Incoming call status chip with small waveform |
| CH-02 | `/public/assets/hero/chip-lead-qualified.svg` | SVG | `320x120` | transparent | Lead qualified chip |
| CH-03 | `/public/assets/hero/chip-payment-secured.svg` | SVG | `320x120` | transparent | Payment secured chip |
| CH-04 | `/public/assets/hero/chip-job-dispatched.svg` | SVG | `320x120` | transparent | Job dispatched chip |
| CH-05 | `/public/assets/hero/chip-tech-assigned.svg` | SVG | `320x120` | transparent | Tech assigned chip |
| CH-06 | `/public/assets/hero/chip-client-notified.svg` | SVG | `320x120` | transparent | Client notified chip |
| CH-07 | `/public/assets/hero/chip-follow-up.svg` | SVG | `320x120` | transparent | Follow-up automation chip |
| CH-08 | `/public/assets/hero/chip-emergency-no-heat.svg` | SVG | `320x120` | transparent | Emergency alert chip with red accent |

Generator brief:
- Dark glass cards with subtle glow edges.
- Icons left, concise status text right.

### D) Homepage Section Visuals

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| HM-01 | `/public/assets/sections/pain-revenue-leak.webp` | WEBP | `1600x900` | baked | Revenue leak metaphor (pipe/drain/risk) with controlled red highlight |
| HM-02 | `/public/assets/sections/compare-flow.svg` | SVG | `1600x900` | transparent | Typical flow vs Signmons flow diagram |
| HM-03 | `/public/assets/sections/how-step-icons.svg` | SVG | `1920x320` sprite | transparent | 5 icon strip: answer, qualify, collect, dispatch, notify |
| HM-04 | `/public/assets/sections/proof-metrics-bg.webp` | WEBP | `1600x900` | baked | Subtle data-grid backdrop for KPI cards |
| HM-05 | `/public/assets/sections/final-cta-shield.webp` | WEBP | `1200x900` | transparent preferred | Revenue protection motif for final CTA |

### E) Integrations and Trust

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| IN-01 | `/public/assets/integrations/jobber.svg` | SVG | logo-native | transparent | Monochrome logo variant |
| IN-02 | `/public/assets/integrations/housecall-pro.svg` | SVG | logo-native | transparent | Monochrome logo variant |
| IN-03 | `/public/assets/integrations/servicetitan.svg` | SVG | logo-native | transparent | Monochrome logo variant |
| IN-04 | `/public/assets/integrations/quickbooks.svg` | SVG | logo-native | transparent | Monochrome logo variant |
| IN-05 | `/public/assets/integrations/slack.svg` | SVG | logo-native | transparent | Monochrome logo variant |
| TR-01 | `/public/assets/brand/security-badge.svg` | SVG | `160x60` | transparent | Security trust badge |
| TR-02 | `/public/assets/brand/payment-badge.svg` | SVG | `160x60` | transparent | Payments trust badge |

### F) Testimonials

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| TS-01 | `/public/assets/testimonials/operator-01.webp` | WEBP | `800x800` | baked/neutral | Contractor owner headshot (realistic) |
| TS-02 | `/public/assets/testimonials/operator-02.webp` | WEBP | `800x800` | baked/neutral | Dispatcher headshot (realistic) |
| TS-03 | `/public/assets/testimonials/operator-03.webp` | WEBP | `800x800` | baked/neutral | Technician/owner headshot (realistic) |

### G) Feature Pages

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| FP-01 | `/public/assets/feature-pages/business-rules-graph.svg` | SVG | `1600x1000` | transparent | Rule engine graph with clear branches |
| FP-02 | `/public/assets/feature-pages/brand-voice-mock.webp` | WEBP | `1400x900` | baked | Before/after script control UI |
| FP-03 | `/public/assets/feature-pages/dispatch-board.webp` | WEBP | `1800x1100` | baked | Dispatch lanes with urgency badges |
| FP-04 | `/public/assets/feature-pages/revenue-dashboard.webp` | WEBP | `1800x1100` | baked | KPI + chart dashboard mock |
| FP-05 | `/public/assets/feature-pages/roi-calculator.webp` | WEBP | `1400x900` | baked | ROI slider + net gain output mock |
| FP-06 | `/public/assets/feature-pages/customer-tech-flow.svg` | SVG | `1600x900` | transparent | Customer + tech update flow diagram |

### H) Industry Pages

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| ID-01 | `/public/assets/industries/hvac.webp` | WEBP | `1800x1200` | baked | HVAC-specific call/dispatch scene |
| ID-02 | `/public/assets/industries/plumbing.webp` | WEBP | `1800x1200` | baked | Plumbing urgency and job capture scene |
| ID-03 | `/public/assets/industries/electrical.webp` | WEBP | `1800x1200` | baked | Electrical risk and fast dispatch scene |
| ID-04 | `/public/assets/industries/drains.webp` | WEBP | `1800x1200` | baked | Drain/sewer emergency capture scene |
| ID-05 | `/public/assets/industries/roofing.webp` | WEBP | `1800x1200` | baked | Roofing intake and scheduling scene |
| ID-06 | `/public/assets/industries/construction.webp` | WEBP | `1800x1200` | baked | Construction estimate + dispatch scene |
| ID-07 | `/public/assets/industries/landscaping.webp` | WEBP | `1800x1200` | baked | Landscaping intake and route scene |
| ID-08 | `/public/assets/industries/multi-location.webp` | WEBP | `1800x1200` | baked | Multi-location command center scene |

### I) Memphis Shape Library

| ID | File Path | Format | Size | Background | Image Description |
| --- | --- | --- | --- | --- | --- |
| SH-01 | `/public/assets/shapes/arc-cyan.svg` | SVG | `256x256` | transparent | Clean cyan arc |
| SH-02 | `/public/assets/shapes/arc-violet.svg` | SVG | `256x256` | transparent | Violet arc |
| SH-03 | `/public/assets/shapes/triangle-blue.svg` | SVG | `256x256` | transparent | Geometric accent triangle |
| SH-04 | `/public/assets/shapes/dot-grid.svg` | SVG | `512x512` tile | transparent | Dot grid tile |
| SH-05 | `/public/assets/shapes/circle-cutout.svg` | SVG | `256x256` | transparent | Circle/crescent cutout |

---

## 4) Generator Prompt Templates (Copy/Paste)

### Template A: Full Section Illustration

`[GLOBAL PREFIX]. Create a high-end SaaS section illustration for [SECTION PURPOSE]. Visual focus: [FOCAL OBJECT]. Include subtle memphis geometry and futuristic UI accents. Keep composition scannable with clear negative space for text overlays. Output [WIDTH]x[HEIGHT], [FORMAT], [BACKGROUND RULE].`

### Template B: Isolated Object (Phone/Device)

`[GLOBAL PREFIX]. Create an isolated premium 3D phone render showing a dark-mode service operations UI (call status, payment secured, dispatch confirmed). Clean silhouette, strong edge lighting, realistic perspective. Output [WIDTH]x[HEIGHT], transparent background.`

### Template C: UI Chip

`[GLOBAL PREFIX]. Create a compact dark glass status chip with neon edge glow and icon. Label: "[LABEL]". Minimal, readable, enterprise SaaS style. Output 320x120 SVG with transparent background.`

---

## 5) Export and Performance Requirements

- Hero desktop target: `< 350 KB` WEBP
- Above-the-fold media total: `< 900 KB`
- SVG icons/chips: `< 20 KB` each when possible
- Provide `@2x` variants for key raster assets:
  - `*-desktop@2x.webp`
  - `*-mobile@2x.webp`

---

## 6) Immediate Build Order

1. HR-01, HR-02, HR-03, HR-04, CH-01..CH-08
2. HM-01, HM-02, HM-03, HM-05
3. FP-03, FP-04, FP-05
4. IN-01..IN-05, TS-01..TS-03
5. ID-01..ID-08, SH-01..SH-05

