'use client';

import { IconSearch, IconX } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import styles from "./Search.module.scss";
import { useState } from "react";

interface SearchProps {
    onSubmit: (search?: string) => void;
}

export const Search = ({ onSubmit }: SearchProps) => {
    const [search, setSearch] = useState("");

    const handleSearch = (search?: string) => {
        onSubmit(search);
    };

    return (
        <div className={styles.search}>
            <TextInput
                className={styles.input}
                placeholder="Search for matches"
                leftSection={<IconSearch cursor="pointer" size={16} onClick={() => handleSearch(search)} />}
                rightSection={search.length > 0 && (
                    <IconX cursor="pointer" size={16} onClick={() => {
                        setSearch('');
                        handleSearch();
                    }} />
                )}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleSearch(search);
                    }
                }}
            />
        </div>
    )
}