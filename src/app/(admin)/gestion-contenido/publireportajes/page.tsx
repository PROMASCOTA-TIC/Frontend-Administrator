import BotonCategoria from '@/components/gestionContenido/botones/BotonCategoria';
import PieDePagina from '@/components/ui/footer/PieDePagina'
import { Assignment, AssignmentTurnedIn } from '@mui/icons-material';
import { Box } from '@mui/material'
import React from 'react'

const buttons = [
    { name: 'Publi-reportajes publicados', icon: AssignmentTurnedIn, link: '' },
    { name: 'Publi-reportajes por revisar', icon: Assignment , link: '' },
  ];

const page = () => {
    return (
        <div>
            <Box
                className='flex-center p-55'

                sx={{
                    flexWrap: 'wrap',
                    gap: '30px',
                }}
            >
                {buttons.map((button, index) => (
                    <Box key={index} sx={{ flex: '0 0 auto' }}>
                        <BotonCategoria name={button.name} icon={button.icon} link={button.link} />
                    </Box>
                ))}
            </Box>
            <PieDePagina />
        </div>
    )
}

export default page