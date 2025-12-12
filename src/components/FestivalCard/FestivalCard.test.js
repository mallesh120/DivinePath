import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FestivalCard from './FestivalCard';

// Mock the data utility functions
jest.mock('../../data/festivals/festivalsData', () => ({
  formatDateRange: jest.fn((start, end) => end ? `${start} - ${end}` : start),
  getDaysUntilFestival: jest.fn((date) => 5),
  getFestivalStatus: jest.fn(() => 'upcoming'),
}));

const mockFestival = {
  id: 'diwali',
  name: 'Diwali',
  shortName: 'Festival of Lights',
  category: 'Major Festival',
  date: '2024-11-01',
  endDate: '2024-11-05',
  duration: '5 days',
  lunarDate: 'Kartik Amavasya',
  description: 'The festival of lights celebrated across India',
  deities: ['Lakshmi', 'Ganesha'],
  colors: ['#FFD700', '#FF6347'],
};

describe('FestivalCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render festival name', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Diwali')).toBeInTheDocument();
  });

  it('should render short name when provided', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Festival of Lights')).toBeInTheDocument();
  });

  it('should render festival category', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Major Festival')).toBeInTheDocument();
  });

  it('should render festival description', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('The festival of lights celebrated across India')).toBeInTheDocument();
  });

  it('should render duration', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('5 days')).toBeInTheDocument();
  });

  it('should render lunar date when provided', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Kartik Amavasya')).toBeInTheDocument();
  });

  it('should render deities', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Lakshmi/)).toBeInTheDocument();
    expect(screen.getByText(/Ganesha/)).toBeInTheDocument();
  });

  it('should render color dots', () => {
    const { container } = render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    const colorDots = container.querySelectorAll('.festival-color-dot');
    expect(colorDots.length).toBe(2);
  });

  it('should link to festival detail page', () => {
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    const link = screen.getByRole('link', { name: /view details/i });
    expect(link).toHaveAttribute('href', '/festivals/diwali');
  });

  it('should render status badge for upcoming festival', () => {
    const { getFestivalStatus, getDaysUntilFestival } = require('../../data/festivals/festivalsData');
    getFestivalStatus.mockReturnValue('this-month');
    getDaysUntilFestival.mockReturnValue(5);
    
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/In 5 days/)).toBeInTheDocument();
  });

  it('should render today badge when festival is today', () => {
    const { getFestivalStatus } = require('../../data/festivals/festivalsData');
    getFestivalStatus.mockReturnValue('today');
    
    render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} />
      </MemoryRouter>
    );
    
    expect(screen.getByText(/Today!/)).toBeInTheDocument();
  });

  it('should render compact view when compact prop is true', () => {
    const { container } = render(
      <MemoryRouter>
        <FestivalCard festival={mockFestival} compact={true} />
      </MemoryRouter>
    );
    
    expect(container.querySelector('.festival-card.compact')).toBeInTheDocument();
  });

  it('should return null when festival data is invalid', () => {
    const { container } = render(
      <MemoryRouter>
        <FestivalCard festival={null} />
      </MemoryRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should return null when festival date is missing', () => {
    const invalidFestival = { ...mockFestival, date: null };
    const { container } = render(
      <MemoryRouter>
        <FestivalCard festival={invalidFestival} />
      </MemoryRouter>
    );
    
    expect(container.firstChild).toBeNull();
  });

  it('should not render short name when not provided', () => {
    const festivalWithoutShortName = { ...mockFestival, shortName: null };
    render(
      <MemoryRouter>
        <FestivalCard festival={festivalWithoutShortName} />
      </MemoryRouter>
    );
    
    expect(screen.queryByText('Festival of Lights')).not.toBeInTheDocument();
  });
});
