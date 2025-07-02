import { mockMatches } from '@/__mocks__/mockMatches';
import { mockSports } from '@/__mocks__/mockSports';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { fetchMatches, fetchSports, fetchTournaments } from '../api';

global.fetch = jest.fn();

describe('API Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchSports', () => {
        it('should fetch sports successfully', async () => {

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockSports,
            });

            const result = await fetchSports();

            expect(fetch).toHaveBeenCalledWith('https://3209glbex9.execute-api.eu-north-1.amazonaws.com/sport/all');
            expect(result).toEqual(mockSports);
        });

        it('should throw an error when response is not ok', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
            });

            await expect(fetchSports()).rejects.toThrow('Failed to fetch sports');
        });

        it('should throw an error when fetch fails', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchSports()).rejects.toThrow('Network error');
        });
    });

    describe('fetchMatches', () => {
        it('should fetch matches successfully', async () => {

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockMatches,
            });

            const result = await fetchMatches();

            expect(fetch).toHaveBeenCalledWith('https://3209glbex9.execute-api.eu-north-1.amazonaws.com/match/all');
            expect(result).toEqual(mockMatches);
        });

        it('should throw an error when response is not ok', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
            });

            await expect(fetchMatches()).rejects.toThrow('Failed to fetch matches');
        });

        it('should throw an error when fetch fails', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchMatches()).rejects.toThrow('Network error');
        });
    });

    describe('fetchTournaments', () => {
        it('should fetch tournaments successfully', async () => {

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockTournaments,
            });

            const result = await fetchTournaments();

            expect(fetch).toHaveBeenCalledWith('https://3209glbex9.execute-api.eu-north-1.amazonaws.com/tournament/all');
            expect(result).toEqual(mockTournaments);
        });

        it('should throw an error when response is not ok', async () => {
            (fetch as jest.Mock).mockResolvedValue({
                ok: false,
                status: 500,
            });

            await expect(fetchTournaments()).rejects.toThrow('Failed to fetch tournaments');
        });

        it('should throw an error when fetch fails', async () => {
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            await expect(fetchTournaments()).rejects.toThrow('Network error');
        });
    });
});