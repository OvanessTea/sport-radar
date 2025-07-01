import { mockMatches } from '@/__mocks__/mockMatches';
import { mockSports } from '@/__mocks__/mockSports';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { getData } from '../getData';
import { fetchMatches, fetchSports, fetchTournaments } from '../api';
import { transformSportName } from '@/helpers/transform/sport_name.transform';

jest.mock('../api');
jest.mock('@/helpers/transform/sport_name.transform');

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
});

const mockedFetchMatches = fetchMatches as jest.MockedFunction<typeof fetchMatches>;
const mockedFetchSports = fetchSports as jest.MockedFunction<typeof fetchSports>;
const mockedFetchTournaments = fetchTournaments as jest.MockedFunction<typeof fetchTournaments>;
const mockedTransformSportName = transformSportName as jest.MockedFunction<typeof transformSportName>;

describe('getData Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorageMock.getItem.mockClear();
        localStorageMock.setItem.mockClear();
    });

    describe('when data exists in localStorage', () => {
        it('should return cached data without making API calls', async () => {
            const cachedData = {
                matches: mockMatches,
                tournaments: mockTournaments,
                sports: mockSports,
            };

            localStorageMock.getItem.mockReturnValue(JSON.stringify(cachedData));

            const result = await getData();

            expect(localStorageMock.getItem).toHaveBeenCalledWith('data');
            expect(result).toEqual(cachedData);
            expect(mockedFetchMatches).not.toHaveBeenCalled();
            expect(mockedFetchSports).not.toHaveBeenCalled();
            expect(mockedFetchTournaments).not.toHaveBeenCalled();
        });

        it('should handle invalid JSON in localStorage', async () => {
            localStorageMock.getItem.mockReturnValue('invalid json');

            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockResolvedValue(mockSports);
            mockedFetchTournaments.mockResolvedValue(mockTournaments);
            mockedTransformSportName.mockImplementation((name) => name);

            const result = await getData();

            expect(result).toEqual({
                matches: mockMatches,
                tournaments: mockTournaments,
                sports: mockSports,
            });
            expect(localStorageMock.setItem).toHaveBeenCalledWith('data', JSON.stringify(result));
        });
    });

    describe('when data does not exist in localStorage', () => {
        it('should fetch data from APIs and transform sport names', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockResolvedValue(mockSports);
            mockedFetchTournaments.mockResolvedValue(mockTournaments);
            mockedTransformSportName.mockImplementation((name) => name.toUpperCase());

            const result = await getData();

            expect(mockedFetchMatches).toHaveBeenCalled();
            expect(mockedFetchSports).toHaveBeenCalled();
            expect(mockedFetchTournaments).toHaveBeenCalled();
            expect(mockedTransformSportName).toHaveBeenCalledWith('Football');
            expect(mockedTransformSportName).toHaveBeenCalledWith('Basketball');

            expect(result).toEqual({
                matches: mockMatches,
                tournaments: mockTournaments,
                sports: mockSports.map(sport => ({
                    ...sport,
                    name: sport.name.toUpperCase(),
                })),
            });

            expect(localStorageMock.setItem).toHaveBeenCalledWith('data', JSON.stringify(result));
        });

        it('should handle API errors gracefully', async () => {
            localStorageMock.getItem.mockReturnValue(null);
            mockedFetchMatches.mockRejectedValue(new Error('Failed to fetch matches'));

            await expect(getData()).rejects.toThrow('Failed to fetch matches');

            expect(mockedFetchMatches).toHaveBeenCalled();
            expect(localStorageMock.setItem).not.toHaveBeenCalled();
        });

        it('should handle sports API errors', async () => {
            localStorageMock.getItem.mockReturnValue(null);
            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockRejectedValue(new Error('Failed to fetch sports'));

            await expect(getData()).rejects.toThrow('Failed to fetch sports');

            expect(mockedFetchMatches).toHaveBeenCalled();
            expect(mockedFetchSports).toHaveBeenCalled();
            expect(localStorageMock.setItem).not.toHaveBeenCalled();
        });

        it('should handle tournaments API errors', async () => {
            localStorageMock.getItem.mockReturnValue(null);
            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockResolvedValue(mockSports);
            mockedFetchTournaments.mockRejectedValue(new Error('Failed to fetch tournaments'));

            await expect(getData()).rejects.toThrow('Failed to fetch tournaments');

            expect(mockedFetchMatches).toHaveBeenCalled();
            expect(mockedFetchTournaments).toHaveBeenCalled();
            expect(mockedFetchSports).not.toHaveBeenCalled();
            expect(localStorageMock.setItem).not.toHaveBeenCalled();
        });
    });

    describe('data transformation', () => {
        it('should apply sport name transformation to all sports', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            const sportsWithCamelCase = [
                { id: 1, name: 'football' },
                { id: 2, name: 'basketball' },
                { id: 3, name: 'iceHockey' },
            ];

            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockResolvedValue(sportsWithCamelCase);
            mockedFetchTournaments.mockResolvedValue(mockTournaments);
            mockedTransformSportName.mockImplementation((name) => name.toUpperCase());

            const result = await getData();

            expect(mockedTransformSportName).toHaveBeenCalledTimes(3);
            expect(mockedTransformSportName).toHaveBeenCalledWith('football');
            expect(mockedTransformSportName).toHaveBeenCalledWith('basketball');
            expect(mockedTransformSportName).toHaveBeenCalledWith('iceHockey');

            expect(result.sports).toEqual([
                { id: 1, name: 'FOOTBALL' },
                { id: 2, name: 'BASKETBALL' },
                { id: 3, name: 'ICEHOCKEY' },
            ]);
        });
    });

    describe('cacheData function', () => {
        it('should store data in localStorage with correct key', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            mockedFetchMatches.mockResolvedValue(mockMatches);
            mockedFetchSports.mockResolvedValue(mockSports);
            mockedFetchTournaments.mockResolvedValue(mockTournaments);
            mockedTransformSportName.mockImplementation((name) => name);

            const result = await getData();

            expect(localStorageMock.setItem).toHaveBeenCalledWith('data', JSON.stringify(result));
        });
    });

    describe('edge cases', () => {
        it('should handle empty arrays from APIs', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            mockedFetchMatches.mockResolvedValue([]);
            mockedFetchSports.mockResolvedValue([]);
            mockedFetchTournaments.mockResolvedValue([]);

            const result = await getData();

            expect(result).toEqual({
                matches: [],
                tournaments: [],
                sports: [],
            });
        });

        it('should handle null/undefined values from APIs', async () => {
            localStorageMock.getItem.mockReturnValue(null);

            mockedFetchMatches.mockResolvedValue(null as unknown as typeof mockMatches);
            mockedFetchSports.mockResolvedValue(undefined as unknown as typeof mockSports);
            mockedFetchTournaments.mockResolvedValue([]);

            const result = await getData();

            expect(result).toEqual({
                matches: null,
                tournaments: [],
                sports: [],
            });
        });
    });
}); 