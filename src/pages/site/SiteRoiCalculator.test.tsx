import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SiteRoiCalculator from './SiteRoiCalculator';

describe('SiteRoiCalculator', () => {
  it('renders SCR-PUB-016 with governed plan costs and updates the estimate', async () => {
    const user = userEvent.setup();
    render(<SiteRoiCalculator />);

    expect(screen.getByRole('heading', { level: 1, name: /estimate your/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /use your current operating numbers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /projected monthly impact/i })).toBeInTheDocument();

    const totalCard = screen.getByText(/net revenue opportunity/i).closest('article');
    expect(totalCard).toBeInTheDocument();
    const initialValue = totalCard?.querySelector('.roi-result-value')?.textContent ?? '';

    const missedCallsField = screen.getByLabelText(/missed calls per week/i);
    await user.clear(missedCallsField);
    await user.type(missedCallsField, '40');

    const updatedValue = totalCard?.querySelector('.roi-result-value')?.textContent ?? '';
    expect(updatedValue).not.toEqual(initialValue);

    expect(screen.getByText(/planning estimate only/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /what your subscription includes/i })).toBeInTheDocument();

    const costCard = screen.getByText(/estimated monthly plan cost/i).closest('article');
    expect(costCard).toHaveTextContent('$799');

    const monthlyCallsField = screen.getByLabelText(/expected AI-handled calls per month/i);
    await user.clear(monthlyCallsField);
    await user.type(monthlyCallsField, '900');

    expect(costCard).toHaveTextContent('$799');
    expect(costCard).toHaveTextContent(/400 calls above plan guidance; fixed price unchanged/i);
    expect(screen.queryByLabelText(/qualified booked-job fee/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/estimated performance fees/i)).not.toBeInTheDocument();
    expect(screen.getByText(/no setup, metered overage, booked-job, emergency-capture, or revenue-share fees/i)).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /book a revenue recovery demo/i })).toHaveAttribute('href', '/contact');
  });
});
