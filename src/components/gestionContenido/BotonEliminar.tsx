import { Button } from '@mui/material';
import { Delete } from '@mui/icons-material';
import React from 'react';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';

interface BotonEliminarProps {
    link: string;
}

const BotonEliminar: React.FC<BotonEliminarProps> = ({ link }) => {
    return (
        <Link href={link} passHref>
            <Button
                variant="contained"
                className='n-regular'
                sx={{
                    backgroundColor: 'red',
                    width: { xs: '100%', md: 'auto' }, // Ajusta el ancho según el tamaño de pantalla
                    height: { xs: '40px', md: '50px' },

                    color: 'white',                
                    borderRadius: '8px',          
                    padding: '8px 12px',          
                }}
            >
                <Delete />
            </Button>
        </Link>
    )
}

export default BotonEliminar;
