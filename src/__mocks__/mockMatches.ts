import { MatchType } from "@/types/match.type";

export const mockMatches: MatchType[] = [
    {
        "id": 1,
        "tournamentId": 2,
        "start_time": "2022-02-06T03:10:38Z",
        "status": "COMPLETED",
        "home_team": "Sacramento Kings",
        "away_team": "Oklahoma City Thunder",
        "home_score": "113",
        "away_score": "103"
    },
    {
        "id": 3,
        "tournamentId": 2,
        "start_time": "2023-04-06T20:41:04Z",
        "status": "SCHEDULED",
        "home_team": "Denver Nuggets",
        "away_team": "Brooklyn Nets"
    },
    {
        "id": 4,
        "tournamentId": 5,
        "start_time": "2023-02-06T20:41:47Z",
        "status": "Live",
        "home_team": "Detroit Redwings",
        "away_team": "Los Angeles Kings",
        "home_score": "1",
        "away_score": "1"
    },
    {
        "id": 5,
        "tournamentId": 5,
        "start_time": "2022-02-06T20:42:13Z",
        "status": "COMPLETED",
        "home_team": "Chicago Blackhawks",
        "away_team": "Philadelphia Flyers",
        "home_score": "3",
        "away_score": "5"
    },
    {
        "id": 6,
        "tournamentId": 6,
        "start_time": "2022-02-08T20:42:13Z",
        "status": "COMPLETED",
        "home_team": "Los Angeles Kings",
        "away_team": "Chicago Blackhawks",
        "home_score": "2",
        "away_score": "3"
    }
];