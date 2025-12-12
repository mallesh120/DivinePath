import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LiteratureLibraryPage from './LiteratureLibraryPage';

// Mock literature data
jest.mock('../../data/literature', () => ({
  literatureData: [
    {
      id: 'ramayana',
      title: 'Ramayana',
      type: 'epic',
      summary: 'Epic of Lord Rama',
      imageUrl: '/ramayana.jpg',
    },
    {
      id: 'mahabharata',
      title: 'Mahabharata',
      type: 'epic',
      summary: 'Great epic of India',
      imageUrl: '/mahabharata.jpg',
    },
    {
      id: 'bhagavad-gita',
      title: 'Bhagavad Gita',
      type: 'scripture',
      summary: 'Sacred scripture',
      imageUrl: '/gita.jpg',
    },
  ],
}));

// Mock LiteratureCard component
jest.mock('../../components/LitratureCard/LiteratureCard', () => {
  return function LiteratureCard({ story }) {
    return <div data-testid={`literature-card-${story.id}`}>{story.title}</div>;
  };
});

describe('LiteratureLibraryPage Component', () => {
  it('should render page title', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Literature Library')).toBeInTheDocument();
  });

  it('should render subtitle', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Explore Sacred Hindu Texts & Epics')).toBeInTheDocument();
  });

  it('should render search input', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search for a story...');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render all literature cards initially', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Ramayana')).toBeInTheDocument();
    expect(screen.getByText('Mahabharata')).toBeInTheDocument();
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument();
  });

  it('should filter stories based on search term', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search for a story...');
    fireEvent.change(searchInput, { target: { value: 'rama' } });
    
    expect(screen.getByText('Ramayana')).toBeInTheDocument();
    expect(screen.queryByText('Mahabharata')).not.toBeInTheDocument();
    expect(screen.queryByText('Bhagavad Gita')).not.toBeInTheDocument();
  });

  it('should be case-insensitive when searching', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search for a story...');
    fireEvent.change(searchInput, { target: { value: 'GITA' } });
    
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument();
    expect(screen.queryByText('Ramayana')).not.toBeInTheDocument();
  });

  it('should show no results message when search has no matches', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search for a story...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.getByText(/No stories found matching "nonexistent"/)).toBeInTheDocument();
  });

  it('should not show no results message when search is empty', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    expect(screen.queryByText(/No stories found matching/)).not.toBeInTheDocument();
  });

  it('should clear search and show all stories', () => {
    render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    const searchInput = screen.getByPlaceholderText('Search for a story...');
    
    // First filter
    fireEvent.change(searchInput, { target: { value: 'rama' } });
    expect(screen.queryByText('Mahabharata')).not.toBeInTheDocument();
    
    // Then clear
    fireEvent.change(searchInput, { target: { value: '' } });
    expect(screen.getByText('Ramayana')).toBeInTheDocument();
    expect(screen.getByText('Mahabharata')).toBeInTheDocument();
    expect(screen.getByText('Bhagavad Gita')).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <LiteratureLibraryPage />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.gallery-page')).toBeInTheDocument();
    expect(container.querySelector('.gallery-header')).toBeInTheDocument();
    expect(container.querySelector('.gallery-grid')).toBeInTheDocument();
  });
});
