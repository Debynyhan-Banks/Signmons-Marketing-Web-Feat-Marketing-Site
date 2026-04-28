import { render, screen } from '@testing-library/react';
import SiteRevenueDashboard from './SiteRevenueDashboard';

describe('SiteRevenueDashboard', () => {
  it('renders SCR-PUB-015 revenue dashboard content and CTA parity', () => {
    render(<SiteRevenueDashboard />);

    expect(screen.getByRole('heading', { level: 1, name: /see exactly/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /operational proof, not vanity charts/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /from inbound demand to completed work/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /quality indicators that protect conversion/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/estimated revenue recovered/i)).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
