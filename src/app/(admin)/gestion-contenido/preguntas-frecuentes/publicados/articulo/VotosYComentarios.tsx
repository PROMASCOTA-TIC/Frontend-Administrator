"use client"; // Indica que este componente es un Client Component

import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box, Button, Select, MenuItem, SelectChangeEvent, TableContainer, Paper } from '@mui/material';
import { useState } from 'react';

const VotosYComentarios = () => {
    const [showComments, setShowComments] = useState(false);
    const [filterVote, setFilterVote] = useState('');

    const toggleComments = () => {
        setShowComments(!showComments);
    };

    const handleFilterChange = (event: SelectChangeEvent) => {
        setFilterVote(event.target.value);
    };

    return (
        <Box
            className='flex-column'
            sx={{ width: '100%', gap: '21px' }}>
            <p className='h2-semiBold txtcolor-primary txt-center'>Esta respuesta fue útil?</p>

            {/* Tabla de estadísticas */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de estadísticas">
                    <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableRow>
                            <TableCell className='n-bold txt-center'>Total votos</TableCell>
                            <TableCell className='n-bold txt-center'>Votos positivos</TableCell>
                            <TableCell className='n-bold txt-center'>Votos negativos</TableCell>
                            <TableCell className='n-bold txt-center'>Satisfacción</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell className='n-regular txt-center'>100</TableCell>
                            <TableCell className='n-regular txt-center'>70</TableCell>
                            <TableCell className='n-regular txt-center'>30</TableCell>
                            <TableCell className='n-regular txt-center'>70%</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Botón para mostrar/ocultar comentarios */}
            <div className='flex-center'>
                <Button
                    variant="contained"
                    className='bg-primary n-regular'
                    sx={{
                        textTransform: 'none',
                        width: { xs: '100%', md: 'auto' }, // Ajusta el ancho según el tamaño de pantalla
                        height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                    }}
                    onClick={toggleComments}>
                    {showComments ? 'Ocultar comentarios' : 'Ver comentarios'}
                </Button>
            </div>

            {/* Filtrado por tipo de voto */}
            {showComments && (
                <>
                    <div >
                        <Select
                            value={filterVote}
                            onChange={handleFilterChange}
                            displayEmpty
                            sx={{
                                minWidth: 200,
                                borderRadius: '15px',
                            }}
                        >
                            <MenuItem value=""><em>Filtrar por tipo de voto</em></MenuItem>
                            <MenuItem value="positivo">Positivo</MenuItem>
                            <MenuItem value="negativo">Negativo</MenuItem>
                        </Select>
                    </div>

                    {/* Tabla de comentarios */}
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="tabla de comentarios">
                            <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
                                <TableRow>
                                    <TableCell className='n-bold txt-center'>Usuario</TableCell>
                                    <TableCell className='n-bold txt-center'>Voto</TableCell>
                                    <TableCell className='n-bold txt-center'>Comentario</TableCell>
                                    <TableCell className='n-bold txt-center'>Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell align="center">Juan Pérez</TableCell>
                                    <TableCell align="center">Positivo</TableCell>
                                    <TableCell align="center">Muy útil, me sirvió mucho</TableCell>
                                    <TableCell align="center">12/08/2024</TableCell>
                                </TableRow>
                                <TableRow sx={{ '&:nth-of-type(odd)': { backgroundColor: '#f9f9f9' } }}>
                                    <TableCell align="center">Mateo Dávalos</TableCell>
                                    <TableCell align="center">Negativo</TableCell>
                                    <TableCell align="center">Excelente contenido!</TableCell>
                                    <TableCell align="center">09/08/2024</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
            )}
        </Box>
    );
};

export default VotosYComentarios;
