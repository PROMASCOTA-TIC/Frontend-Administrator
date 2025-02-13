'use client';

import "@/assets/styles/styles.css"
import {  useEffect, useState } from "react";
import { Grid2, Typography } from "@mui/material";
import { Tables } from "../components/Tables";
import { GridColDef } from "@mui/x-data-grid";
import { DateFilter } from "../components";
import { URL_BASE } from "@/config/config";
import { Dayjs } from "dayjs";
import axios from "axios";
import Notification from "@/components/ui/notifications/Notification";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";

interface RowData {
    no: number;
    salesDate: string;
    entrepreneurName: string;
    productName: string;
    productCategory: string;
    amount: string;
}

const columns: GridColDef[] = [
    { field: "no", headerName: "No.", flex: 0.5, minWidth: 50 },
    { field: "salesDate", headerName: "Fecha", flex: 1, minWidth: 100 },
    { field: "entrepreneurName", headerName: "Emprendedor", flex: 2, minWidth: 150 },
    { field: "productName", headerName: "Producto", flex: 1.5, minWidth: 150 },
    { field: "productCategory", headerName: "Categoría del producto", flex: 1.5, minWidth: 120 },
    { field: "amount", headerName: "Total", flex: 1, minWidth: 100 },
];

export default function Ventas() {
    const [rows, setRows] = useState<RowData[]>([]);
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const currentYear = new Date().getFullYear();
        const startDate = new Date(`${currentYear}-01-01T00:00:00.000Z`).toISOString();
        const endDate = new Date(`${currentYear}-12-31T23:59:59.999Z`).toISOString();
        try {
            const response = await axios.post(`${URL_BASE}incomes/sales-date-range`, {
                startDate: startDate,
                endDate: endDate,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
            const data = response.status === 200 || response.status === 201 ? response.data : [];
            data.forEach((item: RowData, index: number) => {
                item.no = index + 1;
                item.salesDate = new Date(item.salesDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' });
                item.amount = `$ ${parseFloat(item.amount).toFixed(2)}`;
            });
            setRows(data);
            setLoading(false);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setRows([]);
            setLoading(false);
        }
        setLoading(false);
    };

    const handleDateSubmit = async (data: { startDate: Dayjs | null, endDate: Dayjs | null }) => {
        setLoading(true);
        if (!data.startDate || !data.endDate) {
            fetchData();
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
                item.amount = `$ ${parseFloat(item.amount).toFixed(2)}`;
            });
            setRows(sales);
            setLoading(false);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setLoading(false);
            console.log(error);
        }
        setLoading(false);
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
                    {loading ? <LoadingSpinner /> : <Tables rows={rows} columns={columns} />}
                </Grid2>
            </Grid2>
    );
};