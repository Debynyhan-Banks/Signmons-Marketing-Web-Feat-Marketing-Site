import { render, screen } from '@testing-library/react';
import SiteHome from './SiteHome';

describe('SiteHome', () => {
  it('renders core hero and conversion sections', () => {
    render(<SiteHome />);

    expect(screen.getByRole('heading', { level: 1, name: /get paid before you/i })).toBeInTheDocument();
    expect(screen.getByText(/experience the demo/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /everything your business/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /simple\. flat\. no surprises\./i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /your competition is still/i })).toBeInTheDocument();
  });
});
