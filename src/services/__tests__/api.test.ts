import { fetchMatches, fetchSports, fetchTournaments } from '../api';

global.fetch = jest.fn();

describe('API Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('fetchSports', () => {
        it('should fetch sports successfully', async () => {
            const mockSports = [
                { id: 1, name: 'Football' },
                { id: 2, name: 'Basketball' },
            ];

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockSports,
            });

            const result = await fetchSports();

            expect(fetch).toHaveBeenCalledWith('/api/sport/all');
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
            const mockMatches = [
                {
                    id: 1,
                    tournamentId: 2,
                    start_time: "2022-02-06T03:10:38Z",
                    status: "COMPLETED",
                    home_team: "Sacramento Kings",
                    away_team: "Oklahoma City Thunder",
                    home_score: "113",
                    away_score: "103"
                }
            ];

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockMatches,
            });

            const result = await fetchMatches();

            expect(fetch).toHaveBeenCalledWith('/api/match/all');
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
            const mockTournaments = [
                {
                    id: 1,
                    sportId: 1,
                    name: "UEFA Champions league"
                }
            ];

            (fetch as jest.Mock).mockResolvedValue({
                ok: true,
                json: async () => mockTournaments,
            });

            const result = await fetchTournaments();

            expect(fetch).toHaveBeenCalledWith('/api/tournament/all');
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