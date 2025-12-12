import { renderHook, waitFor } from '@testing-library/react';
import { usePanchangam, calculateBasicPanchang } from './usePanchangam';

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

// Mock fetch for reverse geocoding
global.fetch = jest.fn();

describe('calculateBasicPanchang', () => {
  it('should calculate basic panchang for a given date', () => {
    const result = calculateBasicPanchang(2024, 0, 15); // Jan 15, 2024
    
    expect(result).toHaveProperty('tithi');
    expect(result).toHaveProperty('nakshatra');
    expect(result).toHaveProperty('vara');
    expect(result).toHaveProperty('paksha');
    expect(typeof result.tithi).toBe('string');
    expect(typeof result.nakshatra).toBe('string');
    expect(typeof result.vara).toBe('string');
    expect(['Shukla Paksha', 'Krishna Paksha']).toContain(result.paksha);
  });

  it('should return Monday for Jan 15, 2024', () => {
    const result = calculateBasicPanchang(2024, 0, 15);
    expect(result.vara).toBe('Monday');
  });

  it('should handle different months correctly', () => {
    const jan = calculateBasicPanchang(2024, 0, 1);
    const dec = calculateBasicPanchang(2024, 11, 31);
    
    expect(jan).toHaveProperty('tithi');
    expect(dec).toHaveProperty('tithi');
    expect(jan.tithi).not.toBe(dec.tithi);
  });

  it('should cycle through nakshatras correctly', () => {
    const results = [];
    for (let day = 1; day <= 27; day++) {
      const result = calculateBasicPanchang(2024, 0, day);
      results.push(result.nakshatra);
    }
    
    // All 27 nakshatras should appear
    const uniqueNakshatras = new Set(results);
    expect(uniqueNakshatras.size).toBeGreaterThan(20); // At least most of them
  });
});

describe('usePanchangam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    fetch.mockClear();
  });

  it('should initialize with loading state', () => {
    mockGeolocation.getCurrentPosition.mockImplementation(() => {});
    
    const { result } = renderHook(() => usePanchangam());
    
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
    expect(result.current.panchangamData).toBe(null);
  });

  it('should handle successful geolocation', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: {
          latitude: 12.9716,
          longitude: 77.5946,
        },
      });
    });

    fetch.mockResolvedValue({
      json: async () => ({
        address: {
          city: 'Bangalore',
        },
      }),
    });

    const { result } = renderHook(() => usePanchangam());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 5000 });

    await waitFor(() => {
      expect(result.current.panchangamData).not.toBe(null);
    }, { timeout: 5000 });

    expect(result.current.error).toBe(null);
    expect(result.current.panchangamData.meta.location).toBe('Bangalore');
  });

  it('should handle geolocation error and use default location', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success, error) => {
      error({ code: 1, message: 'User denied geolocation' });
    });

    const { result } = renderHook(() => usePanchangam());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.error).toContain('Unable to get your location');
    expect(result.current.panchangamData).not.toBe(null);
    expect(result.current.panchangamData.meta.location).toBe('Bangalore');
  });

  it('should calculate panchangam data with correct structure', async () => {
    mockGeolocation.getCurrentPosition.mockImplementation((success) => {
      success({
        coords: {
          latitude: 12.9716,
          longitude: 77.5946,
        },
      });
    });

    fetch.mockResolvedValue({
      json: async () => ({
        address: { city: 'Bangalore' },
      }),
    });

    const { result } = renderHook(() => usePanchangam());

    await waitFor(() => {
      expect(result.current.panchangamData).not.toBe(null);
    }, { timeout: 3000 });

    const data = result.current.panchangamData;
    
    // Check structure
    expect(data).toHaveProperty('meta');
    expect(data).toHaveProperty('almanac');
    expect(data).toHaveProperty('solarLunar');
    expect(data).toHaveProperty('auspicious');
    expect(data).toHaveProperty('inauspicious');

    // Check almanac
    expect(data.almanac).toHaveProperty('Tithi');
    expect(data.almanac).toHaveProperty('Nakshatra');
    expect(data.almanac).toHaveProperty('Yoga');
    expect(data.almanac).toHaveProperty('Karana');

    // Check solar/lunar
    expect(data.solarLunar).toHaveProperty('Sunrise');
    expect(data.solarLunar).toHaveProperty('Sunset');
    expect(data.solarLunar).toHaveProperty('Moonrise');
    expect(data.solarLunar).toHaveProperty('Moonset');

    // Check auspicious timings
    expect(data.auspicious).toHaveProperty('Brahma Muhurta');
    expect(data.auspicious).toHaveProperty('Abhijit Muhurta');
    expect(data.auspicious).toHaveProperty('Godhuli Muhurta');

    // Check inauspicious timings
    expect(data.inauspicious).toHaveProperty('Rahu Kalam');
    expect(data.inauspicious).toHaveProperty('Yamagandam');
    expect(data.inauspicious).toHaveProperty('Gulikai Kalam');
    expect(data.inauspicious).toHaveProperty('Durmuhurtham');
  });

  it('should handle missing geolocation API gracefully', async () => {
    const originalGeolocation = global.navigator.geolocation;
    delete global.navigator.geolocation;

    const { result } = renderHook(() => usePanchangam());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.error).toContain('Geolocation is not supported');
    expect(result.current.panchangamData).not.toBe(null);
    expect(result.current.panchangamData.meta.location).toBe('Bangalore');

    global.navigator.geolocation = originalGeolocation;
  });
});
