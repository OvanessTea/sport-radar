import { mockMatches } from "@/__mocks__/mockMatches";
import { mockSports } from "@/__mocks__/mockSports";
import { mockTournaments } from "@/__mocks__/mockTournaments";
import { refreshData } from "../refreshData";

describe('refreshData', () => {
    it('should return all matches when no filters are applied', async () => {
        const result = await refreshData(mockMatches, [], [], '', mockSports, mockTournaments);
        expect(result).toEqual(mockMatches);
    });

    it('should return filtered matches when sport filter is applied', async () => {
        const result = await refreshData(mockMatches, ['Basketball'], [], '', mockSports, mockTournaments);
        expect(result).toHaveLength(2);
    });

    it('should return filtered matches when tournament filter is applied', async () => {
        const result = await refreshData(mockMatches, [], [2], '', mockSports, mockTournaments);
        expect(result).toHaveLength(2);
    });

    it('should return filtered matches when search filter is applied', async () => {
        const result = await refreshData(mockMatches, [], [], 'Chicago Blackhawks', mockSports, mockTournaments);
        expect(result).toHaveLength(2);
    });

    it('should return filtered matches when multiple filters are applied', async () => {
        const result = await refreshData(mockMatches, ['Basketball'], [2], 'Denver Nuggets', mockSports, mockTournaments);
        expect(result).toHaveLength(1);
    });

    it('should return all matches when all filters are cleared', async () => {
        const result = await refreshData(mockMatches, [], [], '', mockSports, mockTournaments);
        expect(result).toEqual(mockMatches);
    });
});
