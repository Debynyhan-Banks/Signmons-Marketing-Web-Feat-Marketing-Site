import { fireEvent, render, screen, within } from '@testing-library/react';
import SitePricing from './SitePricing';

describe('SitePricing', () => {
  it('renders the revised premium pricing ladder and add-on naming', () => {
    render(<SitePricing />);

    expect(screen.getByRole('heading', { level: 1, name: /capture more calls\./i })).toBeInTheDocument();
    expect(screen.getByText('Starter', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Growth', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Pro', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Enterprise', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText(/custom from \$2,500\/mo/i)).toBeInTheDocument();

    expect(screen.getByText(/advanced after-hours emergency escalation/i)).toBeInTheDocument();
    expect(screen.getAllByText(/advanced missed-call recovery campaigns/i).length).toBeGreaterThan(0);
    expect(screen.queryByText(/unlimited calls/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/no per-call fees/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/^missed-call sms recovery$/i)).not.toBeInTheDocument();
  });

  it('enforces Starter payment handoff boundary and Growth upgrade features', () => {
    render(<SitePricing />);

    const starterCard = screen.getByText('Starter', { selector: '.plan-name' }).closest('.plan-card');
    const growthCard = screen.getByText('Growth', { selector: '.plan-name' }).closest('.plan-card');

    expect(starterCard).not.toBeNull();
    expect(growthCard).not.toBeNull();

    const starter = within(starterCard as HTMLElement);
    const growth = within(growthCard as HTMLElement);

    expect(starter.getByText(/payment link handoff/i)).toBeInTheDocument();
    expect(starter.queryByText(/deposit collection and service-fee preauthorization/i)).not.toBeInTheDocument();

    expect(growth.getByText(/after-hours call capture and emergency escalation/i)).toBeInTheDocument();
    expect(growth.getByText(/emergency, high-priority, and standard call classification/i)).toBeInTheDocument();
    expect(growth.getByText(/multi-tech routing for up to 5 active vehicles/i)).toBeInTheDocument();
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
