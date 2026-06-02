import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from './HomePage';

// Mock child components
jest.mock('../../components/ShlokaOfTheDay/ShlokaOfTheDay', () => {
  return function ShlokaOfTheDay() {
    return <div data-testid="shloka-of-the-day">Shloka Component</div>;
  };
});

jest.mock('../../components/StoryOfTheDay/StoryOfTheDay', () => {
  return function StoryOfTheDay() {
    return <div data-testid="story-of-the-day">Story Component</div>;
  };
});

jest.mock('../../components/DailyHoroscope/DailyHoroscope', () => {
  return function DailyHoroscope() {
    return <div data-testid="daily-horoscope">Horoscope Component</div>;
  };
});

jest.mock('../../components/DevotionalAudio/DevotionalAudio', () => {
  return function DevotionalAudio() {
    return <div data-testid="devotional-audio">Audio Component</div>;
  };
});

describe('HomePage Component', () => {
  it('should render hero section with title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/🕉️ Daily Devotional/i)).toBeInTheDocument();
  });

  it('should render hero subtitle', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Your spiritual companion for daily wisdom/i)).toBeInTheDocument();
  });

  it('should display current date', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    // Just check that some date text is present
    const dateElements = screen.getAllByText(/2024|2025|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/i);
    expect(dateElements.length).toBeGreaterThan(0);
  });

  it('should render all child components', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('shloka-of-the-day')).toBeInTheDocument();
    expect(screen.getByTestId('story-of-the-day')).toBeInTheDocument();
    expect(screen.getByTestId('daily-horoscope')).toBeInTheDocument();
    expect(screen.getByTestId('devotional-audio')).toBeInTheDocument();
  });

  it('should render daily spiritual practices section', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/✨ Daily Spiritual Practices/i)).toBeInTheDocument();
  });

  it('should render morning practice tips', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Morning/i)).toBeInTheDocument();
    expect(screen.getByText(/Wake up during Brahma Muhurta/i)).toBeInTheDocument();
  });

  it('should have correct CSS classes', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.homePage')).toBeInTheDocument();
    expect(container.querySelector('.header')).toBeInTheDocument();
    expect(container.querySelector('.devotionalContainer')).toBeInTheDocument();
  });

  it('should render multiple devotional sections', () => {
    const { container } = render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );
    
    const sections = container.querySelectorAll('.devotionalSection');
    expect(sections.length).toBeGreaterThan(3);
  });
});
