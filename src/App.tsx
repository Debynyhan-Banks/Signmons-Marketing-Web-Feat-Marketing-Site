import { useEffect } from 'react';
import SiteBrandVoice from './pages/site/SiteBrandVoice';
import SiteContact from './pages/site/SiteContact';
import SiteBusinessRules from './pages/site/SiteBusinessRules';
import SiteDemo from './pages/site/SiteDemo';
import SiteDispatchScheduling from './pages/site/SiteDispatchScheduling';
import SiteDoneForYouSetup from './pages/site/SiteDoneForYouSetup';
import SiteHome from './pages/site/SiteHome';
import SitePricing from './pages/site/SitePricing';

const staticTemplateByRoute: Record<string, string> = {
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/blog': 'blog.html',
  '/blog.html': 'blog.html',
  '/login': 'login.html',
  '/login.html': 'login.html',
  '/privacy': 'privacy.html',
  '/privacy.html': 'privacy.html',
  '/terms': 'terms.html',
  '/terms.html': 'terms.html',
  '/sms-terms': 'sms-terms.html',
  '/sms-terms.html': 'sms-terms.html',
};

const normalizePath = (path: string) => {
  if (path.endsWith('/') && path.length > 1) {
    return path.slice(0, -1);
  }
  return path;
};

const StaticTemplateRedirect = ({ template }: { template: string }) => {
  useEffect(() => {
    const targetPath = `/site/${template}`;
    const { pathname, search, hash } = window.location;
    if (pathname === targetPath) {
      return;
    }
    window.location.replace(`${targetPath}${search}${hash}`);
  }, [template]);

  return null;
};

const App = () => {
  const normalizedPath = normalizePath(window.location.pathname);

  if (normalizedPath === '/' || normalizedPath === '/signmons' || normalizedPath === '/signmons.html' || normalizedPath === '/site/signmons.html') {
    return <SiteHome />;
  }

  if (normalizedPath === '/demo' || normalizedPath === '/demo.html' || normalizedPath === '/site/demo.html') {
    return <SiteDemo />;
  }

  if (normalizedPath === '/contact' || normalizedPath === '/contact.html' || normalizedPath === '/site/contact.html') {
    return <SiteContact />;
  }

  if (normalizedPath === '/pricing' || normalizedPath === '/pricing.html' || normalizedPath === '/site/pricing.html') {
    return <SitePricing />;
  }

  if (normalizedPath === '/business-rules' || normalizedPath === '/business-rules.html' || normalizedPath === '/site/business-rules.html') {
    return <SiteBusinessRules />;
  }

  if (
    normalizedPath === '/done-for-you-setup' ||
    normalizedPath === '/done-for-you-setup.html' ||
    normalizedPath === '/site/done-for-you-setup.html'
  ) {
    return <SiteDoneForYouSetup />;
  }

  if (
    normalizedPath === '/brand-voice' ||
    normalizedPath === '/brand-voice.html' ||
    normalizedPath === '/site/brand-voice.html'
  ) {
    return <SiteBrandVoice />;
  }

  if (
    normalizedPath === '/dispatch-scheduling' ||
    normalizedPath === '/dispatch-scheduling.html' ||
    normalizedPath === '/site/dispatch-scheduling.html'
  ) {
    return <SiteDispatchScheduling />;
  }

  const staticTemplate = staticTemplateByRoute[normalizedPath];
  if (staticTemplate) {
    return <StaticTemplateRedirect template={staticTemplate} />;
  }

  return <SiteHome />;
};

export default App;
