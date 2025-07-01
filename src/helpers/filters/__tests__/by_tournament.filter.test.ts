import { mockMatches } from '@/__mocks__/mockMatches';
import { byTournamentFilter } from '../by_tournament.filter';
import { mockTournaments } from '@/__mocks__/mockTournaments';

describe('byTournamentFilter', () => {
    it('should filter matches by tournament name correctly', () => {
        const result = byTournamentFilter(mockMatches, mockTournaments[1]);

        expect(result).toHaveLength(1);
        expect(result[0].tournamentId).toBe(2);
    });

    it('should return an empty array if no matches are found', () => {
        const result = byTournamentFilter(mockMatches, mockTournaments[0]);

        expect(result).toHaveLength(0);
    });

    it('should handle empty matches array', () => {
        const result = byTournamentFilter([], mockTournaments[1]);

        expect(result).toHaveLength(0);
    });

    it('should return multiple matches if the tournament name is found in multiple matches', () => {
        const result = byTournamentFilter(mockMatches, mockTournaments[2]);

        expect(result).toHaveLength(2);
        expect(result[0].tournamentId).toBe(5);
        expect(result[1].tournamentId).toBe(5);
    });
    
});