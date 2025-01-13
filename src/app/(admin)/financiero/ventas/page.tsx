'use client';

import "@/assets/styles/styles.css"
import { Grid2, Typography } from "@mui/material";
import { DateFilter } from "../components";
import { Tables } from "../components/Tables";
import { GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_BASE } from "@/config/config";
import Notification from "@/components/ui/notifications/Notification";
import { Dayjs } from "dayjs";

interface RowData {
    no: number;
    salesDate: string;
    entrepreneurName: string;
    productName: string;
    productCategory: string;
    amount: string;
}

const columns: GridColDef[] = [
    { field: "no", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "salesDate", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "entrepreneurName", headerName: "Emprendedor", flex: 2, minWidth: 150 },
    { field: "productName", headerName: "Producto", flex: 1.5, minWidth: 150 },
    { field: "productCategory", headerName: "Categoría del producto", flex: 1.5, minWidth: 120 },
    { field: "amount", headerName: "Total", flex: 1, minWidth: 100 },
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
            const response = await axios.get(`${URL_BASE}incomes`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.status === 200 ? response.data : [];
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.salesDate = new Date(item.salesDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.amount = `$ ${item.amount}`;
            });
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
            setRows(data);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setRows([]);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDateSubmit = async (data: { startDate: Dayjs | null, endDate: Dayjs | null }) => {
        if (!data.startDate || !data.endDate) {
            fetchData();
            return;
        }
        try {
            const response = await axios.post(`${URL_BASE}incomes/sales-date-range`, {
                startDate: data.startDate,
                endDate: data.endDate,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const sales = response.status === 200 || response.status === 201 ? response.data : [];
            sales.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.salesDate = new Date(item.salesDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.amount = `$ ${item.amount}`;
            });
            setRows(sales);
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
        }
    };

    return (
        <Grid2
            container
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                boxSizing: "border-box",
                minWidth: "300px",
                margin: { xs: "13px 25px", sm: "13px 30px", md: "13px 60px" },
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
                    Ventas
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <DateFilter onDateSubmit={handleDateSubmit} />
            </Grid2>
            <Grid2 size={12} sx={{ height: 423, width: "100%", marginTop: "21px" }}>
                <Tables rows={rows} columns={columns} />
            </Grid2>
        </Grid2>
    );
};