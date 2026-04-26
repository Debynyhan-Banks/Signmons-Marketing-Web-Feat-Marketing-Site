import { fireEvent, render, screen } from '@testing-library/react';
import SitePricing from './SitePricing';

describe('SitePricing', () => {
  it('renders the updated premium pricing ladder', () => {
    render(<SitePricing />);

    expect(screen.getByRole('heading', { level: 1, name: /capture more calls\./i })).toBeInTheDocument();
    expect(screen.getByText('Starter', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Growth', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Pro', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Enterprise', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText(/custom from \$2,500\/mo/i)).toBeInTheDocument();
  });

  it('switches plan pricing when annual billing is toggled', () => {
    render(<SitePricing />);

    const starterCard = screen.getByText('Starter', { selector: '.plan-name' }).closest('.plan-card');
    const toggle = screen.getByRole('button', { name: /toggle annual billing/i });

    expect(starterCard).not.toBeNull();
    expect(starterCard?.querySelector('.plan-price')).toHaveTextContent('$199/mo');

    fireEvent.click(toggle);

    expect(starterCard?.querySelector('.plan-price')).toHaveTextContent('$159/mo');
    expect(starterCard?.querySelector('.plan-original')).toHaveTextContent('$199/mo billed annually');
  });
});
