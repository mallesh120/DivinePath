import { renderHook, waitFor } from '@testing-library/react';
import { usePanchangam } from '../usePanchangam';
import { getPanchangam, Observer } from '@ishubhamx/panchangam-js';

// Mock the external library
jest.mock('@ishubhamx/panchangam-js', () => ({
  getPanchangam: jest.fn(),
  Observer: jest.fn()
}));

describe('usePanchangam', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should calculate panchangam data correctly using default location (mocked error)', async () => {
    // Mock getPanchangam response
    const mockDate = new Date('2024-11-24T00:00:00Z');
    const mockPanchangam = {
      vara: 0,
      tithi: 1,
      nakshatra: 1,
      sunrise: new Date('2024-11-24T00:52:00Z'),
      sunset: new Date('2024-11-24T12:20:00Z'),
    };
    getPanchangam.mockReturnValue(mockPanchangam);

    // Mock geolocation to trigger error immediately
    const mockGeolocation = {
      getCurrentPosition: jest.fn().mockImplementation((success, error) => {
        if (error) {
          error({
             code: 1,
             message: "User denied Geolocation"
          });
        }
      })
    };

    Object.defineProperty(global.navigator, 'geolocation', {
      value: mockGeolocation,
      writable: true
    });

    const { result } = renderHook(() => usePanchangam());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.panchangamData).toBeTruthy();
    expect(result.current.panchangamData['Rahu Kalam']).toBeDefined();
    expect(result.current.panchangamData['Gulikai Kalam']).toBeDefined();
    expect(result.current.panchangamData['Location']).toBe('Bangalore'); // Default

    expect(getPanchangam).toHaveBeenCalledTimes(2);
  });
});
