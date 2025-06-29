'use client';
import { TournamentType } from '@/types/tournament.type';
import { MatchType } from '@/types/match.type';
import { SportType } from '@/types/sport.type';
import { useEffect, useState } from 'react';
import { fetchMatches, fetchSports, fetchTournaments } from '@/services/api';

export default function HomePage() {

    const [tournaments, setTournaments] = useState<TournamentType[]>([]);
    const [matches, setMatches] = useState<MatchType[]>([]);
    const [sports, setSports] = useState<SportType[]>([]);

    const handleFetchTournaments = () => {
      fetchTournaments().then((data: TournamentType[]) => setTournaments(data));
    }

    const handleFetchSports = () => {
        fetchSports().then((data: SportType[]) => setSports(data));
    }

    const handleFetchMatches = () => {
        fetchMatches().then((data: MatchType[]) => setMatches(data));
    }

    useEffect(() => {
        handleFetchTournaments();
        handleFetchSports();
        handleFetchMatches();
    }, []);

  return (
    <div>
      <button onClick={() => {
        handleFetchTournaments();
      }}>Tournaments</button>
      <button onClick={() => {
        handleFetchSports();
      }}>Sports</button>
      <button onClick={() => {
        handleFetchMatches();
      }}>Matches</button>
      <h1>{tournaments.map(tournament => tournament.name).join(', ')}</h1>
      <h1>{sports.map(sport => sport.name).join(', ')}</h1>
      <h1>{matches.map(match => match.home_team).join(', ')}</h1>
    </div>
  );
} 