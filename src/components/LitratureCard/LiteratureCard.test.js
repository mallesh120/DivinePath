import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LiteratureCard from './LiteratureCard';

const mockEpicStory = {
  id: 'ramayana',
  title: 'Ramayana',
  type: 'epic',
  summary: 'The epic tale of Lord Rama',
  imageUrl: '/ramayana.jpg',
  hasAudio: true,
  hasIllustrations: true,
};

const mockScriptureStory = {
  id: 'bhagavad-gita',
  title: 'Bhagavad Gita',
  type: 'scripture',
  summary: 'Sacred Hindu scripture',
  imageUrl: '/gita.jpg',
  hasAudio: false,
  hasIllustrations: false,
};

const mockPuranaStory = {
  id: 'bhagavata',
  title: 'Bhagavata Purana',
  type: 'purana',
  summary: 'Stories of Lord Vishnu',
  imageUrl: '/bhagavata.jpg',
  hasAudio: true,
  hasIllustrations: false,
};

const mockRamcharitmanasStory = {
  id: 'ramcharitmanas',
  title: 'Ramcharitmanas',
  type: 'epic',
  summary: 'Tulsidas\'s retelling of Ramayana',
  imageUrl: '/ramcharitmanas.jpg',
  hasAudio: false,
  hasIllustrations: true,
};

describe('LiteratureCard Component', () => {
  it('should render story title', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Ramayana')).toBeInTheDocument();
  });

  it('should render story summary', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('The epic tale of Lord Rama')).toBeInTheDocument();
  });

  it('should render story image with correct src and alt', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    const image = screen.getByAltText('Ramayana');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/ramayana.jpg');
  });

  it('should link to correct path for epic type', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/library/ramayana');
  });

  it('should link to correct path for scripture type', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockScriptureStory} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/library/bhagavad-gita');
  });

  it('should link to correct path for purana type', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockPuranaStory} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/library/bhagavata');
  });

  it('should link to TOC for ramcharitmanas', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockRamcharitmanasStory} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/library/ramcharitmanas');
  });

  it('should render epic type badge', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/⚔️ Epic/)).toBeInTheDocument();
  });

  it('should render scripture type badge', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockScriptureStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/📖 Scripture/)).toBeInTheDocument();
  });

  it('should render purana type badge', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockPuranaStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/🕉️ Purana/)).toBeInTheDocument();
  });

  it('should render audio icon when hasAudio is true', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('🎧')).toBeInTheDocument();
  });

  it('should render illustrations icon when hasIllustrations is true', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('🎨')).toBeInTheDocument();
  });

  it('should not render audio icon when hasAudio is false', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockScriptureStory} />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('🎧')).not.toBeInTheDocument();
  });

  it('should not render illustrations icon when hasIllustrations is false', () => {
    render(
      <MemoryRouter>
        <LiteratureCard story={mockScriptureStory} />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('🎨')).not.toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <LiteratureCard story={mockEpicStory} />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.literature-card')).toBeInTheDocument();
    expect(container.querySelector('.literature-card-link')).toBeInTheDocument();
    expect(container.querySelector('.literature-type-badge')).toBeInTheDocument();
  });

  it('should render default summary badge for unknown type', () => {
    const unknownTypeStory = { ...mockEpicStory, type: 'unknown' };
    render(
      <MemoryRouter>
        <LiteratureCard story={unknownTypeStory} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/📚 Summary/)).toBeInTheDocument();
  });
});
