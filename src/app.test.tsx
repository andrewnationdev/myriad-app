import { expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './app';

test('renders the app title', () => {
  render(<App />);
  expect(screen.getByText(/myriad/i)).toBeDefined();
});