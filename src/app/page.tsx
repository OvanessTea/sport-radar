'use client';
import { Search } from '@/components/search/Search';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { bySportFilter } from '@/helpers/filters/by_sport.filter';
import { useData } from '@/hooks/useData';
import { MatchType } from '@/types/match.type';
import { TournamentType } from '@/types/tournament.type';
import { useEffect, useState } from 'react';
import styles from "./main.module.scss";

export default function HomePage() {
  const [filteredMatches, setFilteredMatches] = useState<MatchType[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [selectedTournament, setSelectedTournament] = useState<TournamentType | null>(null);

  const { matches, tournaments, sports, isLoading, error } = useData();

  useEffect(() => {
    handleMatches();
  }, [selectedSport, selectedTournament]);

  useEffect(() => {
    setSelectedTournament(null);
  }, [selectedSport]);

  const handleMatches = async (search?: string) => {
    const filters = {
      sport: selectedSport,
      tournament: selectedTournament,
      ...(search && { team: search }),
    }
    let result = [...matches];

    if (filters.sport === 'all' && filters.tournament === null && filters.team === '') {
      setFilteredMatches(matches);
      return;
    }

    if (filters.sport !== 'all') {
      const sport = sports.find(sport => sport.name === filters.sport);
      if (sport) {
        result = bySportFilter(result, sport, tournaments);
      }
    }

    if (filters.tournament) {
      result = result.filter(match => {
        const tournament = tournaments.find(t => t.id === match.tournamentId);
        return tournament?.id === filters.tournament?.id;
      });
    }

    if (filters.team) {
      result = result.filter(match =>
        match.home_team.toLowerCase().includes(filters.team!.toLowerCase()) ||
        match.away_team.toLowerCase().includes(filters.team!.toLowerCase())
      );
    }
    setFilteredMatches(result);
  }

  // Show loading state
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      {sports.length > 0 && (
        <Sidebar setSelectedTab={setSelectedSport} selectedTab={selectedSport || 'all'} />
      )}

      <div className={styles.content}>
        <Search onSubmit={handleMatches} />
        {filteredMatches.length > 0 && (
          <div>
            {filteredMatches.map(match => (
              <div key={match.id}>{match.home_team} - {match.away_team}</div>
            ))}
          </div>
        )}
      </div>
    </div>

  );
} 