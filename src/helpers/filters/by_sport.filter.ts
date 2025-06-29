import { MatchType } from "@/types/match.type";
import { SportType } from "@/types/sport.type";
import { TournamentType } from "@/types/tournament.type";

export const bySportFilter = (matches: MatchType[], sport: SportType, tournaments: TournamentType[]) => {
    return matches.filter((match) => {
        const tournament = tournaments.find((tournament) => tournament.id === match.tournamentId);
        console.warn({tournament, sport});
        return sport.id === tournament?.sportId;
    });
}