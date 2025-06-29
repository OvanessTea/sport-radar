import styles from "./Tournaments.module.scss";
import { TournamentType } from "@/types/tournament.type";
import { Tabs } from "@mantine/core";

interface TournamentProps {
    selectedTournament: TournamentType;
    setSelectedTournament: (tournament: TournamentType) => void;
    availableTournaments: TournamentType[];
}

export const Tournaments = ({ selectedTournament, setSelectedTournament, availableTournaments }: TournamentProps) => {

    const handleTabChange = (value: string | null) => {
        setSelectedTournament(
            availableTournaments.find(tournament => tournament.name === value) || 
            {id: 99, name: 'all', sportId: 99}
        );
    }

    return (
        <Tabs 
            className={styles.tournaments} 
            value={selectedTournament?.name} 
            onChange={handleTabChange}
            variant="pills"
        >
            <Tabs.List className={styles.tabsList}>
                <Tabs.Tab 
                    className={`${styles.tab} ${selectedTournament?.name === 'all' ? styles.selected : ''}`} 
                    value="all"
                    onClick={() => setSelectedTournament({id: 99, name: 'all', sportId: 99})}
                >
                    <p className={styles.tournament__name}>All</p>
                </Tabs.Tab>
            {availableTournaments.map((tournament) => (
                <Tabs.Tab 
                key={tournament.id} 
                className={`${styles.tab} ${selectedTournament?.id === tournament.id ? styles.selected : ''}`} 
                value={tournament.name}
                >
                    <p className={styles.tournament__name}>{tournament.name}</p>
                    </Tabs.Tab>
                ))}
            </Tabs.List>
        </Tabs>
    )
}