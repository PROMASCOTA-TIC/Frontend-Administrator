"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete } from '@mui/icons-material';

interface BotonEliminarProps {
    onConfirm: () => void;
}

const BotonEliminar: React.FC<BotonEliminarProps> = ({ onConfirm }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen} // Este evento abre el diálogo de confirmación
                sx={{
                    width: 'auto',
                    height: { xs: '40px', md: '50px' },
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '8px 12px',
                }}
            >
                <Delete />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='bg-primary txtcolor-white p-13' >{"Confirmar Eliminación"}</DialogTitle>
                <DialogContent style={{ padding: '0px' }}>
                    <DialogContentText id="alert-dialog-description" className='txtcolor-black txt-justify n-bold p-21'>
                        ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex-center p-13' style={{ gap: '34px' }}>
                    <Button onClick={handleConfirm} autoFocus className='bg-secondary txtcolor-white'>
                        Eliminar
                    </Button>
                    <Button onClick={handleClose} className='bg-primary txtcolor-white' style={{ margin: '0px' }}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BotonEliminar;