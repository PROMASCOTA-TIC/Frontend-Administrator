"use client";

import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface PF_FiltroProps {
  onChangeCategory: (categoryId: string | null) => void;
  defaultCategory?: string;  // Nueva prop para definir la categoría por defecto
}

const PF_Filtro: React.FC<PF_FiltroProps> = ({ onChangeCategory, defaultCategory = "none" }) => {
  const [subCategoria, setSubCategoria] = React.useState(defaultCategory);  // Inicializar con la categoría por defecto

  const handleChange = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSubCategoria(value);
    onChangeCategory(value === "none" ? null : value);  // Llamar al callback con la categoría seleccionada
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '34px 34px 0px 0px' }}>
      <FormControl sx={{ minWidth: '250px' }} size="small">
        <InputLabel id="demo-simple-select-autowidth-label">Seleccione la categoría</InputLabel>
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={subCategoria}
          onChange={handleChange}
          autoWidth
          label="subcategoria"
          sx={{
            '& .MuiOutlinedInput-notchedOutline': { borderColor: '#004040' },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: '#004040' },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#004040' },
          }}
        >
          <MenuItem value="none">Todos</MenuItem>
          <MenuItem value="1">Publicar contenido</MenuItem>
          <MenuItem value="2">Registro y Cuenta</MenuItem>
          <MenuItem value="3">Compras y Pagos</MenuItem>
          <MenuItem value="4">Productos y Servicios</MenuItem>
          <MenuItem value="5">Soporte al Cliente</MenuItem>
          <MenuItem value="6">Seguridad y Privacidad</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default PF_Filtro;