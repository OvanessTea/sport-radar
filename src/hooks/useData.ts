import { useState, useEffect } from 'react';
import { MatchType } from '@/types/match.type';
import { SportType } from '@/types/sport.type';
import { TournamentType } from '@/types/tournament.type';
import { getData } from '@/services/getData';

interface DataState {
    matches: MatchType[];
    tournaments: TournamentType[];
    sports: SportType[];
    isLoading: boolean;
    error: string | null;
}

export const useData = () => {
    const [data, setData] = useState<DataState>({
        matches: [],
        tournaments: [],
        sports: [],
        isLoading: true,
        error: null
    });

    const fetchData = async () => {
        try {
            setData(prev => ({ ...prev, isLoading: true, error: null }));
            const result = await getData();
            setData({
                matches: result.matches,
                tournaments: result.tournaments,
                sports: result.sports,
                isLoading: false,
                error: null
            });
        } catch (err) {
            setData(prev => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : 'Failed to fetch data'
            }));
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        ...data,
        refetch: fetchData
    };
}; 