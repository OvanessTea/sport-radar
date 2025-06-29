import { MatchType } from "@/types/match.type";

export const byTeamNameFilter = (matches: MatchType[], teamName: string) => {
    return matches.filter((match) =>
        match.home_team.toLowerCase().includes(teamName.toLowerCase()) ||
        match.away_team.toLowerCase().includes(teamName.toLowerCase())
    );
}