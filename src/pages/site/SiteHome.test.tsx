import { render, screen } from '@testing-library/react';
import SiteHome from './SiteHome';

describe('SiteHome', () => {
  it('renders core hero and conversion sections', () => {
    render(<SiteHome />);

    expect(screen.getByRole('heading', { level: 1, name: /stop sending trucks tounpaid jobs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see how much revenue you're losing/i })).toHaveAttribute('href', '/contact');
    expect(screen.getByRole('link', { name: /watch a real call/i })).toHaveAttribute('href', '/demo');
    expect(screen.getByRole('heading', { level: 2, name: /you're not short on calls/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /from incoming call to paid job in seconds/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /what happens when you control the call/i })).toBeInTheDocument();
  });
});
