'use client';

import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useState } from 'react';

interface FilterOption {
    label: string;
    value: any;
}

interface Props {
    label: string;
    options: FilterOption[];
    onFilterChange: (value: any) => void;
    sx: string;
    md: string;
}

export const FilterSelector = ({ label, options, onFilterChange, sx, md }: Props) => {
    const [selectedValue, setSelectedValue] = useState(options[0]?.value || '');

    const handleChange = (event: { target: { value: any; }; }) => {
        const value = event.target.value;
        setSelectedValue(value);
        onFilterChange(value);
    };

    return (
        <Box
            sx={{
                width: { xs: sx, md: md },
                marginLeft: '21px',
            }}>
            <FormControl fullWidth>
                <InputLabel
                    id="filter-selector-label"
                    sx={{
                        marginTop: '-7px',
                    }}
                >
                    {label}
                </InputLabel>
                <Select
                    labelId="filter-selector-label"
                    value={selectedValue}
                    label={label}
                    onChange={handleChange}
                    sx={{
                        borderRadius: '15px',
                        height: '40px',
                    }}
                >

                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
