import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SiteRoiCalculator from './SiteRoiCalculator';

describe('SiteRoiCalculator', () => {
  it('renders SCR-PUB-016 ROI calculator and updates projected value', async () => {
    const user = userEvent.setup();
    render(<SiteRoiCalculator />);

    expect(screen.getByRole('heading', { level: 1, name: /estimate your/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /use your current operating numbers/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /projected monthly impact/i })).toBeInTheDocument();

    const totalCard = screen.getByText(/total projected value/i).closest('article');
    expect(totalCard).toBeInTheDocument();
    const initialValue = totalCard?.querySelector('.roi-result-value')?.textContent ?? '';

    const missedCallsField = screen.getByLabelText(/missed calls per week/i);
    await user.clear(missedCallsField);
    await user.type(missedCallsField, '40');

    const updatedValue = totalCard?.querySelector('.roi-result-value')?.textContent ?? '';
    expect(updatedValue).not.toEqual(initialValue);

    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
