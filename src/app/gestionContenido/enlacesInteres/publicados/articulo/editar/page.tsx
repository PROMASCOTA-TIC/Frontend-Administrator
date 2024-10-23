import PieDePagina from "@/components/ui/footer/PieDePagina";
import { Box } from "@mui/material";
import EntradaArticulo from "@/components/gestionContenido/EntradaArticulo";
import Btn_GuardarCancelar from "@/components/gestionContenido/Btn_GuardarCancelar";

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
                <Btn_GuardarCancelar />
            </Box>
            <PieDePagina />
        </div>
    );
}
 
export default page