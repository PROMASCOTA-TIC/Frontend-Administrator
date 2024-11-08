import Btn_EditarEliminar from "@/components/gestionContenido/barraBotones/Btn_EditarEliminar";
import { Box, Divider } from "@mui/material";
import PF_Articulo from "@/components/gestionContenido/PF_Articulo";
import VotosYComentarios from "./VotosYComentarios";

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
                <PF_Articulo />

                <div style={{ paddingTop: '34px' }}>
                    <Btn_EditarEliminar
                        linkEditar="/gestion-contenido/preguntas-frecuentes/publicados/articulo/editar"
                    />
                </div>

                <Divider sx={{ marginY: '21px', borderColor: '#00AA28' }} />

                <VotosYComentarios />
            </Box>
        </div>
    );
}
 
export default page