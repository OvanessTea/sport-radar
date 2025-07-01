import { mockMatches } from '@/__mocks__/mockMatches';
import { mockSports } from '@/__mocks__/mockSports';
import { mockTournaments } from '@/__mocks__/mockTournaments';
import { bySportFilter } from '../by_sport.filter'; 
import { MatchType } from '@/types/match.type';

describe('bySportFilter', () => {
    it('should filter matches by sport correctly', () => {
        const result = bySportFilter(mockMatches, [mockSports[1].name], mockSports, mockTournaments);

        expect(result).toHaveLength(2);
        expect(result[0].id).toBe(1);
        expect(result[0].tournamentId).toBe(2);
    });

    it('should return an empty array if no matches are found', () => {
        const result = bySportFilter(mockMatches, [mockSports[0].name], mockSports, mockTournaments);

        expect(result).toHaveLength(0);
    });

    it('should return all matches when no sports are selected (All)', () => {
        const result = bySportFilter(mockMatches, [], mockSports, mockTournaments);

        expect(result).toHaveLength(mockMatches.length);
    });

    it('should filter matches by multiple sports', () => {
        const result = bySportFilter(mockMatches, [mockSports[1].name, mockSports[2].name], mockSports, mockTournaments);

        expect(result.length).toBeGreaterThan(0);
        
        result.forEach(match => {
            const tournament = mockTournaments.find(t => t.id === match.tournamentId);
            const sport = mockSports.find(s => s.id === tournament?.sportId);
            expect([mockSports[1].name, mockSports[2].name]).toContain(sport?.name);
        });
    });

    it('should handle matches with non-existent tournamentId', () => {
        const mockData: MatchType[] = [
            {
                "id": 6,
                "tournamentId": 999,
                "start_time": "2022-02-06T20:42:13Z",
                "status": "COMPLETED",
                "home_team": "Chicago Blackhawks",
                "away_team": "Philadelphia Flyers",
                "home_score": "3",
                "away_score": "5"
            }
        ]

        const result = bySportFilter(mockData, [mockSports[1].name], mockSports, mockTournaments);

        expect(result).toHaveLength(0);
    });

    it('should handle empty matches array', () => {
        const result = bySportFilter([], [mockSports[1].name], mockSports, mockTournaments);

        expect(result).toHaveLength(0);
    });

    it('should handle empty tournaments array', () => {
        const result = bySportFilter(mockMatches, [mockSports[1].name], mockSports, []);

        expect(result).toHaveLength(0);
    });
})