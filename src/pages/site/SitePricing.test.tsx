import { fireEvent, render, screen, within } from '@testing-library/react';
import SitePricing from './SitePricing';

describe('SitePricing', () => {
  it('renders the fixed-subscription pricing ladder and commercial terms', () => {
    render(<SitePricing />);

    expect(screen.getByRole('heading', { level: 1, name: /capture more calls\./i })).toBeInTheDocument();
    expect(screen.getByText('Starter', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Growth', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Pro', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText('Enterprise', { selector: '.plan-name' })).toBeInTheDocument();
    expect(screen.getByText(/custom fixed subscription/i)).toBeInTheDocument();

    expect(screen.getByRole('heading', { level: 2, name: /founding partner program/i })).toBeInTheDocument();
    expect(screen.getByText(/first 10 approved external businesses/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /one predictable subscription/i })).toBeInTheDocument();
    expect(screen.getByText(/no setup, per-call overage, booked-job, emergency-capture, revenue-share/i)).toBeInTheDocument();
    expect(screen.getByText(/normal Twilio and AI usage is included/i)).toBeInTheDocument();
    expect(screen.getAllByText(/without a basic Signmons per-invoice fee/i).length).toBeGreaterThan(0);

    expect(screen.queryByText(/unlimited calls/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/performance fees/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/custom from \$3,500\/mo/i)).not.toBeInTheDocument();
  });

  it('enforces Starter payment handoff boundary and Growth upgrade features', () => {
    render(<SitePricing />);

    const starterCard = screen.getByText('Starter', { selector: '.plan-name' }).closest('.plan-card');
    const growthCard = screen.getByText('Growth', { selector: '.plan-name' }).closest('.plan-card');

    expect(starterCard).not.toBeNull();
    expect(growthCard).not.toBeNull();

    const starter = within(starterCard as HTMLElement);
    const growth = within(growthCard as HTMLElement);

    expect(starter.getByText(/applicable Stripe booking-payment workflow/i)).toBeInTheDocument();
    expect(starter.getByText(/missed-call text-back/i)).toBeInTheDocument();
    expect(starter.getByText(/planned Signmons Money: branded estimates/i)).toBeInTheDocument();
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
    expect(starterCard?.querySelector('.plan-price')).toHaveTextContent('$299/mo');

    fireEvent.click(toggle);

    expect(starterCard?.querySelector('.plan-price')).toHaveTextContent('$249/mo');
    expect(starterCard?.querySelector('.plan-original')).toHaveTextContent('$299/mo month-to-month');
  });
});
