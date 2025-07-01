import { byTeamNameFilter } from '../by_team_name.filter';
import { mockMatches } from '@/__mocks__/mockMatches';

describe('byTeamNameFilter', () => {

    it('should filter matches by home team name correctly', () => {
        const result = byTeamNameFilter(mockMatches, 'Sacramento Kings');

        expect(result).toHaveLength(1);
        expect(result[0].home_team).toBe('Sacramento Kings');
    });

    it('should filter matches by away team name correctly', () => {
        const result = byTeamNameFilter(mockMatches, 'Philadelphia Flyers');

        expect(result).toHaveLength(1);
        expect(result[0].away_team).toBe('Philadelphia Flyers');
    });

    it('should return an empty array if no matches are found', () => {
        const result = byTeamNameFilter(mockMatches, 'Test Team');

        expect(result).toHaveLength(0);
    });

    it('should handle empty matches array', () => {
        const result = byTeamNameFilter([], 'Sacramento Kings');

        expect(result).toHaveLength(0);
    });

    it('should be case insensitive', () => {
        const result = byTeamNameFilter(mockMatches, 'sacRameNto kIngs');

        expect(result).toHaveLength(1);
        expect(result[0].home_team).toBe('Sacramento Kings');
    });

    it('should return multiple matches if the team name is found in multiple matches', () => {
        const result = byTeamNameFilter(mockMatches, 'Chicago Blackhawks');

        expect(result).toHaveLength(2);
        expect(result[0].home_team).toBe('Chicago Blackhawks');
        expect(result[1].away_team).toBe('Chicago Blackhawks');
    });

    it('should return all matches if team name is empty', () => {
        const result = byTeamNameFilter(mockMatches, '');

        expect(result).toHaveLength(mockMatches.length);
    });

    it('should handle partial team name', () => {
        const result = byTeamNameFilter(mockMatches, 'Chicago');

        expect(result).toHaveLength(2);
        expect(result[0].home_team).toBe('Chicago Blackhawks');
        expect(result[1].away_team).toBe('Chicago Blackhawks');
    });
});