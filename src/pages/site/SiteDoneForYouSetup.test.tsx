import { render, screen } from '@testing-library/react';
import SiteDoneForYouSetup from './SiteDoneForYouSetup';

describe('SiteDoneForYouSetup', () => {
  it('renders SCR-PUB-011 done-for-you setup messaging and actions', () => {
    render(<SiteDoneForYouSetup />);

    expect(screen.getByRole('heading', { level: 1, name: /we configure signmons/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /high-ticket setup, not a diy wizard/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /go live in controlled phases/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /what you receive/i })).toBeInTheDocument();

    expect(screen.getByText(/tenant business-rules profile/i)).toBeInTheDocument();
    expect(screen.getByText(/brand voice policy with approved call scripts/i)).toBeInTheDocument();

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
