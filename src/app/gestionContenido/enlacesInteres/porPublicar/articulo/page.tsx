"use client";

import PieDePagina from "@/components/ui/footer/PieDePagina";
import EntradaArticulo from "../../../../../components/gestionContenido/EntradaArticulo";
import { Box } from "@mui/material";
import Btn_PorPublicar from "@/components/gestionContenido/barraBotones/Btn_PorPublicar";

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
                <EntradaArticulo />
                <Btn_PorPublicar />
            </Box>
            <PieDePagina />
        </div>
    );
}
 
export default page