"use client";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function EI_Filtro() {
    const [subCategoria, setSubCategoria] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setSubCategoria(event.target.value);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '34px 0px 0px 34px' }}>
                <FormControl sx={{ minWidth: '250px' }} size="small">
                    <InputLabel id="demo-simple-select-autowidth-label" >Seleccione la categoría</InputLabel>
                    <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="demo-simple-select-autowidth"
                        value={subCategoria}
                        onChange={handleChange}
                        autoWidth
                        label="subcategoria"
                        sx={{
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                borderColor: '#004040',
                            },
                        }}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={0}>Higiene</MenuItem>
                        <MenuItem value={1}>Salud</MenuItem>
                        <MenuItem value={2}>Adiestramiento</MenuItem>
                        <MenuItem value={3}>Nutrición</MenuItem>
                        <MenuItem value={3}>Seguridad</MenuItem>
                        <MenuItem value={4}>Actividades</MenuItem>
                    </Select>
                </FormControl>
            </div>
        </div>
    );
}