"use client";

import { Box } from "@mui/material";
import Btn_GuardarCancelar from "@/components/gestionContenido/barraBotones/Btn_GuardarCancelar";
import EI_Articulo from "@/components/gestionContenido/EI_Articulo";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const today = new Date();
const defaultValue = dayjs(today);

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

                <div className="flex-center">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>  {/* Usamos AdapterDayjs aquí */}
                        <DateTimePicker
                            label="Fecha de publicación:"
                            defaultValue={defaultValue}  // Establecemos la fecha por defecto
                            disablePast  // Deshabilita fechas pasadas
                        />
                    </LocalizationProvider>
                </div>

                <div>
                    <Btn_GuardarCancelar
                        linkGuardar="/gestion-contenido/enlaces-interes/por-revisar/articulo"
                        linkCancelar="/gestion-contenido/enlaces-interes/por-revisar/articulo"
                    />
                </div>
            </Box>
        </div>
    );
}

export default page