'use client';

import "@/assets/styles/styles.css"
import { Checkbox, Grid2 } from "@mui/material";
import { DateFilter, DownloadButton, Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";

interface RowData {
    id: number;
    fecha: string;
    nombrePropietario: string;
    estado: string;
    total: string;
}

const rows: RowData[] = [
    {
        id: 1,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombrePropietario: "Juan Pérez",
        estado: "Pendiente",
        total: "100.00",
    },
];


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "nombrePropietario", headerName: "Nombre del propietario", flex: 1.5, minWidth: 180 },
    { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
    { field: "total", headerName: "Total", flex: 0.5, minWidth: 100 },
    {
        field: "registrarPago",
        headerName: "Registrar pago",
        flex: 0.5, minWidth: 120,
        align: "center",
        renderCell: () => (
            <div>
                <Checkbox />
            </div>

        ),
    },
];

export default function PagoEmprendedores() {
    return (
        <Grid2
            container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                boxSizing: "border-box",
                minWidth: "300px",
                margin: { xs: "30px 25px", sm: "30px 30px", md: "30px 60px" },
            }}
        >
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "30px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
        </Grid2>
    );
};