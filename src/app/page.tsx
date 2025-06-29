'use client';
import { useData } from '@/hooks/useData';

export default function HomePage() {
    // const [filteredMatches, setFilteredMatches] = useState<MatchType[]>([]);
    // const [selectedSport, setSelectedSport] = useState<SportType | null>(null);
    // const [selectedTournament, setSelectedTournament] = useState<TournamentType | null>(null);
    // const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    
    const {matches, tournaments, sports, isLoading, error} = useData(); 

    // Show loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Show error state
    if (error) {
        return <div>Error: {error}</div>;
    }

  return (
    <div>
      {/* <select onChange={(e) => {
        setSelectedSport(sports.find(sport => sport.name === e.target.value) || null);
      }}>
        {sports.map(sport => <option key={sport.id} value={sport.name}>{sport.name}</option>)}
      </select>
      <select onChange={(e) => {
        setSelectedTournament(tournaments.find(tournament => tournament.name === e.target.value) || null);
      }}>
        {tournaments.map(tournament => <option key={tournament.id} value={tournament.name}>{tournament.name}</option>)}
      </select>
      <input type="text" onChange={(e) => {
        setSelectedTeam(e.target.value);
      }} /> */}
      <div>
        {matches.map(match => (
          <div key={match.id}>
            <h1>{match.home_team} - {match.away_team}</h1>
            <h1>{match.home_score} - {match.away_score}</h1>
            <h1>{match.start_time}</h1>
            <h1>{match.status}</h1>
          </div>
        ))}
      </div>
    </div>
  );
} 