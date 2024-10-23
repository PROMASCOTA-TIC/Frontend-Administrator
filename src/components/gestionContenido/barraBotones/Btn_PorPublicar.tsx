"use client";

import { Box } from '@mui/material'
import React from 'react'
import BotonEditar from '../botones/BotonEditar'
import BotonEliminar from '../botones/BotonEliminar'
import BotonCheck from '../botones/BotonCheck'

const Btn_PorPublicar = () => {

    const handleDelete = () => {
        console.log('Elemento eliminado');
        // Aquí puedes agregar la lógica para eliminar el elemento (por ejemplo, llamada a la API)
    };

    return (
        <Box
            className='flex-center'
            sx={{
                gap: {
                    xs: '15px',   // Gap para pantallas extra pequeñas
                    md: '100px',
                },
            }}
        >
            <BotonCheck mensaje="Enlace de interés publicado con éxito." />

            <BotonEditar
                link="https://example.com"
            />
            
            <BotonEliminar onConfirm={handleDelete} />
        </Box>
    )
}

export default Btn_PorPublicar