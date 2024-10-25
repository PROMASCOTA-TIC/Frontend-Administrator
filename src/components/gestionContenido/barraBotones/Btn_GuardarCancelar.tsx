import { Box } from '@mui/material';
import React, { FC } from 'react';
import BotonAzul from '../botones/BotonAzul';

interface Btn_GuardarCancelarProps {
    linkGuardar: string;
    linkCancelar: string;
}

const Btn_GuardarCancelar: FC<Btn_GuardarCancelarProps> = ({ linkGuardar, linkCancelar }) => {
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
            <BotonAzul
                name="Guardar"
                link={linkGuardar}
            />

            <BotonAzul
                name="Cancelar"
                link={linkCancelar}
            />
        </Box>
    );
}

export default Btn_GuardarCancelar;