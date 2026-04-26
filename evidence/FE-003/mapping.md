# FE-003 Template Mapping

- `public/site/* nav` -> `src/components/site/SiteNavigation.tsx`
- `public/site/* footer` -> `src/components/site/SiteFooter.tsx`
- `public/site/demo.html` page hero and `public/site/contact.html` page hero -> `src/components/site/SitePageHero.tsx`
- `public/site/shared.js` fade-in/nav/smooth-anchor behaviors -> `src/hooks/useSiteEffects.ts`
- `public/site/signmons.html` body sections -> `src/pages/site/SiteHome.tsx`
- `public/site/demo.html` body sections + chat/video behaviors -> `src/pages/site/SiteDemo.tsx`
- `public/site/contact.html` body sections + submit success behavior -> `src/pages/site/SiteContact.tsx`
