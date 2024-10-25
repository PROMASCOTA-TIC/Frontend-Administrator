import PieDePagina from "@/components/ui/footer/PieDePagina";
import Btn_EditarEliminar from "@/components/gestionContenido/barraBotones/Btn_EditarEliminar";
import { Box } from "@mui/material";
import EI_Articulo from "../../../../../components/gestionContenido/EI_Articulo";

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
                <Btn_EditarEliminar />
            </Box>
            <PieDePagina />
        </div>
    );
}
 
export default page