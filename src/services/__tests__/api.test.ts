import { fetchSports } from '../api';

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
    });
});