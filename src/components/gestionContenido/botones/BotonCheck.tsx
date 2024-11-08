"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Check } from '@mui/icons-material';

interface BotonCheckProps {
    mensaje: string;  // Definimos la prop mensaje
}

const BotonCheck: React.FC<BotonCheckProps> = ({ mensaje }) => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true); // Abrir Snackbar al hacer clic
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false); // Cerrar Snackbar
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClick} // Agregamos el evento onClick aquí
                sx={{
                    width: 'auto', // Ajusta el ancho según el tamaño de pantalla
                    height: { xs: '40px', md: '50px' },
                    backgroundColor: 'green',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '8px 12px',
                }}
            >
                <Check />
            </Button>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleClose}
                    className="n-bold txt-center"
                    severity="success"
                    sx={{
                        width: '100%',
                    }}
                >
                    {mensaje} {/* Usamos el prop mensaje aquí */}
                </Alert>
            </Snackbar>
        </>
    );
};

export default BotonCheck;