import { Box } from '@mui/material'
import React from 'react'
import BotonAzul from './botones/BotonAzul'

const Btn_GuardarCancelar = () => {
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
            <BotonAzul
                name="Guardar"
                link="https://example.com"
            />

            <BotonAzul
                name="Cancelar"
                link="https://example.com"
            />
        </Box>
    )
}

export default Btn_GuardarCancelar