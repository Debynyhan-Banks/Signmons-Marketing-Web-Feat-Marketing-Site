import { render, screen } from '@testing-library/react';
import SiteRevenueDashboard from './SiteRevenueDashboard';

describe('SiteRevenueDashboard', () => {
  it('renders SCR-PUB-015 revenue dashboard content and CTA parity', () => {
    render(<SiteRevenueDashboard />);

    expect(screen.getByRole('heading', { level: 1, name: /see how signmons/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /five signals that explain conversion/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /from inbound demand to completed work/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /quality indicators that protect conversion/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/sample data — for product preview only/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /what the production dashboard uses/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /what counts as billable/i })).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /get my revenue audit/i })).toHaveAttribute('href', '/contact');
  });
});
