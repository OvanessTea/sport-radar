import { mockMatches } from '@/__mocks__/mockMatches';
import { byTournamentFilter } from '../by_tournament.filter';
import { mockTournaments } from '@/__mocks__/mockTournaments';

describe('byTournamentFilter', () => {
    it('should filter matches by tournament ID correctly', () => {
        const result = byTournamentFilter(mockMatches, [mockTournaments[1].id]);

        expect(result).toHaveLength(2);
        expect(result[0].tournamentId).toBe(2);
    });

    it('should return an empty array if no matches are found', () => {
        const result = byTournamentFilter(mockMatches, [mockTournaments[0].id]);

        expect(result).toHaveLength(0);
    });

    it('should return all matches when no tournaments are selected (All)', () => {
        const result = byTournamentFilter(mockMatches, []);

        expect(result).toHaveLength(mockMatches.length);
    });

    it('should filter matches by multiple tournaments', () => {
        const result = byTournamentFilter(mockMatches, [mockTournaments[1].id, mockTournaments[2].id]);

        expect(result.length).toBeGreaterThan(0);
        result.forEach(match => {
            expect([mockTournaments[1].id, mockTournaments[2].id]).toContain(match.tournamentId);
        });
    });

    it('should handle empty matches array', () => {
        const result = byTournamentFilter([], [mockTournaments[1].id]);

        expect(result).toHaveLength(0);
    });

    it('should return multiple matches if the tournament ID is found in multiple matches', () => {
        const result = byTournamentFilter(mockMatches, [mockTournaments[2].id]);

        expect(result).toHaveLength(2);
        expect(result[0].tournamentId).toBe(5);
        expect(result[1].tournamentId).toBe(5);
    });
    
});