import { render, screen } from '@testing-library/react';
import SiteBrandVoice from './SiteBrandVoice';

describe('SiteBrandVoice', () => {
  it('renders SCR-PUB-013 brand voice content with six controls and human fallback', () => {
    render(<SiteBrandVoice />);

    // Hero
    expect(screen.getByRole('heading', { level: 1, name: /your brand/i })).toBeInTheDocument();

    // Section headings
    expect(
      screen.getByRole('heading', { level: 2, name: /six tenant-scoped controls that shape every conversation/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: /always a human path for urgent or unclear cases/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: /tenant-scoped, versioned, auditable/i })).toBeInTheDocument();

    // Six required controls (greeting, tone, prohibited phrases, fee language, escalation language, closeout messaging)
    expect(screen.getByRole('heading', { level: 3, name: /^greeting$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /^tone$/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /prohibited phrases/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /fee language/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /escalation language/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /closeout messaging/i })).toBeInTheDocument();

    // Human fallback copy must be present
    expect(screen.getByText(/voice is persuasive intake, not the final authority/i)).toBeInTheDocument();
    expect(
      screen.getByText(/stated emergency or safety risk \(gas, water, no heat in winter, electrical hazard\)\./i),
    ).toBeInTheDocument();
    expect(screen.getByText(/caller intent is unclear after two clarification attempts\./i)).toBeInTheDocument();

    // Tenant isolation governance
    expect(screen.getByText(/brand voice profiles are tenant-isolated/i)).toBeInTheDocument();

    // CTA route parity (mirrors LINK_CTA_MAP / FE-010 contract)
    expect(
      screen
        .getAllByRole('link', { name: /book revenue demo/i })
        .every((link) => link.getAttribute('href') === '/contact'),
    ).toBe(true);
    expect(screen.getByRole('link', { name: /see live demo/i })).toHaveAttribute('href', '/demo');
  });
});
