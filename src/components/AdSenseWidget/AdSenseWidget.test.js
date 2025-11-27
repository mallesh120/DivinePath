import React from 'react';
import { render, screen } from '@testing-library/react';
import AdSenseWidget from './AdSenseWidget';

test('renders AdSenseWidget without crashing', () => {
  render(<AdSenseWidget />);
  const adElement = screen.getByText(/Advertisement/i);
  expect(adElement).toBeInTheDocument();
});
