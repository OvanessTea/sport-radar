import { MatchType } from "@/types/match.type";
import { SportType } from "@/types/sport.type";
import { TournamentType } from "@/types/tournament.type";
import { fetchMatches, fetchSports, fetchTournaments } from "./api";
import { transformSportName } from "@/helpers/transform/sport_name.transform";

export const getData = async () => {
    try {
        const cachedData = localStorage.getItem('data');
        if (cachedData) {
            return JSON.parse(cachedData);
        }
    } catch {
        // Continue if parse fails
    }
    const matches = await fetchMatches();   
    const tournaments = await fetchTournaments();
    const sportsData = await fetchSports();
    const sports = sportsData ? sportsData.map((sport: SportType) => ({
      ...sport,
      name: transformSportName(sport.name)
    })) : [];
    const data = {matches, tournaments, sports};
    cacheData(data);
    return data;
}

const cacheData = (data: {matches: MatchType[], tournaments: TournamentType[], sports: SportType[]}) => {
    localStorage.setItem('data', JSON.stringify(data));
}