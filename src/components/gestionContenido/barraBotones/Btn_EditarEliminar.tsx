"use client";

import { Box } from '@mui/material'
import React, { FC } from 'react'
import BotonEditar from '../botones/BotonEditar'
import BotonEliminar from '../botones/BotonEliminar'

{/********************** REVISAR LOGICA DE ESTE LINK ***************************/}

interface BtnEditarEliminarProps {
    linkEditar: string;
}

const Btn_EditarEliminar: FC<BtnEditarEliminarProps> = ({ linkEditar }) => {

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
            <BotonEditar link={linkEditar} />
            
            {/********************** REVISAR LOGICA DE ESTE LINK ***************************/}
            <BotonEliminar onConfirm={handleDelete} />
        </Box>
    )
}

export default Btn_EditarEliminar