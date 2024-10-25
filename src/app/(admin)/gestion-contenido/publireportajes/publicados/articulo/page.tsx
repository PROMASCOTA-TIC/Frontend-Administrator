import PieDePagina from "@/components/ui/footer/PieDePagina";
import Btn_EditarEliminar from "@/components/gestionContenido/barraBotones/Btn_EditarEliminar";
import { Box } from "@mui/material";
import PR_Articulo from "@/components/gestionContenido/PR_Articulo";

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
                    <Btn_EditarEliminar />
                </div>
            </Box>
            <PieDePagina />
        </div>
    );
}

export default page