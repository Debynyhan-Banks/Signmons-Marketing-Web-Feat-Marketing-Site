import { useEffect } from 'react';
import SiteContact from './pages/site/SiteContact';
import SiteDemo from './pages/site/SiteDemo';
import SiteHome from './pages/site/SiteHome';

const staticTemplateByRoute: Record<string, string> = {
  '/about': 'about.html',
  '/about.html': 'about.html',
  '/blog': 'blog.html',
  '/blog.html': 'blog.html',
  '/login': 'login.html',
  '/login.html': 'login.html',
  '/pricing': 'pricing.html',
  '/pricing.html': 'pricing.html',
  '/privacy': 'privacy.html',
  '/privacy.html': 'privacy.html',
  '/terms': 'terms.html',
  '/terms.html': 'terms.html',
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

  const staticTemplate = staticTemplateByRoute[normalizedPath];
  if (staticTemplate) {
    return <StaticTemplateRedirect template={staticTemplate} />;
  }

  return <SiteHome />;
};

export default App;
