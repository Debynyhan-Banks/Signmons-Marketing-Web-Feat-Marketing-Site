export const colors = {
  brand: {
    primary: '#1A6CF5',
    secondary: '#00D4FF',
    accent: '#6B8EFF',
    highlight: '#4288FF',
  },
  neutral: {
    white: '#FFFFFF',
  },
  state: {
    confirmed: '#34D399',
    candidate: '#FBBF24',
    disabled: '#4A7FA8',
  },
  text: {
    primary: '#F0F4FF',
    secondary: '#B8C5E0',
    muted: '#6C8AB5',
  },
  bg: {
    page: '#04060F',
    card: '#0A1124',
    surface: '#0F1A36',
  },
  border: {
    subtle: 'rgba(74, 127, 168, 0.24)',
  },
};

export const typography = {
  fontFamily: '"Poppins", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
  hero: {
    fontSize: 'clamp(2.25rem, 5vw, 3.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.015em',
    lineHeight: 1.2,
  },
  lead: {
    fontSize: 'clamp(1.05rem, 2.5vw, 1.25rem)',
    fontWeight: 500,
    letterSpacing: '-0.005em',
    lineHeight: 1.55,
  },
  sectionTitle: {
    fontSize: 'clamp(1.75rem, 3vw, 2.25rem)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.25,
  },
  body: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.7 },
  caption: { fontSize: '0.9rem', fontWeight: 500, lineHeight: 1.6 },
  cta: { fontSize: '1rem', fontWeight: 700, letterSpacing: '0.01em' },
};

export const spacing = {
  xxs: '0.25rem',
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
  '4xl': '5rem',
  '5xl': '6rem',
};

export const radii = {
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  pill: '999px',
};

export const effects = {
  glowPrimary: 'rgba(26, 108, 245, 0.32)',
  glowSecondary: 'rgba(0, 212, 255, 0.18)',
  glowPink: 'rgba(66, 136, 255, 0.28)',
  glassSoft: 'rgba(255, 255, 255, 0.12)',
  glass: 'rgba(255, 255, 255, 0.08)',
  glassStrong: 'rgba(255, 255, 255, 0.16)',
  glassTint: 'rgba(26, 108, 245, 0.15)',
  star: 'rgba(255, 255, 255, 0.7)',
  starSoft: 'rgba(255, 255, 255, 0.35)',
};

export const shadows = {
  title: '0 10px 30px rgba(7, 6, 30, 0.6)',
  primaryCta: '0 16px 30px rgba(26, 108, 245, 0.35)',
  stepIcon: '0 12px 30px rgba(26, 108, 245, 0.35)',
  orbPrimary: '0 30px 80px rgba(26, 108, 245, 0.45)',
  orbSecondary: '0 0 60px rgba(0, 212, 255, 0.3)',
  panel: '0 24px 60px rgba(10, 8, 40, 0.45)',
  inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
};

export const borders = {
  halo: '2px solid rgba(255, 255, 255, 0.35)',
};

export const badges = {
  confirmed: {
    background: 'rgba(52, 211, 153, 0.10)',
    text: colors.state.confirmed,
    border: 'rgba(52, 211, 153, 0.32)',
  },
  candidate: {
    background: 'rgba(251, 191, 36, 0.10)',
    text: colors.state.candidate,
    border: 'rgba(251, 191, 36, 0.32)',
  },
  disabled: {
    background: 'rgba(74, 127, 168, 0.16)',
    text: colors.state.disabled,
    border: 'rgba(74, 127, 168, 0.32)',
  },
};

export const motion = {
  duration: {
    fast: '150ms',
    standard: '250ms',
  },
  easing: {
    standard: 'cubic-bezier(0.2, 0, 0, 1)',
  },
};
