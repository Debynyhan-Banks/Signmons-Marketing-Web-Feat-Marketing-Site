import { render, screen } from '@testing-library/react';
import SiteContact from './SiteContact';
import SiteDemo from './SiteDemo';
import SiteHome from './SiteHome';
import SitePricing from './SitePricing';

const assertLegalFooterLinks = () => {
  expect(screen.getByRole('link', { name: /^terms$/i })).toHaveAttribute('href', '/terms');
  expect(screen.getByRole('link', { name: /^privacy$/i })).toHaveAttribute('href', '/privacy');
  expect(screen.getByRole('link', { name: /sms terms/i })).toHaveAttribute('href', '/sms-terms');
};

describe('FE-006 legal route/content parity', () => {
  it('keeps legal links reachable in home footer', () => {
    render(<SiteHome />);
    assertLegalFooterLinks();
  });

  it('keeps legal links reachable in demo footer', () => {
    render(<SiteDemo />);
    assertLegalFooterLinks();
  });

  it('keeps legal links reachable in pricing footer', () => {
    render(<SitePricing />);
    assertLegalFooterLinks();
  });

  it('keeps legal links reachable in contact footer', () => {
    render(<SiteContact />);
    assertLegalFooterLinks();
  });
});
