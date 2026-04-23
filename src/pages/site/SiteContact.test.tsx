import { fireEvent, render, screen } from '@testing-library/react';
import SiteContact from './SiteContact';

describe('SiteContact', () => {
  it('shows success state after application submit', () => {
    render(<SiteContact />);

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    expect(screen.getByRole('heading', { level: 3, name: /you're on the list!/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', '/demo');
  });
});
