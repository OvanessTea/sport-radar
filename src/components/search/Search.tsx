'use client';

import { IconSearch, IconX } from "@tabler/icons-react";
import { TextInput } from "@mantine/core";
import styles from "./Search.module.scss";
import { useState } from "react";

interface SearchProps {
    onSubmit: (search?: string) => void;
}

export const Search = ({onSubmit}: SearchProps) => {
    const [search, setSearch] = useState("");

    return (
        <div className={styles.search}>
            <TextInput
                className={styles.input}
                placeholder="Search for matches"
                leftSection={<IconSearch cursor="pointer" size={16} onClick={() => onSubmit(search)}/>}
                rightSection={search.length > 0 && (
                    <IconX cursor="pointer" size={16} onClick={() => {
                        setSearch('');
                        onSubmit();
                    }} />
                )}
                value={search}
                onChange={(e) => setSearch(e.target.value)} 
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        onSubmit(search);
                    }
                }}
            />
        </div>
    )
}