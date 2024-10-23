import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import React from 'react';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';

interface BotonEditarProps {
    link: string;
}

const BotonEditar: React.FC<BotonEditarProps> = ({ link }) => {
    return (
        <Link href={link} passHref>
            <Button
                variant="contained"
                className='bg-primary'
                sx={{
                    width: { xs: '100%', md: 'auto' }, // Ajusta el ancho según el tamaño de pantalla
                    height: { xs: '40px', md: '50px' },

                    color: 'white',                
                    borderRadius: '8px',          
                    padding: '8px 12px',          
                }}
            >
                <Edit />
            </Button>
        </Link>
    )
}

export default BotonEditar;
