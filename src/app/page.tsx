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
import { Alert, AppShell, Container, Loader, Drawer, ActionIcon, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAlertCircle, IconMenu2 } from '@tabler/icons-react';
import { Matches } from '@/components/matches/Matches';
import { ClearFilters } from '@/components/filters/ClearFilters';

export default function HomePage() {
	const [filteredMatches, setFilteredMatches] = useState<MatchType[]>([]);
	const [selectedSport, setSelectedSport] = useState<string>('all');
	const [selectedTournament, setSelectedTournament] = useState<TournamentType>({ id: 99, name: 'all', sportId: 99 });
	const [availableTournaments, setAvailableTournaments] = useState<TournamentType[]>([]);
	const [drawerOpened, setDrawerOpened] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const isMobile = useMediaQuery('(max-width: 768px)', false) ?? false;

	const { matches, tournaments, sports, isLoading, error } = useData();

	useEffect(() => {
		handleMatches();
	}, [selectedSport, selectedTournament]);

	useEffect(() => {
		setSelectedTournament({ id: 99, name: 'all', sportId: 99 });
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

	const clearFilters = () => {
		setSelectedSport('all');
		setSelectedTournament({ id: 99, name: 'all', sportId: 99 });
		setSearchQuery('');
		handleMatches();
	}

	const hasActiveFilters = () => {
		return (
			selectedSport !== 'all' ||
			selectedTournament.name !== 'all' ||
			searchQuery !== ''
		);
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
			{!isMobile && (
				<AppShell.Navbar p="md">
					<Sidebar setSelectedTab={setSelectedSport} selectedTab={selectedSport || 'all'} />
				</AppShell.Navbar>
			)}

			<AppShell.Main>
				<Container size="lg" className={styles.container}>
					{isMobile && !drawerOpened && (
						<ActionIcon
							variant="subtle"
							size="lg"
							color="dark.5"
							onClick={() => setDrawerOpened(true)}
							className={styles.menuButton}
						>
							<IconMenu2 size={24} />
						</ActionIcon>
					)}
					<Search onSubmit={handleMatches} setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
					<Group 
						justify="space-between" 
						align="flex-start" 
					>
						<Tournaments
							selectedTournament={selectedTournament}
							setSelectedTournament={setSelectedTournament}
							availableTournaments={availableTournaments}
						/>
						<ClearFilters
							onClear={clearFilters}
							hasActiveFilters={hasActiveFilters()}
						/>
					</Group>
					<Matches matches={filteredMatches} />
				</Container>
			</AppShell.Main>

			<Drawer
				opened={drawerOpened && isMobile}
				onClose={() => setDrawerOpened(false)}
				size="285px"
				title="Sports"
				hiddenFrom="sm"
				zIndex={2000}
			>
				<Sidebar
					setSelectedTab={setSelectedSport}
					selectedTab={selectedSport || 'all'}
					onTabChange={() => setDrawerOpened(false)}
				/>
			</Drawer>
		</AppShell>

	);
} 	