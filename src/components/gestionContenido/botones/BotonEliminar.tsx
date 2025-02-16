"use client";

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Delete } from '@mui/icons-material';
import { useRouter } from "next/navigation";

interface BotonEliminarProps {
    id: string;
    endpointEliminar: string;
    redirectPath: string; // Ruta a redirigir tras eliminar
}

const BotonEliminar: React.FC<BotonEliminarProps> = ({ id, endpointEliminar, redirectPath }) => {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter(); // Para redirigir después de eliminar

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        setIsLoading(true); // Muestra un estado de carga si es necesario
        try {
            const response = await fetch(`${endpointEliminar}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Error al eliminar el artículo");
            }

            setIsLoading(false);
            setOpen(false); // Cierra el modal
            router.push(redirectPath); // Redirige a la página principal
        } catch (error) {
            console.error("Error al eliminar:", error);
            setIsLoading(false); // Asegúrate de manejar el estado de error
        }
    };

    return (
        <>
            <Button
                variant="contained"
                onClick={handleClickOpen}
                sx={{
                    width: 'auto',
                    height: { xs: '40px', md: '50px' },
                    backgroundColor: 'red',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '8px 12px',
                }}
                disabled={isLoading}
            >
                <Delete />
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className='bg-primary txtcolor-white p-13'>{"Confirmar Eliminación"}</DialogTitle>
                <DialogContent style={{ padding: '0px' }}>
                    <DialogContentText id="alert-dialog-description" className='txtcolor-black txt-justify n-bold p-21'>
                        ¿Estás seguro de que deseas eliminar este elemento? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions className='flex-center p-13' style={{ gap: '34px' }}>
                    <Button onClick={handleConfirm} autoFocus className='bg-secondary txtcolor-white' disabled={isLoading}>
                        {isLoading ? "Eliminando..." : "Eliminar"}
                    </Button>
                    <Button onClick={handleClose} className='bg-primary txtcolor-white' style={{ margin: '0px' }} disabled={isLoading}>
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default BotonEliminar;