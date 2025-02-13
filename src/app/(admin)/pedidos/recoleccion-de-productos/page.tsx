'use client';

import { Box, Grid2, Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { themePalette } from "@/config/theme.config";
import { URL_BASE } from "@/config/config";
import { useEffect, useState } from "react";
import axios from "axios";
import { DownloadButton, NameFilter } from "../components";
import LoadingSpinner from "@/components/ui/LoadingSpinner/LoadingSpinner";
import Notification from "@/components/ui/notifications/Notification";


export default function RecoleccionProductos() {
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState<{
        open: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning';
    }>({ open: false, message: '', type: 'info' });
    const [tiendas, setTiendas] = useState([{ orderId: '', order: { businessName: '', address: '', products: [] } }]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${URL_BASE}orders/orderItemsEntrepreneur`);
            const data = (response.status === 200 || response.status === 201) ? response.data : [];
            data.sort((a: any, b: any) => b.order.products.length - a.order.products.length);
            setTiendas(data);
            setLoading(false);
            setNotification({ open: true, message: 'Datos cargados correctamente', type: 'success' });
        } catch (error) {
            setNotification({ open: true, message: 'Error al cargar los datos', type: 'error' });
            setLoading(false);
        }
        setLoading(false);
    };

    const handleNameSubmit = async (name: {ownerName: string}) => {
        setLoading(true);
        if (name.ownerName === "") {
            fetchData();
            return;
        }
        try {
            const response = await axios.get(`${URL_BASE}orders/orderItemsEntrepreneur`);
            let data = (response.status === 200 || response.status === 201) ? response.data : [];
            data = data.filter((tienda: any) => tienda.order.businessName.toLowerCase() === name.ownerName.toLowerCase());
            data.sort((a: any, b: any) => b.order.products.length - a.order.products.length);
            setTiendas(data);
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
                margin: { xs: "30px 25px", sm: "30px 30px", md: "30px 60px" },
            }}
        >
            <Notification
                open={notification.open}
                onClose={() => setNotification({ ...notification, open: false })}
                message={notification.message}
                type={notification.type}
            />
            <Grid2 size={12}>
                <Box
                    sx={{
                        width: { sm: "500px" },
                        marginLeft: "21px"
                    }}
                >
                    <NameFilter onNameSubmit={handleNameSubmit} />
                </Box>
            </Grid2>
            {loading ? <Grid2 className="min-h-[320px]" size={12}><LoadingSpinner /></Grid2>
                : tiendas.map((tienda: any, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6 }}>
                        <Box
                            sx={{
                                margin: '21px',
                                padding: '16px',
                                border: `1px solid ${themePalette.primary}`,
                                borderRadius: '20px',
                                backgroundColor: themePalette.terciary20,
                                color: themePalette.primary,
                                minHeight: '250px',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    marginLeft: '13px',
                                }}
                            >
                                {tienda.order.businessName}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '16px',
                                    marginTop: '8px',
                                    marginLeft: '13px',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    Dirección:
                                </Typography>
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'normal',
                                    }}
                                >
                                    {tienda.order.address}
                                </Typography>
                            </Box>
                            <Box className="flex flex-col bg-green-50 rounded-b20 min-h-[120px] mt-e5">
                                <Typography
                                    sx={{
                                        fontSize: '16px',
                                        fontWeight: 'bold',
                                        marginTop: '8px',
                                        marginLeft: '13px',
                                    }}
                                >
                                    Productos a recoger
                                </Typography>
                                <List
                                    sx={{
                                        pading: '0px',
                                        marginLeft: '55px',
                                        marginTop: '3px',
                                        listStyleType: 'circle',
                                    }}>
                                    {tienda.order.products.map((producto: any, index: any) => (
                                        <ListItem key={index} sx={{ padding: '1px 0', display: 'list-item' }}>
                                            <ListItemText primary={producto} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Box>
                    </Grid2>
                ))}
            <Grid2 size={12} >
                <DownloadButton data={tiendas} />
            </Grid2>
        </Grid2>
    );
}
