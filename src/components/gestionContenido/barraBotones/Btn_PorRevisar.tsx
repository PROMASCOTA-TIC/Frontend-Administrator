"use client";

import { Box } from '@mui/material';
import React, { FC } from 'react';
import BotonEditar from '../botones/BotonEditar';
import BotonEliminar from '../botones/BotonEliminar';
import BotonCheck from '../botones/BotonCheck';

{/************************************* REVISAR LOGICA DE ESTE BOTON *********************/}
{/************************************* REVISAR LOGICA DE ESTE BOTON *********************/}
{/************************************* REVISAR LOGICA DE ESTE BOTON *********************/}

interface Btn_PorRevisarProps {
    link: string;
}

const Btn_PorRevisar: FC<Btn_PorRevisarProps> = ({ link }) => {

    const handleDelete = () => {
        console.log('Elemento eliminado');
        // Aquí puedes agregar la lógica para eliminar el elemento (por ejemplo, llamada a la API)
    };

    return (
        <Box
            className="flex-center"
            sx={{
                gap: {
                    xs: '15px',   // Gap para pantallas extra pequeñas
                    md: '100px',
                },
            }}
        >
            <BotonCheck mensaje="Enlace de interés publicado con éxito." />

            {/* Pasamos el link recibido como prop */}
            <BotonEditar link={link} />

            {/************************************* REVISAR LOGICA DE ESTE BOTON *********************/}
            <BotonEliminar onConfirm={handleDelete} />
        </Box>
    );
};

export default Btn_PorRevisar;