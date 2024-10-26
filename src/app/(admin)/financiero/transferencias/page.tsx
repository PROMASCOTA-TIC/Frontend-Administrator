'use client';

import "@/assets/styles/styles.css"
import { Box, Grid2, IconButton, Typography } from "@mui/material";
import { DateFilter, DownloadButton, Tables, } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { EditNote, Receipt } from "@mui/icons-material";

interface RowData {
    id: number;
    fecha: string;
    nombre: string;
    total: string;
    estado: string;
}

const rows: RowData[] = [
    {
        id: 1,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombre: "Juan Pérez",
        total: "100.00",
        estado: "Rechazado",
    },
];


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "nombre", headerName: "Nombre", flex: 1, minWidth: 180 },
    { field: "total", headerName: "Total", flex: 0.5, minWidth: 100 },
    {
        field: "comprobante",
        headerName: "Comprobante",
        flex: 0.5, minWidth: 120,
        align: "center",
        renderCell: () => (
            <IconButton>
                <Receipt />
            </IconButton>

        ),
    },
    { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
    {
        field: "observacion",
        headerName: "Observación",
        flex: 1.5, minWidth: 150,
        renderCell: () => (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "6px",
                }}
            >
                <Typography variant="body2">
                    Falta de dinero transferido
                </Typography>
                <IconButton>
                    <EditNote />
                </IconButton>
            </Box>
        ),
    },
];

export default function Transferencias() {
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