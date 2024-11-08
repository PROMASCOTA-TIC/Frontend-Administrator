import { Button, Box } from '@mui/material'; // Asegúrate de tener la última versión
import React from 'react';
import StoreIcon from '@mui/icons-material/Store';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { themePalette } from '@/config/theme.config';
import Link from 'next/link'; 

interface ButtonInicioAdmProps {
  name: string; 
  icon: React.ElementType; 
  link: string; 
}

const ButtonInicioAdm: React.FC<ButtonInicioAdmProps> = ({ name, icon: Icon, link }) => {
  return (
    <Link href={link} passHref>
      <Button
        variant="contained"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 0,
          background: themePalette.terciary20,
          color: themePalette.primary,
          width: 400, 
          height: 200, 
          margin: 1,
          borderRadius: '15px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '52px',
            borderBottom: '1px solid #ddd',
            background: themePalette.primary,
            color: themePalette.cwhite,
            fontSize: 20, 
            textTransform: 'none',
            borderRadius: '15px 15px 0 0',
          }}
        >
          {name}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            
          }}
        >
          <Icon sx={{ fontSize: 80 }} />
        </Box>
      </Button>
    </Link>
  );
};

export const ButtonMosaic = () => {
  const buttons = [
    { name: 'Emprendedores', icon: StoreIcon, link: '/emprendedores/solicitudes' }, 
    { name: 'Financiero', icon: LeaderboardIcon, link: '/financiero/reporte' }, 
    { name: 'Gestión de contenido', icon: BackupTableIcon, link: '/gestion-contenido/enlaces-interes' }, 
    { name: 'Envíos', icon: LocalShippingIcon, link: '/pedidos/recoleccion-de-productos' }, 
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        gap: 2, 
      }}
    >
      {buttons.map((button, index) => (
        <Box key={index} sx={{ flex: '0 0 auto' }}> 
          <ButtonInicioAdm name={button.name} icon={button.icon} link={button.link} />
        </Box>
      ))}
    </Box>
  );
};
