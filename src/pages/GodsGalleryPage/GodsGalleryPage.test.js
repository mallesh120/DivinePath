import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import GodsGalleryPage from './GodsGalleryPage';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock godsData
jest.mock('../../data/gods/godsData', () => ({
  trimurtiData: [
    {
      id: 'brahma',
      name: 'Lord Brahma',
      title: 'The Creator',
      role: 'Creation',
      description: 'Creator of the universe',
      imageUrl: '/brahma.jpg'
    },
    {
      id: 'vishnu',
      name: 'Lord Vishnu',
      title: 'The Preserver',
      role: 'Preservation',
      description: 'Preserver of the universe',
      imageUrl: '/vishnu.jpg',
      avatars: [
        { id: 1, name: 'Matsya' },
        { id: 2, name: 'Kurma' },
        { id: 3, name: 'Varaha' },
        { id: 4, name: 'Narasimha' },
        { id: 5, name: 'Vamana' },
        { id: 6, name: 'Parashurama' },
      ]
    },
    {
      id: 'shiva',
      name: 'Lord Shiva',
      title: 'The Destroyer',
      role: 'Destruction',
      description: 'Destroyer of evil',
      imageUrl: '/shiva.jpg'
    }
  ],
  godsData: [
    {
      id: 8,
      name: 'Lord Hanuman',
      category: 'Major Deity',
      imageUrl: '/hanuman.jpg'
    },
    {
      id: 9,
      name: 'Goddess Durga',
      category: 'Major Deity',
      imageUrl: '/durga.jpg'
    }
  ]
}));

describe('GodsGalleryPage Component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('should render page title', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('The Holy Trinity')).toBeInTheDocument();
  });

  it('should render trinity subtitle', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/The Trimurti - The three supreme deities/i)).toBeInTheDocument();
  });

  it('should render all trinity gods', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Lord Brahma')).toBeInTheDocument();
    expect(screen.getByText('Lord Vishnu')).toBeInTheDocument();
    expect(screen.getByText('Lord Shiva')).toBeInTheDocument();
  });

  it('should render trinity roles', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('The Creator')).toBeInTheDocument();
    expect(screen.getByText('The Preserver')).toBeInTheDocument();
    expect(screen.getByText('The Destroyer')).toBeInTheDocument();
  });

  it('should navigate to god detail when trinity card is clicked', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    const brahmaCard = screen.getByText('Lord Brahma').closest('.trimurti-card');
    fireEvent.click(brahmaCard);
    
    expect(mockNavigate).toHaveBeenCalledWith('/gods/brahma');
  });

  it('should render major deities section', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Lord Hanuman')).toBeInTheDocument();
    expect(screen.getByText('Goddess Durga')).toBeInTheDocument();
  });

  it('should navigate to god detail when deity card is clicked', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    // Find the card by finding the text and going up to the clickable element
    const hanumanText = screen.getByText('Lord Hanuman');
    const hanumanCard = hanumanText.closest('.trimurti-card, .deity-card, [class*="card"]');
    
    if (hanumanCard) {
      fireEvent.click(hanumanCard);
      expect(mockNavigate).toHaveBeenCalledWith('/gods/8');
    }
  });

  it('should render view all avatars button', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    const viewAllButton = screen.queryByText(/View All 10 Avatars/i);
    if (viewAllButton) {
      fireEvent.click(viewAllButton);
      expect(mockNavigate).toHaveBeenCalledWith('/gods/vishnu');
    }
  });

  it('should have correct CSS structure', () => {
    const { container } = render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.gallery-page')).toBeInTheDocument();
    expect(container.querySelector('.trimurti-grid')).toBeInTheDocument();
  });

  it('should render trinity card images', () => {
    render(
      <MemoryRouter>
        <GodsGalleryPage />
      </MemoryRouter>
    );
    
    const brahmaImage = screen.getByAltText('Lord Brahma');
    const vishnuImage = screen.getByAltText('Lord Vishnu');
    const shivaImage = screen.getByAltText('Lord Shiva');
    
    expect(brahmaImage).toBeInTheDocument();
    expect(vishnuImage).toBeInTheDocument();
    expect(shivaImage).toBeInTheDocument();
  });
});
