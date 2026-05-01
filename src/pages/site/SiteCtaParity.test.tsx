import { render, screen } from '@testing-library/react';
import SiteContact from './SiteContact';
import SiteHome from './SiteHome';
import SitePricing from './SitePricing';

describe('FE-008 CTA route parity', () => {
  it('keeps high-intent home CTAs on live routes', () => {
    render(<SiteHome />);

    expect(screen.getByRole('link', { name: /watch a real call/i })).toHaveAttribute('href', '/demo');
    expect(screen.getByRole('link', { name: /see how much revenue you're losing/i })).toHaveAttribute('href', '/contact');
    expect(
      screen
        .getAllByRole('link', { name: /get your revenue breakdown/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
  });

  it('keeps pricing conversion CTAs on contact route', () => {
    render(<SitePricing />);

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: /build my ai dispatcher/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(
      screen
        .getAllByRole('link', { name: /talk to sales/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
  });

  it('keeps contact success and footer demo links on demo route', async () => {
    render(<SiteContact />);

    const demoLinks = screen.getAllByRole('link', { name: /demo/i });
    expect(demoLinks.some((link) => link.getAttribute('href') === '/demo')).toBe(true);
  });
});
