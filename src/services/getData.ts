import { MatchType } from "@/types/match.type";
import { SportType } from "@/types/sport.type";
import { TournamentType } from "@/types/tournament.type";
import { fetchMatches, fetchSports, fetchTournaments } from "./api";

export const getData = async () => {
    if (localStorage.getItem('data')) {
        return JSON.parse(localStorage.getItem('data') || '{}');
    }
    const matches = await fetchMatches();   
    const tournaments = await fetchTournaments();
    const sports = await fetchSports();
    const data = {matches, tournaments, sports};
    cacheData(data);
    return data;
}

const cacheData = (data: {matches: MatchType[], tournaments: TournamentType[], sports: SportType[]}) => {
    localStorage.setItem('data', JSON.stringify(data));
}