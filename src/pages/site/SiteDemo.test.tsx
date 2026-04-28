import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { waitFor } from '@testing-library/react';
import SiteDemo from './SiteDemo';

describe('SiteDemo', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('plays demo video when frame is clicked', () => {
    render(<SiteDemo />);

    fireEvent.click(screen.getByLabelText(/play demo video/i));

    const iframe = screen.getByTitle(/signmons live demo/i);
    expect(iframe).toHaveAttribute('src', expect.stringContaining('youtube.com/embed'));
  });

  it('sends a chat message and returns an ai response', async () => {
    vi.useFakeTimers();

    render(<SiteDemo />);

    const input = screen.getByPlaceholderText(/my ac is out/i);
    fireEvent.change(input, { target: { value: 'Need service today' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(screen.getByText('Need service today')).toBeInTheDocument();

    await act(async () => {
      vi.advanceTimersByTime(950);
    });

    expect(screen.getByText(/what's the service address\?/i)).toBeInTheDocument();

    vi.useRealTimers();
  });

  it('starts live demo flow and resolves status by leadId', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input) => {
        const url = String(input);
        if (url.endsWith('/api/marketing/try-demo')) {
          return {
            ok: true,
            json: async () => ({
              leadId: 'lead_demo_123',
              status: 'queued',
            }),
          } as Response;
        }

        if (url.endsWith('/api/marketing/try-demo/lead_demo_123')) {
          return {
            ok: true,
            json: async () => ({
              leadId: 'lead_demo_123',
              status: 'completed',
            }),
          } as Response;
        }

        return {
          ok: false,
          json: async () => ({ message: 'unexpected route' }),
        } as Response;
      });

    render(<SiteDemo />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '(216) 555-0199' },
    });
    fireEvent.click(screen.getByLabelText(/i agree to receive an automated call\/text for this demo request/i));
    fireEvent.click(screen.getByRole('button', { name: /start live demo/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/marketing/try-demo',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    expect(await screen.findByText(/lead id: lead_demo_123/i)).toBeInTheDocument();
    expect(await screen.findByText(/demo flow completed successfully/i)).toBeInTheDocument();
  });

  it('shows failure state when backend returns failed status', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockImplementation(async (input) => {
        const url = String(input);
        if (url.endsWith('/api/marketing/try-demo')) {
          return {
            ok: true,
            json: async () => ({
              leadId: 'lead_demo_fail',
              status: 'queued',
            }),
          } as Response;
        }

        if (url.endsWith('/api/marketing/try-demo/lead_demo_fail')) {
          return {
            ok: true,
            json: async () => ({
              leadId: 'lead_demo_fail',
              status: 'failed',
            }),
          } as Response;
        }

        return {
          ok: false,
          json: async () => ({ message: 'unexpected route' }),
        } as Response;
      });

    render(<SiteDemo />);

    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: '(216) 555-0199' },
    });
    fireEvent.click(screen.getByLabelText(/i agree to receive an automated call\/text for this demo request/i));
    fireEvent.click(screen.getByRole('button', { name: /start live demo/i }));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        '/api/marketing/try-demo',
        expect.objectContaining({
          method: 'POST',
        }),
      );
    });

    expect(await screen.findByText(/demo request failed\. please retry or contact support\./i)).toBeInTheDocument();
  });
});
