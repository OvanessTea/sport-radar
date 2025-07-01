import { Button, Group } from '@mantine/core';
import { IconRefresh } from '@tabler/icons-react';
import styles from './ClearFilters.module.scss';

interface ClearFiltersProps {
    onClear: () => void;
    hasActiveFilters: boolean;
}

export const ClearFilters = ({ onClear, hasActiveFilters }: ClearFiltersProps) => {
    if (!hasActiveFilters) return null;

    return (
        <Group className={styles.clearFilters}>
            <Button
                variant="subtle"
                size="sm"
                leftSection={<IconRefresh size={16} />}
                onClick={onClear}
                color="gray"
            >
                Clear filters
            </Button>
        </Group>
    );
}; 