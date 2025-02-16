import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import React, { FC } from 'react';
import { useRouter } from 'next/navigation';

interface BotonEditarProps {
    link: string;
}

const BotonEditar: FC<BotonEditarProps> = ({ link }) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(link); // Redirige al enlace dinámico
    };

    return (
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
            onClick={handleEdit}
        >
            <Edit />
        </Button>
    );
};

export default BotonEditar;
