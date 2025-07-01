import { MatchType } from "@/types/match.type";

export const byTournamentFilter = (matches: MatchType[], selectedTournamentIds: number[]) => {
    if (selectedTournamentIds.length === 0) {
        return matches;
    }

    return matches.filter((match) => selectedTournamentIds.includes(match.tournamentId));
}