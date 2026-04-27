import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import SiteContact from './SiteContact';

describe('SiteContact', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('shows validation error when email is missing', async () => {
    render(<SiteContact />);

    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    expect(await screen.findByText(/email is required to submit this form/i)).toBeInTheDocument();
  });

  it('submits lead-capture payload and shows success state', async () => {
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({
        leadId: 'lead_123',
        status: 'accepted',
        createdAt: '2026-04-27T14:00:00.000Z',
      }),
    } as Response);

    render(<SiteContact />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'owner@example.com' },
    });
    fireEvent.click(
      screen.getByLabelText(/i agree signmons may contact me about demo and onboarding/i),
    );
    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/marketing/lead-capture',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    );

    expect(await screen.findByRole('heading', { level: 3, name: /you're on the list!/i })).toBeInTheDocument();
    expect(screen.getByText(/lead id:/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /live demo/i })).toHaveAttribute('href', '/demo');
  });

  it('shows backend error message on failed submit', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({
        message: 'Validation failed',
      }),
    } as Response);

    render(<SiteContact />);

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'owner@example.com' },
    });
    fireEvent.click(
      screen.getByLabelText(/i agree signmons may contact me about demo and onboarding/i),
    );
    fireEvent.click(screen.getByRole('button', { name: /submit application/i }));

    expect(await screen.findByText(/validation failed/i)).toBeInTheDocument();
  });
});
