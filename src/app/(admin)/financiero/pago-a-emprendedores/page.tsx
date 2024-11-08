'use client';

import { Checkbox, Grid2, Typography } from "@mui/material";
import { Tables } from "../components";
import { GridColDef } from "@mui/x-data-grid";
import { useState } from "react";

interface RowData {
    id: number;
    fecha: string;
    nombrePropietario: string;
    estado: string;
    total: string;
}

const initialRows: RowData[] = [
    {
        id: 1,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombrePropietario: "Juan Pérez",
        estado: "Pendiente",
        total: "100.00",
    },
    {
        id: 2,
        fecha: new Date("2024-08-31T00:00:00").toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }),
        nombrePropietario: "Mario Gómez",
        estado: "Pendiente",
        total: "100.00",
    },
];

export default function PagoEmprendedores() {
    const [rows, setRows] = useState<RowData[]>(initialRows);

    const handleCheckboxChange = (id: number) => {
        setRows((prevRows) =>
            prevRows.map((row) =>
                row.id === id && row.estado === "Pendiente"
                    ? { ...row, estado: "Pagado" }
                    : row
            )
        );
    };

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
        { field: "fecha", headerName: "Fecha", flex: 1, minWidth: 100 },
        { field: "nombrePropietario", headerName: "Nombre del propietario", flex: 1.5, minWidth: 180 },
        { field: "estado", headerName: "Estado", flex: 1, minWidth: 100 },
        { field: "total", headerName: "Total", flex: 0.5, minWidth: 100 },
        {
            field: "registrarPago",
            headerName: "Registrar pago",
            flex: 0.5,
            minWidth: 120,
            align: "center",
            renderCell: (params) => (
                <div>
                    <Checkbox
                        checked={params.row.estado === "Pagado"}
                        onChange={() => handleCheckboxChange(params.row.id)}
                    />
                </div>
            ),
        },
    ];

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
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e13"
                    sx={{
                        fontSize: { xs: "26px", md: "34px" },
                    }}
                >
                    Pago a emprendedores
                </Typography>
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "21px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
        </Grid2>
    );
}