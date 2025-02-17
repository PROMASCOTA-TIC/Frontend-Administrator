'use client';

import "@/assets/styles/styles.css"
import { Grid2, Typography } from "@mui/material";
import { Tables } from "../components/Tables";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";

interface RowData {
    no: number;
    month: string;
    totalCommissions: string;
    ivaCalculated: string;
    netProfit: string;
}

const columns: GridColDef[] = [
    { field: "no", headerName: "No", flex: 0.5, minWidth: 50 },
    { field: "month", headerName: "Mes", flex: 1, minWidth: 100 },
    { field: "totalCommissions", headerName: "Comisión", flex: 1, minWidth: 100 },
    { field: "ivaCalculated", headerName: "IVA", flex: 1, minWidth: 100 },
    { field: "netProfit", headerName: "Ganancia", flex: 1, minWidth: 100 },
];

export default function Ventas() {
    const [rows, setRows] = useState<RowData[]>([]);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${URL_BASE}taxes`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.status === 200 ? response.data : [];
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                const date = new Date(data[index].taxDate);
                date.setHours(date.getHours() + 5);
                item.month = monthNames[date.getMonth()];
            });
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
            setRows(data);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            console.log('error', error);
            setRows([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

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
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e13"
                    sx={{
                        fontSize: { xs: "26px", md: "34px" },
                    }}
                >
                    Consolidado
                </Typography>
            </Grid2>
            <Grid2 size={12} sx={{ height: 400, width: "100%", marginTop: "21px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
        </Grid2>
    );
};