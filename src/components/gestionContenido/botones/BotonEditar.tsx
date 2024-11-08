import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import React, { FC } from 'react';
import Link from 'next/link';

import '/src/assets/styles/gestionContenido/general.css';

interface BotonEditarProps {
    link: string;
}

const BotonEditar: FC<BotonEditarProps> = ({ link }) => {
    return (
        link ? (
            <Link href={link}>
                <Button
                    variant="contained"
                    className="bg-primary"
                    sx={{
                        width: 'auto',
                        height: { xs: '40px', md: '50px' },
                        color: 'white',
                        borderRadius: '8px',
                        padding: '8px 12px',
                    }}
                >
                    <Edit />
                </Button>
            </Link>
        ) : null
    );
};

export default BotonEditar;
