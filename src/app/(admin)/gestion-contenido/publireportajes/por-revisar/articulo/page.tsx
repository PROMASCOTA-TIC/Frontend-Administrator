"use client";

import { Box } from "@mui/material";
import PR_Articulo from "@/components/gestionContenido/PR_Articulo";
import Btn_PorRevisar from "@/components/gestionContenido/barraBotones/Btn_PorRevisar";

const page = () => {
    return (
        <div>
            <Box
                className='flex-column'
                sx={{
                    padding: '34px 55px',
                    gap: '21px'
                }}
            >
                <h1 className='h1-bold txtcolor-primary'>Categoria</h1>
                <PR_Articulo />
                <div style={{ paddingTop: '34px' }}>
                    <Btn_PorRevisar link="/gestion-contenido/publireportajes/por-revisar/articulo/editar" />
                </div>
            </Box>
        </div>
    );
}

export default page