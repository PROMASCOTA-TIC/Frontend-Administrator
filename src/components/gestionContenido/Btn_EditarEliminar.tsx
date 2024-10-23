import { Box } from '@mui/material'
import React from 'react'
import BotonEditar from './botones/BotonEditar'
import BotonEliminar from './botones/BotonEliminar'

const Btn_EditarEliminar = () => {
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
            <BotonEditar
                link="https://example.com"
            />
            <BotonEliminar
                link="https://example.com"
            />
        </Box>
    )
}

export default Btn_EditarEliminar