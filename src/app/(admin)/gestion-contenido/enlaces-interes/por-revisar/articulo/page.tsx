"use client";

import PieDePagina from "@/components/ui/footer/PieDePagina";
import { Box } from "@mui/material";
import EI_Articulo from "@/components/gestionContenido/EI_Articulo";
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
                <EI_Articulo />

                {/********************** REVISAR LOGICA DE ESTE LINK ***************************/}
                <div style={{ paddingTop: '34px' }}>
                    <Btn_PorRevisar link="/gestion-contenido/enlaces-interes/por-revisar/articulo/editar" />
                </div>
            </Box>
            <PieDePagina />
        </div>
    );
}

export default page