import { MatchType } from "@/types/match.type";
import { TournamentType } from "@/types/tournament.type";

export const byTournamentFilter = (matches: MatchType[], tournament: TournamentType) => {
    return matches.filter((match) => match.tournamentId === tournament.id);
}