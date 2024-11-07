'use client';

import "@/assets/styles/styles.css"
import { Grid2 } from "@mui/material";
import { DateFilter } from "../components";
import { Tables } from "../components/Tables";
import { GridColDef } from "@mui/x-data-grid";

interface RowData {
    id: number;
    fecha: string;
    nombre: string;
    categoria: string;
    precioUnitario: string;
    cantidad: string;
    total: string;
}

const rows: RowData[] = [
    {
        id: 1,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombre: "Pro-Can Cachorro",
        categoria: "Alimento",
        precioUnitario: "50.00",
        cantidad: "2",
        total: "100.00",
    },
    {
        id: 2,
        fecha: new Date("2024-08-25T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombre: "Pro-Can Cachorro",
        categoria: "Alimento",
        precioUnitario: "50.00",
        cantidad: "2",
        total: "100.00",
    },
    {
        id: 3,
        fecha: new Date("2024-07-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombre: "Pro-Can Cachorro",
        categoria: "Alimento",
        precioUnitario: "50.00",
        cantidad: "2",
        total: "100.00",
    },
];


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "nombre", headerName: "Nombre", flex: 2, minWidth: 150 },
    { field: "tipoProducto", headerName: "Categoría", flex: 1.5, minWidth: 150 },
    { field: "precioUnitario", headerName: "Precio unitario", flex: 1, minWidth: 120 },
    { field: "cantidad", headerName: "Cantidad", flex: 0.8, minWidth: 100 },
    { field: "total", headerName: "Total", flex: 1, minWidth: 100 },
];

export default function Ventas() {
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
            <Grid2 size={12}>
                <DateFilter />
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "30px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
        </Grid2>
    );
};