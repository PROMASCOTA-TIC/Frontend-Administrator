import PieDePagina from "@/components/ui/footer/PieDePagina";
import { Box } from "@mui/material";
import EntradaArticulo from "@/components/gestionContenido/EI_Articulo";
import Btn_GuardarCancelar from "@/components/gestionContenido/barraBotones/Btn_GuardarCancelar";

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
                <div style={{ paddingTop: '34px' }}>
                    <Btn_GuardarCancelar
                        linkGuardar="/gestion-contenido/enlaces-interes/publicados/articulo"
                        linkCancelar="/gestion-contenido/enlaces-interes/publicados/articulo"
                    />
                </div>
            </Box>
            <PieDePagina />
        </div>
    );
}

export default page