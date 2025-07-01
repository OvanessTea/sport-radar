import styles from "./Tournaments.module.scss";
import { TournamentType } from "@/types/tournament.type";
import { Chip, ChipGroup } from "@mantine/core";

interface TournamentProps {
    selectedTournaments: number[];
    setSelectedTournaments: (tournamentIds: number[]) => void;
    availableTournaments: TournamentType[];
}

export const Tournaments = ({ selectedTournaments, setSelectedTournaments, availableTournaments }: TournamentProps) => {

    const handleTournamentChange = (value: string | string[]) => {
        const selectedValue = Array.isArray(value) ? value : [value];

        const tournamentIds = selectedValue.map(name => {
            if (name === 'all') return 0;
            const tournament = availableTournaments.find(t => t.name === name);
            return tournament?.id || 0;
        }).filter(id => id !== 0);

        setSelectedTournaments(tournamentIds);
    }

    return (
        <div className={styles.tournaments}>
            <div className={styles.tabsList}>
                <ChipGroup
                    value={selectedTournaments.length === 0 ? ['all'] : availableTournaments
                        .filter(t => selectedTournaments.includes(t.id))
                        .map(t => t.name)}
                    onChange={handleTournamentChange}
                    multiple={true}
                >
                    {availableTournaments.map((tournament) => (
                        <Chip
                            key={tournament.id}
                            value={tournament.name}
                            className={`${styles.tab} ${selectedTournaments.includes(tournament.id) ? styles.selected : ''}`}
                        >
                            <p className={styles.tournament__name}>{tournament.name}</p>
                        </Chip>
                    ))}
                </ChipGroup>
            </div>
        </div>
    )
}