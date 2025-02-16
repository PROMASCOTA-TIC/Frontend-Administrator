"use client";

import { Box } from '@mui/material';
import React, { FC } from 'react';
import BotonEditar from '../botones/BotonEditar';
import BotonEliminar from '../botones/BotonEliminar';

interface BtnEditarEliminarProps {
    id: string; // ID del artículo
    linkEditar: string; // Ruta de la página de edición
    endpointEliminar: string; // Endpoint para la eliminación
    redirectPath: string; // Ruta a redirigir después de eliminar
}

const Btn_EditarEliminar: FC<BtnEditarEliminarProps> = ({ id, linkEditar, endpointEliminar, redirectPath }) => {

    return (
        <Box
            className='flex-center'
            sx={{
                gap: {
                    xs: '15px',   // Espaciado para pantallas pequeñas
                    md: '100px',  // Espaciado para pantallas grandes
                },
            }}
        >
            {/* Botón para editar */}
            <BotonEditar link={linkEditar} />

            {/* Botón para eliminar */}
            <BotonEliminar
                id={id} // ID del artículo a eliminar
                endpointEliminar={endpointEliminar} // Endpoint para eliminar
                redirectPath={redirectPath} // Ruta donde redirige después de eliminar
            />
        </Box>
    );
};

export default Btn_EditarEliminar;