import { render, screen } from '@testing-library/react';
import SiteDispatchScheduling from './SiteDispatchScheduling';

describe('SiteDispatchScheduling', () => {
  it('renders SCR-PUB-014 dispatch and scheduling content with CTA parity', () => {
    render(<SiteDispatchScheduling />);

    expect(screen.getByRole('heading', { level: 1, name: /route work/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /one queue across new, ready, assigned, and escalated work/i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /rule-based assignment, not freeform ai guessing/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /structured status updates for owners, techs, and customers/i }),
    ).toBeInTheDocument();

    expect(screen.getByText(/emergency hvac no-heat call after hours/i)).toBeInTheDocument();
    expect(screen.getByText(/scheduling windows respect technician availability/i)).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
