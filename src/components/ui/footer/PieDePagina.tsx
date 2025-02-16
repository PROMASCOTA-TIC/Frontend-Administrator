import { Box, IconButton } from '@mui/material';
import React from 'react'
import { Facebook, Instagram, X } from '@mui/icons-material';

import '/src/assets/styles/gestionContenido/general.css';

interface PieDePaginaProps {
    isOpen: boolean;
}

const PieDePagina: React.FC<PieDePaginaProps> = ({ isOpen }) => {
    return (
        <Box
            component="footer"
            className="bg-black10 txtcolor-primary txt-center"
            sx={{
                width: { xs: '100%', md: isOpen ? 'calc(100% - 250px)' : '100%' },
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: { xs: '20px', md: '0' },
                padding: '20px 30px',
                marginLeft: { xs: '0', md: isOpen ? '250px' : '0' },
                marginTop: 'auto',
            }}
        >
            <div>
                <p className='n-bold'>Información De Contacto</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '55px' }} className='minima-regular'>
                    <p>0999999999</p>
                    <p>0999999999</p>
                </div>
                <p className='minima-regular'>info@promaskota.com</p>
            </div>

            <div>
                <p className='n-bold'>Redes Sociales</p>
                <div className='flex-around'>
                    <IconButton href="https://www.facebook.com/share/18kPrQkn6p/?mibextid=wwXIfr" target="_blank" color='inherit'>
                        <Facebook />
                    </IconButton>
                    <IconButton href="https://www.instagram.com/pro_maskota?igsh=MWJzcDh1ZXNwbzltZA==" target="_blank" color='inherit'>
                        <Instagram />
                    </IconButton>
                    <IconButton href="https://x.com/promaskota?s=21&t=zNTMFwVc03kXulFPEG6ZGg" target="_blank" color='inherit'>
                        <X />
                    </IconButton>
                </div>
            </div>
        </Box>
    );
}

export default PieDePagina