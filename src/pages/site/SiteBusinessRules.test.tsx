import { render, screen } from '@testing-library/react';
import SiteBusinessRules from './SiteBusinessRules';

describe('SiteBusinessRules', () => {
  it('renders SCR-PUB-012 business rules content and CTAs', () => {
    render(<SiteBusinessRules />);

    expect(screen.getByRole('heading', { level: 1, name: /your rules/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /configure logic across the entire booking flow/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /how rules execute in practice/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /built for auditable operations/i })).toBeInTheDocument();

    expect(screen.getByText(/classify requests into category and urgency tiers/i)).toBeInTheDocument();
    expect(screen.getByText(/all rule changes are tenant-scoped and versioned/i)).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
