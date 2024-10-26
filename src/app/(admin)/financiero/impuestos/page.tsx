'use client';

import "@/assets/styles/styles.css"
import { Grid2 } from "@mui/material";
import { DateFilter, DownloadButton, } from "../components";
import { Tables } from "../components/Tables";
import { GridColDef } from "@mui/x-data-grid";

interface RowData {
    id: number;
    mes: string;
    comision: string;
    iva: string;
    ganancia: string;
}

const rows: RowData[] = [
    {
        id: 1,
        mes: "Noviembre",
        comision: "$ 500",
        iva: "$ 75",
        ganancia: "$ 425",
    },
];


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "mes", headerName: "Mes", flex: 1, minWidth: 100 },
    { field: "comision", headerName: "Comisión", flex: 1, minWidth: 100 },
    { field: "iva", headerName: "IVA (15%)", flex: 1, minWidth: 100 },
    { field: "ganancia", headerName: "Ganancia", flex: 1, minWidth: 100 },
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
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "30px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
            <Grid2 size={12} sx={{ marginTop: "20px" }}>
                <DownloadButton />
            </Grid2>
        </Grid2>
    );
};