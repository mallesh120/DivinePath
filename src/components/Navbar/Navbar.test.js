import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar Component', () => {
  it('should render brand name', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Divine Path')).toBeInTheDocument();
  });

  it('should render all navigation links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Gods Gallery')).toBeInTheDocument();
    expect(screen.getByText('Literature')).toBeInTheDocument();
    expect(screen.getByText('Festivals')).toBeInTheDocument();
    expect(screen.getByText('Hindu Calendar')).toBeInTheDocument();
    expect(screen.getByText('Puja Guide')).toBeInTheDocument();
    expect(screen.getByText('108 Names')).toBeInTheDocument();
    expect(screen.getByText('AI Features')).toBeInTheDocument();
  });

  it('should have correct href attributes for all links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const homeLink = screen.getAllByRole('link', { name: /home/i })[0];
    const godsLink = screen.getByRole('link', { name: /gods gallery/i });
    const literatureLink = screen.getByRole('link', { name: /literature/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(godsLink).toHaveAttribute('href', '/gods');
    expect(literatureLink).toHaveAttribute('href', '/library');
  });

  it('should toggle mobile menu when hamburger is clicked', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    
    // Initially closed
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    
    // Click to open
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    
    // Click to close
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });

  it('should highlight active link', () => {
    render(
      <MemoryRouter initialEntries={['/gods']}>
        <Navbar />
      </MemoryRouter>
    );
    
    const godsLink = screen.getByRole('link', { name: /gods gallery/i });
    expect(godsLink).toHaveClass('active-link');
  });

  it('should have hamburger menu button with correct aria attributes', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    expect(hamburger).toBeInTheDocument();
    expect(hamburger).toHaveAttribute('aria-expanded');
  });

  it('should render overlay when menu is open', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    
    // Initially no overlay
    expect(container.querySelector('.navbar-overlay')).not.toBeInTheDocument();
    
    // Open menu
    fireEvent.click(hamburger);
    expect(container.querySelector('.navbar-overlay')).toBeInTheDocument();
  });

  it('should close menu when overlay is clicked', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    
    const hamburger = screen.getByLabelText('Toggle navigation menu');
    
    // Open menu
    fireEvent.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    
    // Click overlay
    const overlay = container.querySelector('.navbar-overlay');
    fireEvent.click(overlay);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
  });
});
