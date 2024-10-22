'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Remove, Menu as MenuIcon } from '@mui/icons-material';
import { Box, Typography, List, IconButton } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import Image from 'next/image';
import { SideBarItem } from '../../../interfaces';
import { MenuItem } from './MenuItem';
import LogoBlanco from '@/assets/images/logoBlanco.png';
import LogoVerde from '@/assets/images/logoVerde.png';

const SIDEBAR_ITEMS: SideBarItem[] = [
    {
        title: 'Inicio',
        path: '/',
        icon: <ChevronRight />,
    },
    {
        title: 'Emprendedores',
        path: '/emprendedores',
        submenu: true,
        subMenuItems: [
            { title: 'Solicitudes', path: '/emprendedores/solicitudes', icon: <Remove /> },
            { title: 'Lista', path: '/emprendedores/lista', icon: <Remove /> },
            { title: 'Comisiones', path: '/emprendedores/comisiones', icon: <Remove /> },
        ],
    },
    {
        title: 'Financiero',
        path: '/financiero',
        submenu: true,
        subMenuItems: [
            { title: 'Reporte', path: '/financiero/reporte', icon: <Remove /> },
            { title: 'Ventas', path: '/financiero/ventas' },
            { title: 'Egresos', path: '/financiero/egresos' },
            { title: 'Transferencias', path: '/financiero/transferencias' },
            { title: 'Pago a emprendedores', path: '/financiero/pago-a-emprendedores' },
            { title: 'Impuestos', path: '/financiero/impuestos' },
        ],
    },
    {
        title: 'Gestor de contenido',
        path: '/gestor-de-contenido',
        submenu: true,
        subMenuItems: [
            { title: 'Enlaces de interés', path: '/gestor-de-contenido/enlaces-de-interes' },
            { title: 'Publi-Reportajes', path: '/gestor-de-contenido/publi-reportajes' },
            { title: 'Preguntas Frecuentes', path: '/gestor-de-contenido/preguntas-frecuentes' },
        ],
    },
    {
        title: 'Pedidos',
        path: '/pedidos',
        submenu: true,
        subMenuItems: [
            { title: 'Recolección de productos', path: '/pedidos/recoleccion-de-productos' },
            { title: 'Entrega de productos', path: '/pedidos/entrega-de-productos' },
        ],
    },
];

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: React.Dispatch<React.SetStateAction<boolean>>; }) => {
    const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            window.innerWidth <= 900 ? setIsOpen(false) : setIsOpen(true);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [setIsOpen]);

    const handleSubMenuToggle = (index: number) => {
        setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
    };

    return (
        <>
            <IconButton
                onClick={toggleSidebar}
                sx={{
                    marginLeft: '10px',
                    marginTop: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 11,
                    position: 'fixed',
                    color: isOpen ? '#fff' : themePalette.primary,
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <MenuIcon sx={{ fontSize: '25px' }} />
                {!isOpen && (
                    <>
                        <Image src={LogoVerde} alt='Logo de un perro y un gato' width={40} height={40} priority style={{ marginLeft: '10px' }} />
                        <Typography sx={{ fontWeight: 'bold', color: themePalette.primary, marginLeft: '10px' }}>
                            PROMASCOTA
                        </Typography>
                    </>
                )}
            </IconButton>
            <Box
                sx={{
                    display: { xs: isOpen ? 'block' : 'none', md: 'block' },
                    width: isOpen ? { xs: '200px', md: '250px' } : 0,
                    bgcolor: themePalette.primary,
                    color: themePalette.cwhite,
                    height: '100vh',
                    position: 'fixed',
                    transition: 'width 0.3s ease',
                    overflow: 'hidden',
                    zIndex: 10,
                    [`& .MuiListItemButton-root`]: {
                        '&.Mui-selected': {
                            color: themePalette.secondary,
                        },
                    },
                }}
            >
                {isOpen && (
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 3,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <Image src={LogoBlanco} alt='Logo de un perro y un gato' width={80} height={80} priority style={{ marginTop: '48px' }} />
                        <Typography sx={{ fontWeight: 'bold', color: '#fff' }}>
                            PROMASCOTA
                        </Typography>
                    </Box>
                )}
                {isOpen && (
                    <List sx={{ overflowY: 'hidden' }}>
                        {SIDEBAR_ITEMS.map((item, idx) => (
                            <MenuItem
                                key={idx}
                                item={item}
                                isOpen={openSubMenuIndex === idx}
                                onToggle={() => handleSubMenuToggle(idx)}
                            />
                        ))}
                    </List>
                )}
            </Box>
        </>
    );
};

export default Sidebar;