'use client';

import { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import { TendenciaGeneral } from './graficas/TendenciaGeneral';
import { Movimientos } from './graficas/Movimientos';
import { FilterSelector } from '../components/FilterSelector';
import { DateFilter, DownloadButton } from '../components';

const categories = [
    { label: 'Todos', value: '' },
    { label: 'Ropa', value: 'clothing' },
    { label: 'Alimentos', value: 'food' },
];

const data = {
    ingresos: [
        { category: 'Ropa', amount: 100, description: 'Compra de ropa' },
        { category: 'Alimentos', amount: 200, description: 'Compra de alimentos' },
    ],
    egresos: [
        { category: 'Ropa', amount: 50, description: 'Compra de ropa' },
        { category: 'Alimentos', amount: 150, description: 'Compra de alimentos' },
    ],
    totalIngresos: 300,
    totalEgresos: 200,
    balance: 100,
}

export default function Reporte() {
    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Grid2 container rowSpacing={{ xs: '20px', md: '34px' }}
            sx={{
                margin: '21px 0'
            }}
        >
            <Grid2 size={12} className="flex justify-center">
                <Typography className="font-bold text-primary mb-e8"
                    sx={{
                        fontSize: { xs: "26px", md: "34px" },
                    }}
                >
                    Reporte financiero
                </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 6 }}
                sx={{
                    marginLeft: {xs: '13px', md: '64px'},
                }}
            >
                <DateFilter />
            </Grid2>
            <Grid2
                size={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row', md: 'row' },
                        gap: { xs: '21px', sm: '34px', md: '5%' },
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: { xs: '95%', md: '90%' },
                    }}
                >
                    <Box
                        id='Ingresos'
                        sx={{
                            height: { xs: '300px', md: '350px' },
                            width: { xs: '100%', sm: '48%', md: '48%' },
                            border: '1px solid black',
                            borderRadius: '15px',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'left',
                                marginTop: '8px',
                                marginBottom: '13px',
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: { xs: '18px', md: '24px' },
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginLeft: { xs: '16px', md: '21px' },
                                }}
                            >
                                Ingresos
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <FilterSelector
                                label="Categoría"
                                options={categories}
                                onFilterChange={handleCategoryChange}
                                sx={'200px'}
                                md={'60%'}
                            />
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginRight: { xs: '16px', md: '13px' },
                                }}
                            >
                                $500
                            </Typography>
                        </Box>
                        <Movimientos selectedCategory={selectedCategory} tipoMovimiento='Egreso' />
                    </Box>
                    <Box
                        id='Egresos'
                        sx={{
                            height: { xs: '300px', md: '350px' },
                            width: { xs: '100%', sm: '48%', md: '48%' },
                            border: '1px solid black',
                            borderRadius: '15px',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'left',
                                justifyContent: 'left',
                                marginTop: '8px',
                                marginBottom: '13px',
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: 'left',
                                    fontSize: { xs: '18px', md: '24px' },
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginLeft: { xs: '16px', md: '21px' },
                                }}
                            >
                                Egresos
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}
                        >
                            <FilterSelector
                                label="Categoría"
                                options={categories}
                                onFilterChange={handleCategoryChange}
                                sx={'200px'}
                                md={'60%'}
                            />
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginRight: { xs: '16px', md: '13px' },
                                }}
                            >
                                $500
                            </Typography>
                        </Box>
                        <Movimientos selectedCategory={selectedCategory} tipoMovimiento='Egreso' />
                    </Box>
                </Box>
            </Grid2>
            <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    id='TendenciaGeneral'
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '350px',
                        width: { xs: '95%', md: '90%' },
                        border: '1px solid black',
                        borderRadius: '15px',
                    }}
                >
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            alignItems: 'left',
                            justifyContent: 'left',
                            marginTop: '8px',
                            marginBottom: '13px',
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign: 'left',
                                fontSize: { xs: '18px', md: '24px' },
                                fontWeight: 'bold',
                                color: themePalette.primary,
                                marginLeft: { xs: '16px', md: '32px' },
                            }}
                        >
                            Tendencia General
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            px: { xs: '16px', md: '32px' },
                        }}
                    >
                        <FilterSelector
                            label="Categoría"
                            options={categories}
                            onFilterChange={handleCategoryChange}
                            sx={'200px'}
                            md={'60%'}
                        />
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: themePalette.primary,
                            }}
                        >
                            $500
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: '95%',
                            height: '200px',
                            marginTop: '18px',
                        }}
                    >
                        <TendenciaGeneral selectedCategory={selectedCategory} />
                    </Box>
                </Box>
            </Grid2>
            <Grid2 size={12} sx={{ marginLeft: "64px" }}>
                <DownloadButton financialData={data} />
            </Grid2>
        </Grid2>
    );
}