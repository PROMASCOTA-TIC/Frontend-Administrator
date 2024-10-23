import PieDePagina from "@/components/ui/footer/PieDePagina";
import EntradaArticulo from "./EntradaArticulo";

export default function EI_Categorias_Articulo() {
    return (
        <div>
            {/* Header */}
            <h1 className='h1-bold txtcolor-primary' style={{ padding: '21px 0px 0px 55px' }}>Categoria</h1>
            <EntradaArticulo />
            <PieDePagina />
        </div>
    );
} 