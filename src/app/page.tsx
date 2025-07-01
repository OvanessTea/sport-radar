'use client';
import { Search } from '@/components/search/Search';
import { Sidebar } from '@/components/sidebar/Sidebar';
import { Tournaments } from '@/components/tournaments/Tournaments';
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
import { refreshData } from '@/services/refreshData';

export default function HomePage() {
	const [filteredMatches, setFilteredMatches] = useState<MatchType[]>([]);
	const [selectedSports, setSelectedSports] = useState<string[]>([]);
	const [selectedTournaments, setSelectedTournaments] = useState<number[]>([]);
	const [availableTournaments, setAvailableTournaments] = useState<TournamentType[]>([]);
	const [drawerOpened, setDrawerOpened] = useState(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const isMobile = useMediaQuery('(max-width: 768px)', false) ?? false;

	const { matches, tournaments, sports, isLoading, error } = useData();

	useEffect(() => {
		handleMatches();
	}, [selectedSports, selectedTournaments]);

	useEffect(() => {
		setSelectedTournaments([]);
		if (selectedSports.length === 0) {
			setAvailableTournaments(tournaments);
		} else {
			const selectedSportIds = sports
				.filter(sport => selectedSports.includes(sport.name))
				.map(sport => sport.id);
			setAvailableTournaments(tournaments.filter(tournament => selectedSportIds.includes(tournament.sportId)));
		}
	}, [selectedSports, tournaments, sports]);

	const handleMatches = async (search?: string) => {
		const result = await refreshData(matches, selectedSports, selectedTournaments, search);
		setFilteredMatches(result);
	}

	const clearFilters = () => {
		setSelectedSports([]);
		setSelectedTournaments([]);
		setSearchQuery('');
		handleMatches();
	}

	const hasActiveFilters = () => {
		return (
			selectedSports.length > 0 ||
			selectedTournaments.length > 0 ||
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
					<Sidebar availableSports={sports} setSelectedTabs={setSelectedSports} selectedTabs={selectedSports} />
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
							selectedTournaments={selectedTournaments}
							setSelectedTournaments={setSelectedTournaments}
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
				className={styles.drawer}
			>
				<Sidebar
					availableSports={sports}
					setSelectedTabs={setSelectedSports}
					selectedTabs={selectedSports}
				/>
			</Drawer>
		</AppShell>

	);
} 	