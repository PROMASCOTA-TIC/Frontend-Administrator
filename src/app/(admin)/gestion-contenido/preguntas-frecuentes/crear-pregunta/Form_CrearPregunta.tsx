import React from 'react';
import { Box, Button, MenuItem, Select, TextField } from '@mui/material';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import Btn_GuardarCancelar from '@/components/gestionContenido/barraBotones/Btn_GuardarCancelar';

const Form_CrearPregunta: React.FC = () => {
    return (
        <Box
            className='flex-center p-34'
        >
            <Box
                className='bg-black10 flex-column p-34'
                sx={{
                    width: { xs: '90%', md: '50%' }, // Tamaño responsivo
                    border: '1px solid #004040', // Borde alrededor del formulario
                    borderRadius: '10px',
                    gap: '21px'
                }}
            >
                {/* TIPO DE CONTENIDO */}
                <h2 className='h2-bold txtcolor-primary txt-center'>Tipo de contenido</h2>

                <Box
                    className='flex-spaceBetween'
                >
                    <h2 className='h2-bold txtcolor-primary'>Categoría</h2>
                    <Select
                        defaultValue=""
                        displayEmpty
                        className='minima-regular'
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '15px',

                            minWidth: {
                                xs: '400px',
                                md: '500px',
                            },
                        }}
                    >
                        <MenuItem value="" disabled>
                            <span style={{ color: '#A9A9A9', fontStyle: 'normal' }}>Seleccionar</span>
                        </MenuItem>
                        <MenuItem value="categoria1">Categoría 1</MenuItem>
                        <MenuItem value="categoria2">Categoría 2</MenuItem>
                        <MenuItem value="categoria3">Categoría 3</MenuItem>
                    </Select>
                </Box>

                {/* DETALLES DEL CONTENIDO */}
                <h2 className='h2-bold txtcolor-primary txt-center'>Detalles del contenido</h2>

                <Box
                    className='flex-spaceBetween'
                >
                    <h2 className='h2-bold txtcolor-primary txt-center'>Título</h2>
                    <TextField
                        placeholder="Ingresar"
                        className='minima-regular'
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'white',
                            minWidth: {
                                xs: '400px',
                                md: '500px',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: '15px',
                                },
                            },
                        }}
                    />
                </Box>

                <Box
                    className='flex-spaceBetween'
                >
                    <h2 className='h2-bold txtcolor-primary txt-center'>Descripción</h2>
                    <TextField
                        id="outlined-multiline-static"
                        multiline
                        rows={2}
                        placeholder="Ingresar"
                        sx={{
                            borderRadius: '15px',
                            backgroundColor: 'white',
                            minWidth: {
                                xs: '400px',
                                md: '500px',
                            },
                            minHeight: '100px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderRadius: '15px',
                                },
                            },
                            '& .MuiInputBase-input': {
                                minHeight: '100px',
                            },
                        }}
                    />
                </Box>

                <div style={{ paddingTop: '21px' }}>
                    <Btn_GuardarCancelar
                        linkGuardar="/gestion-contenido/preguntas-frecuentes/crear-pregunta"
                        linkCancelar="/gestion-contenido/publireportajes/publicados/pregunta"
                    />
                </div>

            </Box>
        </Box>
    );
};

export default Form_CrearPregunta;
