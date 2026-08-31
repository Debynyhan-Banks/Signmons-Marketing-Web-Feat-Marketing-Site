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
    expect(screen.getByRole('heading', { level: 2, name: /what counts as billable/i })).toBeInTheDocument();

    const costCard = screen.getByText(/estimated monthly plan cost/i).closest('article');
    expect(costCard).toHaveTextContent('$799');

    await user.click(screen.getByLabelText(/include an enabled performance-fee policy/i));
    expect(screen.getByLabelText(/qualified booked-job fee/i)).toBeInTheDocument();
    expect(costCard).toHaveTextContent(/estimated performance fees/i);

    expect(screen.getByRole('link', { name: /book a revenue recovery demo/i })).toHaveAttribute('href', '/contact');
  });
});
