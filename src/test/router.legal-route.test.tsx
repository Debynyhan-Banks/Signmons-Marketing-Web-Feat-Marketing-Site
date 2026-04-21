import { render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import Router from '../router';

describe('Router legal route', () => {
  afterEach(() => {
    window.history.pushState({}, '', '/');
  });

  it('renders legal screen on /legal', () => {
    window.history.pushState({}, '', '/legal');
    render(<Router />);

    expect(
      screen.getByRole('heading', {
        name: /Privacy, Terms, and SMS Program Terms/i,
      })
    ).toBeInTheDocument();
  });
});
