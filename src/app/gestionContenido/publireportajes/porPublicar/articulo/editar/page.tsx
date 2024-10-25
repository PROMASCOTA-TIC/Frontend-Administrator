import PieDePagina from "@/components/ui/footer/PieDePagina";
import { Box } from "@mui/material";
import Btn_GuardarCancelar from "@/components/gestionContenido/barraBotones/Btn_GuardarCancelar";
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
                    <Btn_GuardarCancelar />
                </div>
            </Box>
            <PieDePagina />
        </div>
    );
}
 
export default page