'use client';

import { IconSearch, IconX } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import styles from "./Search.module.scss";

interface SearchProps {
    searchQuery: string;
    setSearchQuery: (search: string) => void;
    onSubmit: (search?: string) => void;
}

export const Search = ({ onSubmit, setSearchQuery, searchQuery }: SearchProps) => {

    const handleSearch = (search?: string) => {
        onSubmit(search);
    };

    return (
        <div className={styles.search}>
            <TextInput
                className={styles.input}
                placeholder="Search for matches"
                leftSection={<IconSearch cursor="pointer" size={16} onClick={() => handleSearch(searchQuery)} />}
                rightSection={searchQuery.length > 0 && (
                    <IconX cursor="pointer" size={16} onClick={() => {
                        setSearchQuery('');
                        handleSearch();
                    }} />
                )}
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(searchQuery);
                    }
                }}
            />
        </div>
    )
}