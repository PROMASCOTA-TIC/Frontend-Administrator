import BotonCategoria from '@/components/gestionContenido/botones/BotonCategoria';
import { Assignment, AssignmentTurnedIn } from '@mui/icons-material';
import { Box } from '@mui/material'
import React from 'react'

const buttons = [
    { name: 'Publi-reportajes publicados', icon: AssignmentTurnedIn, link: '/gestion-contenido/publireportajes/publicados' },
    { name: 'Publi-reportajes por revisar', icon: Assignment , link: '/gestion-contenido/publireportajes/por-revisar' },
  ];

const page = () => {
    return (
        <div>
            <Box
                className='flex-center p-55'

                sx={{
                    flexDirection: 'column',
                    gap: '30px',
                }}
            >
                {buttons.map((button, index) => (
                    <Box key={index} sx={{ flex: '0 0 auto' }}>
                        <BotonCategoria name={button.name} icon={button.icon} link={button.link} />
                    </Box>
                ))}
            </Box>
        </div>
    )
}

export default page