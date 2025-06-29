import { Container, Stack, Text, ThemeIcon } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import styles from "./NotFound.module.scss"

export const NotFound = () => {
    return (
        <Container size="sm" className={styles.noMatchesContainer}>
        <Stack align="center" gap="lg">
            <div className={styles.illustrationContainer}>
                <ThemeIcon size={80} radius="xl" variant="light" color="gray">
                    <IconSearch size={40} />
                </ThemeIcon>
            </div>
            <Stack gap="xs" align="center">
                <Text size="xl" fw={600} c="dimmed">
                    No matches found
                </Text>
                <Text size="sm" c="dimmed" ta="center">
                    Try adjusting your search criteria or filters to find what you&apos;re looking for
                </Text>
            </Stack>
        </Stack>
    </Container>   
    )
}