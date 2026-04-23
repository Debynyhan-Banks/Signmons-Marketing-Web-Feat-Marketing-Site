import { useEffect } from 'react';

type UseSiteEffectsOptions = {
  smoothAnchors?: boolean;
};

const useSiteEffects = ({ smoothAnchors = false }: UseSiteEffectsOptions = {}) => {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('.fade-in'));
    let observer: IntersectionObserver | null = null;

    if (targets.length > 0 && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              observer?.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08 },
      );

      targets.forEach((element) => {
        observer?.observe(element);
      });
    }

    const nav = document.querySelector<HTMLElement>('nav');
    const baseBackground = 'rgba(7,8,26,.88)';
    const scrolledBackground = 'rgba(7,8,26,.97)';

    const setNavBackground = () => {
      if (!nav) {
        return;
      }
      nav.style.background = window.scrollY > 40 ? scrolledBackground : baseBackground;
    };

    setNavBackground();
    window.addEventListener('scroll', setNavBackground);

    const anchorHandlers: Array<{ anchor: HTMLAnchorElement; handler: (event: Event) => void }> = [];

    if (smoothAnchors) {
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'));
      anchors.forEach((anchor) => {
        const handler = (event: Event) => {
          const href = anchor.getAttribute('href');
          if (!href || href === '#') {
            return;
          }

          const target = document.querySelector<HTMLElement>(href);
          if (!target) {
            return;
          }

          event.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        };

        anchor.addEventListener('click', handler);
        anchorHandlers.push({ anchor, handler });
      });
    }

    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', setNavBackground);
      anchorHandlers.forEach(({ anchor, handler }) => {
        anchor.removeEventListener('click', handler);
      });
    };
  }, [smoothAnchors]);
};

export default useSiteEffects;
