import { MatchType } from "@/types/match.type";
import { SportType } from "@/types/sport.type";
import { TournamentType } from "@/types/tournament.type";
import { bySportFilter } from "@/helpers/filters/by_sport.filter";
import { byTournamentFilter } from "@/helpers/filters/by_tournament.filter";

export const refreshData = async (
    matches: MatchType[], 
    selectedSports: string[], 
    selectedTournaments: number[], 
    search?: string,
    sports?: SportType[],
    tournaments?: TournamentType[]
) => {
    const filters = {
        sport: selectedSports,
        tournament: selectedTournaments,
        ...(search && { team: search }),
    }
    let result = [...matches];

    if (filters.sport.length === 0 && filters.tournament.length === 0 && filters.team === '') {
        return matches;
    }

    if (filters.sport.length > 0 && sports && tournaments) {
        result = bySportFilter(result, filters.sport, sports, tournaments);
    }

    if (filters.tournament.length > 0) {
        result = byTournamentFilter(result, filters.tournament);
    }

    if (filters.team) {
        result = result.filter(match =>
            match.home_team.toLowerCase().includes(filters.team!.toLowerCase()) ||
            match.away_team.toLowerCase().includes(filters.team!.toLowerCase())
        );
    }

    return result;
}