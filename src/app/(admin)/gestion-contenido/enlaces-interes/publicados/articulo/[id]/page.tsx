"use client";

import React from 'react';
import EntradaArticulo from '../EntradaArticulo';
import { Box } from '@mui/system';
import { useParams } from 'next/navigation';

import Btn_EditarEliminar from '@/components/gestionContenido/barraBotones/Btn_EditarEliminar';

const Page = () => {
    const params = useParams(); // Obtiene los parámetros de la URL
    const id = typeof params?.id === "string" ? params.id : params?.id?.[0]; // Asegúrate de que sea un string

    if (!id) {
        return <p>Error: No se encontró el ID del artículo.</p>; // Maneja el error si el ID no está disponible
    }

    return (
        <div>
            <Box
                className='flex-column'
                sx={{
                    padding: '34px 55px',
                    gap: '21px',
                }}
            >
                <EntradaArticulo />
                <div style={{ paddingTop: '34px' }}>
                    <Btn_EditarEliminar
                        linkEditar={`/gestion-contenido/enlaces-interes/publicados/articulo/editar/${id}`}
                        id={id} // Ahora siempre es un string
                        endpointEliminar="http://localhost:3001/api/links/delete"
                        redirectPath="/gestion-contenido/enlaces-interes/publicados"
                    />
                </div>
            </Box>
        </div>
    );
};

export default Page;