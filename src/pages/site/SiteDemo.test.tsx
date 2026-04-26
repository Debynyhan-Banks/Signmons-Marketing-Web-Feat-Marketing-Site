import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import SiteDemo from './SiteDemo';

describe('SiteDemo', () => {
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
});
