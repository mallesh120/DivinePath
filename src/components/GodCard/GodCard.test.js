import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GodCard from './GodCard';

const mockGod = {
  id: 'ganesha',
  name: 'Lord Ganesha',
  description: 'Remover of obstacles',
  imageUrl: '/test-image.jpg',
};

describe('GodCard Component', () => {
  it('should render god name', () => {
    render(
      <MemoryRouter>
        <GodCard god={mockGod} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Lord Ganesha')).toBeInTheDocument();
  });

  it('should render god description', () => {
    render(
      <MemoryRouter>
        <GodCard god={mockGod} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Remover of obstacles')).toBeInTheDocument();
  });

  it('should render god image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <GodCard god={mockGod} />
      </MemoryRouter>
    );
    
    const image = screen.getByAltText('Lord Ganesha');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should link to the correct god detail page', () => {
    render(
      <MemoryRouter>
        <GodCard god={mockGod} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/gods/ganesha');
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <GodCard god={mockGod} />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.god-card')).toBeInTheDocument();
    expect(container.querySelector('.god-card-link')).toBeInTheDocument();
    expect(container.querySelector('.god-card-image')).toBeInTheDocument();
  });
});
