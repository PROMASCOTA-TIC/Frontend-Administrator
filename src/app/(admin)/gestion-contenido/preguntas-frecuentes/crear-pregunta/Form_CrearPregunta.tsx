"use client";

import React, { useState } from 'react';
import { Alert, Box, Grid2, MenuItem, Select, Snackbar, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import '/src/assets/styles/gestionContenido/general.css';
import '/src/assets/styles/gestionContenido/estilos.css';
import Btn_GuardarCancelar from '@/components/gestionContenido/barraBotones/Btn_GuardarCancelar';
import { crearPreguntaSchema } from '@/app/validations/gestion-contenido/crearPreguntaSchema';

import { useRouter } from "next/navigation";

type Inputs = {
    category: string;
    title: string;
    description: string;
}

const categoryMap: Record<string, number> = {
    publicarContenido: 1,
    registroYCuenta: 2,
    comprasYPagos: 3,
    productosYServicios: 4,
    soporteAlCliente: 5,
    seguridadYPrivacidad: 6,
};

const Form_CrearPregunta: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
        resolver: zodResolver(crearPreguntaSchema),
        mode: 'onChange', // Valida en tiempo real
    });

    const [open, setOpen] = useState(false);

    // Estados para feedback de la operación
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const router = useRouter();

    // 2. Función onSubmit con React Hook Form
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            setError("");
            setSuccess("");

            const createFaqDto = {
                categoryId: categoryMap[data.category],
                title: data.title,
                description: data.description,
            };

            // 3. Enviar al backend
            const response = await fetch("http://localhost:3001/api/faqs/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(createFaqDto),
            });

            if (!response.ok) {
                throw new Error(
                    `Error al crear pregunta. Status: ${response.status}`
                );
            }

            console.log("Guardado exitoso");

            setOpenSnackbar(true);

            setTimeout(() => {
                router.push("http://localhost:3000/gestion-contenido/preguntas-frecuentes");
            }, 4000);

            const respData = await response.json();
            setSuccess(
                `Pregunta creado con éxito. ID asignado: ${respData?.id || "(sin ID)"
                }`
            );
        } catch (err: any) {
            setError(err.message || "Ocurrió un error al crear la pregunta");
        }
        setOpen(true);
    };

    return (
        <div>
            <form
                className='flex-center p-34'
                onSubmit={handleSubmit(onSubmit)}
            >
                <Box
                    className='bg-black10 flex-column p-34'
                    sx={{
                        width: { xs: '90%', sm: '80%', md: '70%' },
                        border: '1px solid #004040',
                        borderRadius: '10px',
                        gap: '21px'
                    }}
                >
                    <Grid2 container spacing={2}>
                        {/* SECCION DE TIPO DE CONTENIDO */}
                        <Grid2 size={12}>
                            <h2 className='h2-bold txtcolor-primary txt-center'>Tipo de contenido</h2>
                        </Grid2>

                        {/* Categoria */}
                        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                            <h2 className='h2-bold txtcolor-primary'>Categoría</h2>
                        </Grid2>

                        {/* Categoria */}
                        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                            <h2 className='h2-bold txtcolor-primary'>Categoría</h2>
                        </Grid2>

                        {/* Categoria: Select */}
                        <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                            <Grid2 size={12}>
                                <Select
                                    defaultValue=""
                                    displayEmpty
                                    className='minima-regular'
                                    {...register('category')}
                                    error={!!errors.category}
                                    sx={{
                                        backgroundColor: 'white',
                                        borderRadius: '15px',
                                        minWidth: '100%',
                                    }}
                                >
                                    <MenuItem value="" disabled>Seleccionar</MenuItem>
                                    <MenuItem value="publicarContenido">Publicar contenido</MenuItem>
                                    <MenuItem value="registroYCuenta">Registro y Cuenta</MenuItem>
                                    <MenuItem value="comprasYPagos">Compras y Pagos</MenuItem>
                                    <MenuItem value="productosYServicios">Productos y Servicios</MenuItem>
                                    <MenuItem value="soporteAlCliente">Soporte al Cliente</MenuItem>
                                    <MenuItem value="seguridadYPrivacidad">Seguridad y Privacidad</MenuItem>
                                </Select>
                            </Grid2>

                            <Grid2 size={12}>
                                {errors.category && (
                                    <p className="text-red-500" style={{ margin: '4px' }}>
                                        {errors.category.message}
                                    </p>
                                )}
                            </Grid2>
                        </Grid2>

                        {/* SECCION DE DETALLES DE CONTENIDO */}
                        <Grid2 size={12}>
                            <h2 className='h2-bold txtcolor-primary txt-center'>Detalles del contenido</h2>
                        </Grid2>

                        {/* Titulo */}
                        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                            <h2 className='h2-bold txtcolor-primary'>Título</h2>
                        </Grid2>

                        {/* Titulo: Input */}
                        <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                            <Grid2 size={12}>
                                <TextField
                                    placeholder="Ingresar"
                                    className='minima-regular'
                                    {...register('title')}
                                    error={!!errors.title}
                                    sx={{
                                        borderRadius: '15px',
                                        backgroundColor: 'white',
                                        width: '100%',
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderRadius: '15px',
                                            },
                                        },
                                    }}
                                />
                            </Grid2>

                            <Grid2 size={12}>
                                {errors.title && (
                                    <p className="text-red-500" style={{ margin: '4px' }}>
                                        {errors.title.message}
                                    </p>
                                )}
                            </Grid2>
                        </Grid2>

                        {/* Descripcion */}
                        <Grid2 size={{ xs: 12, sm: 4, md: 4 }}>
                            <h2 className='h2-bold txtcolor-primary'>Descripción</h2>
                        </Grid2>

                        {/* Descripcion: Input */}
                        <Grid2 size={{ xs: 12, sm: 8, md: 8 }}>
                            <Grid2 size={12}>
                                <TextField
                                    id="outlined-multiline-static"
                                    multiline
                                    rows={2}
                                    placeholder="Ingresar"
                                    {...register('description')}
                                    error={!!errors.description}
                                    sx={{
                                        borderRadius: '15px',
                                        backgroundColor: 'white',
                                        width: '100%',
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
                            </Grid2>

                            <Grid2 size={12}>
                                {errors.description && (
                                    <p className="text-red-500" style={{ marginTop: '4px' }}>
                                        {errors.description.message}
                                    </p>
                                )}
                            </Grid2>
                        </Grid2>

                        {/* Botones */}
                        <Grid2 size={12}>
                            <div style={{ paddingTop: '21px' }}>
                                <Btn_GuardarCancelar
                                    linkCancelar="/gestion-contenido/preguntas-frecuentes"
                                />

                                <Snackbar
                                    open={openSnackbar}
                                    autoHideDuration={4000}
                                    onClose={() => setOpenSnackbar(false)}
                                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                                >
                                    <Alert
                                        onClose={() => setOpenSnackbar(false)}
                                        severity="success"
                                        sx={{ width: "100%" }}
                                    >
                                        Guardado con éxito. Redirigiendo...
                                    </Alert>
                                </Snackbar>
                            </div>
                        </Grid2>
                    </Grid2>
                </Box>
            </form >
        </div>
    );
};

export default Form_CrearPregunta;