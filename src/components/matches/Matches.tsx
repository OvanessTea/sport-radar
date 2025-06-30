import { MatchType } from "@/types/match.type";
import { Paper, Table } from "@mantine/core";
import styles from "./Matches.module.scss";
import { NotFound } from "../not-found/NotFound";
import { dateTransform } from "@/helpers/transform/date.transform";

interface MatchesProps {
    matches: MatchType[];
}

export const Matches = ({ matches }: MatchesProps) => {
    return (
        matches.length > 0 ? (<Paper withBorder className={styles.paper}>
            <Table highlightOnHover className={styles.table}>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th p="sm">Start Time</Table.Th>
                        <Table.Th p="sm">Status</Table.Th>
                        <Table.Th p="sm">Home Team</Table.Th>
                        <Table.Th p="sm">Away Team</Table.Th>
                        <Table.Th p="sm">Home Score</Table.Th>
                        <Table.Th p="sm">Away Score</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {matches.map(match => (
                        <Table.Tr key={match.id}>
                            <Table.Td p="sm">{dateTransform(match.start_time)}</Table.Td>
                            <Table.Td>{match.status.charAt(0).toUpperCase() + match.status.slice(1).toLowerCase()}</Table.Td>
                            <Table.Td p="sm">{match.home_team}</Table.Td>
                            <Table.Td p="sm">{match.away_team}</Table.Td>
                            <Table.Td p="sm">{match.home_score || "-"}</Table.Td>
                            <Table.Td p="sm">{match.away_score || "-"}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>
        </Paper>) : <NotFound />
    )
}