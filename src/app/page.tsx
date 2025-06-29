'use client';
import { Search } from '@/components/search/Search';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Tournaments } from '@/components/tournaments/Tournaments';
import { bySportFilter } from '@/helpers/filters/by_sport.filter';
import { useData } from '@/hooks/useData';
import { MatchType } from '@/types/match.type';
import { TournamentType } from '@/types/tournament.type';
import { useEffect, useState } from 'react';
import styles from "./main.module.scss";
import { Alert, AppShell, Container, Loader } from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { Matches } from '@/components/matches/Matches';

export default function HomePage() {
	const [filteredMatches, setFilteredMatches] = useState<MatchType[]>([]);
	const [selectedSport, setSelectedSport] = useState<string>('all');
	const [selectedTournament, setSelectedTournament] = useState<TournamentType>({ id: 99, name: 'all', sportId: 99 });
	const [availableTournaments, setAvailableTournaments] = useState<TournamentType[]>([]);

	const { matches, tournaments, sports, isLoading, error } = useData();

	useEffect(() => {
		handleMatches();
	}, [selectedSport, selectedTournament]);

	useEffect(() => {
		setSelectedTournament({ id: 99, name: 'all', sportId: 99 });
		console.log(selectedSport, tournaments, sports);
		if (selectedSport === 'all') {
			setAvailableTournaments(tournaments);
		} else {
			const sport = sports.find(sport => sport.name === selectedSport);
			if (sport) {
				setAvailableTournaments(tournaments.filter(tournament => tournament.sportId === sport.id));
			}
		}
	}, [selectedSport, tournaments, sports]);

	const handleMatches = async (search?: string) => {
		const filters = {
			sport: selectedSport,
			tournament: selectedTournament,
			...(search && { team: search }),
		}
		let result = [...matches];

		if (filters.sport === 'all' && filters.team === '') {
			setFilteredMatches(matches);
			return;
		}

		if (filters.sport !== 'all') {
			const sport = sports.find(sport => sport.name === filters.sport);
			if (sport) {
				result = bySportFilter(result, sport, tournaments);
			}
		}

		if (filters.tournament.name !== 'all') {
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

	if (isLoading) {
		return (
			<div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
				<Loader color="blue" size="lg" />
			</div>
		);
	}

	if (error) {
		return (
			<Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
				{error}
			</Alert>
		);
	}

	return (
		<AppShell
			navbar={{ width: 285, breakpoint: 'sm' }}
			withBorder={false}
			padding="md"
			className={styles.wrapper}
		>
			<AppShell.Navbar p="md">
				<Sidebar setSelectedTab={setSelectedSport} selectedTab={selectedSport || 'all'} />
			</AppShell.Navbar>

			<AppShell.Main>
				<Container size="lg" className={styles.container}>
					<Search onSubmit={handleMatches} />
					<Tournaments
						selectedTournament={selectedTournament}
						setSelectedTournament={setSelectedTournament}
						availableTournaments={availableTournaments}
					/>
					<Matches matches={filteredMatches} />
				</Container>
			</AppShell.Main>
		</AppShell>

	);
} 	