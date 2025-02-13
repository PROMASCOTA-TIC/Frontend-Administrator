"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, TextField, Button, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import BotonCancelar from "@/components/gestionContenido/botones/BotonCancelar";

interface Articulo {
    title: string;
    description: string;
    sourceLink: string;
    categoryId: number;
    publishDate: string | null; // Fecha y hora de publicación opcional
}

const EditarArticulo = () => {
    const { id } = useParams(); // Obtiene el id desde la URL
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [categorias, setCategorias] = useState<{ id: number; name: string }[]>([]); // Lista de categorías
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const router = useRouter();

    // Obtener la fecha y hora actual en formato ISO para usar como `min` en el input
    const now = dayjs().format("YYYY-MM-DDTHH:mm");

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/advertorials/detail/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del artículo");
                }
                const data = await response.json();
                setArticulo({
                    title: data.title,
                    description: data.description,
                    sourceLink: data.sourceLink,
                    categoryId: data.categoryId,
                    publishDate: data.publishDate || null, // Se obtiene la fecha de publicación si existe
                });
            } catch (error) {
                console.error("Error al cargar el artículo:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/advertorials/categories/all`);
                const data = await response.json();
                setCategorias(data); // Obtiene las categorías disponibles para mostrar en el <Select>
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        if (id) {
            fetchArticulo();
            fetchCategorias(); // Cargar las categorías al abrir la página
        }
    }, [id]);

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verificar que el artículo tenga los datos necesarios antes de enviarlo
        if (!articulo || !articulo.title || !articulo.description || !articulo.categoryId) {
            alert("Por favor, completa todos los campos obligatorios.");
            return;
        }

        // Convertir la fecha a UTC
        const publishDateUTC = articulo.publishDate ? new Date(articulo.publishDate).toISOString() : null;

        // Preparar los datos para enviarlos al backend
        const updatedArticulo = {
            ...articulo,
            publishDate: publishDateUTC,
        };

        console.log("Datos enviados en UTC:", updatedArticulo);  // Verificar los datos enviados

        try {
            // Actualiza los datos del artículo
            const responseUpdate = await fetch(`http://localhost:3001/api/advertorials/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedArticulo),
            });

            if (!responseUpdate.ok) {
                throw new Error("Error al actualizar el artículo");
            }

            setOpenSnackbar(true);
            setTimeout(() => {
                router.push(`/gestion-contenido/publireportajes/por-revisar/articulo/${id}`);
            }, 4000);
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }
    };


    if (loading) {
        return (
            <div
                className="flex-center"
                style={{
                    height: "100vh",
                    flexDirection: "column",
                    gap: "20px",
                }}
            >
                <CircularProgress style={{ color: "#004040" }} size={60} />
                <h1 className="h1-bold txtcolor-primary">Cargando...</h1>
            </div>
        );
    }

    if (!articulo) {
        return <p>No se encontró el artículo.</p>;
    }

    return (
        <Box sx={{ padding: "34px", gap: "20px" }}>
            <h1 className="h1-bold txtcolor-primary txt-center" style={{ paddingBottom: '13px' }}>Editar artículo</h1>
            <form onSubmit={handleEditSubmit}>
                <TextField
                    fullWidth
                    label="Título"
                    value={articulo!.title || ""}
                    onChange={(e) => setArticulo({ ...articulo, title: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Descripción"
                    value={articulo!.description || ""}
                    onChange={(e) => setArticulo({ ...articulo, description: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                    style={{ whiteSpace: "pre-line" }}
                />
                <TextField
                    fullWidth
                    label="Fuente"
                    value={articulo!.sourceLink || ""}
                    onChange={(e) => setArticulo({ ...articulo, sourceLink: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                />

                <FormControl variant="outlined" sx={{ marginBottom: "20px", display: "block" }}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        value={articulo!.categoryId || ""}
                        onChange={(e) => setArticulo({ ...articulo, categoryId: Number(e.target.value) })}
                        label="Categoría"
                    >
                        {categorias.map((categoria) => (
                            <MenuItem key={categoria.id} value={categoria.id}>
                                {categoria.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Campo de Fecha y Hora de Publicación */}
                <TextField
                    type="datetime-local"
                    label="Fecha y hora de publicación"
                    value={articulo!.publishDate ? dayjs(articulo.publishDate).format("YYYY-MM-DDTHH:mm") : ""}
                    onChange={(e) => setArticulo({ ...articulo, publishDate: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: now, // Evita que se seleccionen fechas anteriores
                    }}
                />

                <div className="flex-center">
                    <div className="flex-center gap-10">
                        <Button
                            type="submit"
                            variant="contained"
                            className='bg-primary n-regular'
                            sx={{
                                textTransform: 'none',
                                width: 'auto', // Ajusta el ancho según el tamaño de pantalla
                                height: { xs: '40px', md: '50px' }, // Ajusta la altura según el tamaño de pantalla
                            }}
                        >
                            Guardar cambios
                        </Button>

                        <BotonCancelar
                            link={`/gestion-contenido/publireportajes/por-revisar/articulo/${id}`}
                            onConfirm={() => router.push(`/gestion-contenido/publireportajes/por-revisar/articulo/${id}`)}
                        />
                    </div>

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
            </form>
        </Box>
    );
};

export default EditarArticulo;