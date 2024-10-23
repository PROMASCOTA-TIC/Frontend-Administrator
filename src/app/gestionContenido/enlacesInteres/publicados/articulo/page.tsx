import PieDePagina from "@/components/ui/footer/PieDePagina";
import EntradaArticulo from "../../../../../components/gestionContenido/EntradaArticulo";
import Btn_EditarEliminar from "@/components/gestionContenido/barraBotones/Btn_EditarEliminar";
import { Box } from "@mui/material";

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
                <Btn_EditarEliminar />
            </Box>
            <PieDePagina />
        </div>
    );
}
 
export default page