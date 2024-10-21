'use client';

import { useState } from 'react';
import { Box, Grid2, Typography } from '@mui/material';
import { themePalette } from '@/config/theme.config';
import FilterSelector from '../components/FilterSelector';
import { TendenciaGeneral } from './graficas/TendenciaGeneral';
import { Movimientos } from './graficas/Movimientos';

const categories = [
    { label: 'Todos', value: '' },
    { label: 'Electrónica', value: 'electronics' },
    { label: 'Ropa', value: 'clothing' },
    { label: 'Alimentos', value: 'food' },
];

export default function Reporte() {

    const [selectedCategory, setSelectedCategory] = useState<string>('');

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <Grid2 container rowSpacing={'34px'}>
            <Grid2 size={12}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'inline',
                        gap: '64px',
                    }}
                >
                    <Box id='Ingresos'
                        sx={{
                            height: '327px',
                            width: '484px',
                            border: '1px solid black',
                            borderRadius: '15px',
                            marginTop: '34px',
                            alignItems: 'center',
                        }}>
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
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginLeft: '54px',
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
                            />
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginRight: '56px',
                                }}
                            >
                                $500
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '228px',
                                width: '484px',                 
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Movimientos selectedCategory={selectedCategory} />
                        </Box>
                    </Box>
                    <Box id='Egresos'
                        sx={{
                            height: '327px',
                            width: '484px',
                            border: '1px solid black',
                            borderRadius: '15px',
                            marginTop: '34px',
                        }}>
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
                                    fontSize: '24px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginLeft: '54px',
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
                            />
                            <Typography
                                sx={{
                                    fontSize: '18px',
                                    fontWeight: 'bold',
                                    color: themePalette.primary,
                                    marginRight: '56px',
                                }}
                            >
                                $500
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                height: '228px',
                                width: '484px',                 
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Movimientos selectedCategory={selectedCategory} />
                        </Box>
                    </Box>
                </Box>
            </Grid2>
            <Grid2 size={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        height: '338px',
                        width: '1030px',
                        border: '1px solid black',
                        borderRadius: '15px',
                        marginBottom: '34px',
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
                                fontSize: '24px',
                                fontWeight: 'bold',
                                color: themePalette.primary,
                                marginLeft: '54px',
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
                        }}
                    >
                        <FilterSelector
                            label="Categoría"
                            options={categories}
                            onFilterChange={handleCategoryChange}
                        />
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                color: themePalette.primary,
                                marginRight: '56px',
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
                            width: '920px',
                            height: '200px',
                            border: '1px solid black',
                            margin: '18px 24px',
                        }}
                    >
                        <TendenciaGeneral selectedCategory={selectedCategory} />
                    </Box>
                </Box>
            </Grid2>
        </Grid2>
    );
}