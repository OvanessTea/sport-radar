import { act, renderHook, waitFor } from '@testing-library/react';
import { useData } from '../useData';
import { getData } from '@/services/getData';
import { mockMatches } from '@/__mocks__/mockMatches';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { mockSports } from '@/__mocks__/mockSports';

jest.mock('@/services/getData');
const mockGetData = getData as jest.MockedFunction<typeof getData>;

describe('useData', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    it('should initialize with loading state', async () => {
        const { result } = renderHook(() => useData());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(true);
        });
        expect(result.current.error).toBe(null);
        expect(result.current.matches).toEqual([]);
        expect(result.current.tournaments).toEqual([]);
        expect(result.current.sports).toEqual([]);
    });

    it('should fetch data successfully', async () => {
        const mockFetchData = {
            matches: mockMatches,
            tournaments: mockTournaments,
            sports: mockSports
        }

        mockGetData.mockResolvedValue(mockFetchData);

        const { result } = renderHook(() => useData());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.error).toBe(null);
        expect(result.current.matches).toEqual(mockFetchData.matches);
        expect(result.current.tournaments).toEqual(mockFetchData.tournaments);
        expect(result.current.sports).toEqual(mockFetchData.sports);
    });

    it('should handle error', async () => {
        const errorMessage = 'Failed to fetch data';
        mockGetData.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useData());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.error).toBe(errorMessage);
        expect(result.current.matches).toEqual([]);
        expect(result.current.tournaments).toEqual([]);
        expect(result.current.sports).toEqual([]);
    });

    it('should handle non-Error exception', async () => {
        const nonErrorMessage = 'Non-Error exception';
        mockGetData.mockRejectedValue(nonErrorMessage);

        const { result } = renderHook(() => useData());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        expect(result.current.error).toBe('Failed to fetch data');
    });

    it('should refetch with new data', async () => {
        const mockFetchData = {
            matches: mockMatches,
            tournaments: mockTournaments,
            sports: mockSports
        };

        mockGetData.mockResolvedValue(mockFetchData);
        
        const { result } = renderHook(() => useData());
        
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });
        
        const newMockData = {
            matches: [{ id: 2, tournamentId: 1, start_time: '2024-01-16T14:30:00Z', status: 'finished', home_team: 'Team C', away_team: 'Team D', home_score: '1', away_score: '0' }],
            tournaments: [{ id: 2, name: 'Champions League', sportId: 1 }],
            sports: [{ id: 2, name: 'Basketball' }]
        };
        mockGetData.mockResolvedValue(newMockData);

        await waitFor(() => {
            expect(typeof result.current.refetch).toBe('function');
        });

        await act(async () => {
            await result.current.refetch();
        });

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBe(null);
        expect(result.current.matches).toEqual(newMockData.matches);
        expect(result.current.tournaments).toEqual(newMockData.tournaments);
        expect(result.current.sports).toEqual(newMockData.sports);
    });
});