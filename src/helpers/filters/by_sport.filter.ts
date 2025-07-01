import { MatchType } from "@/types/match.type";
import { SportType } from "@/types/sport.type";
import { TournamentType } from "@/types/tournament.type";

export const bySportFilter = (matches: MatchType[], selectedSports: string[], sports: SportType[], tournaments: TournamentType[]) => {
    if (selectedSports.length === 0) {
        return matches;
    }

    return matches.filter((match) => {
        const tournament = tournaments.find((tournament) => tournament.id === match.tournamentId);
        if (!tournament) return false;
        
        const sport = sports.find((sport) => sport.id === tournament.sportId);
        if (!sport) return false;
        
        return selectedSports.includes(sport.name);
    });
}