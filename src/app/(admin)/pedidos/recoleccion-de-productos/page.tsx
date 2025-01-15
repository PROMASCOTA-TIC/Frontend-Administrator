'use client';

import { themePalette } from "@/config/theme.config";
import { Box, Grid2, Typography, List, ListItem, ListItemText, Grid } from "@mui/material";
import { DownloadButton, NameFilter } from "../../financiero/components";

const tiendas = ['Tienda A', 'Tienda B', 'Tienda C'];

export default function RecoleccionProductos() {
    const productos = ['Producto 1', 'Producto 2', 'Producto 3'];

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
                <Box
                    sx={{
                        width: {sm: "500px"},
                        marginLeft: "21px"
                    }}
                >
                    <NameFilter searchParameter={"Nombre comercial"} />
                </Box>
            </Grid2>
            {tiendas.map((tienda, index) => (
                <Grid2 key={index} size={{ xs:12, sm:6}}>
                    <Box
                        sx={{
                            margin: '21px',
                            padding: '16px',
                            border: `1px solid ${themePalette.primary}`,
                            borderRadius: '20px',
                            backgroundColor: themePalette.terciary20,
                            color: themePalette.primary,
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                marginLeft: '13px',
                            }}
                        >
                            {tienda}
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
                                Calle 123
                            </Typography>
                        </Box>
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
                            {productos.map((producto, index) => (
                                <ListItem key={index} sx={{ padding: '1px 0', display: 'list-item' }}>
                                    <ListItemText primary={producto} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Grid2>
            ))}
            {/* <Grid2 size={12} >
                <DownloadButton />
            </Grid2> */}
        </Grid2>
    );
}
