import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('navigates to Ramayana page when Ramayana card is clicked', async () => {
  render(
    <MemoryRouter initialEntries={['/library']}>
      <App />
    </MemoryRouter>
  );

  const ramayanaLink = await screen.findByRole('link', { name: /ramayana/i });
  userEvent.click(ramayanaLink);

  const ramayanaPageTitle = await screen.findByRole('heading', { name: /Ramayana/i });
  expect(ramayanaPageTitle).toBeInTheDocument();
});
