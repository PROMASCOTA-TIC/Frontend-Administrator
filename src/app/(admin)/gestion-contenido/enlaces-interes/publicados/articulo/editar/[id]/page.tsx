"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, CircularProgress, TextField, Button, MenuItem, Select, FormControl, InputLabel, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import BotonCancelar from "@/components/gestionContenido/botones/BotonCancelar";
import ArchivosMultimedia from "@/components/gestionContenido/ArchivosMultimedia";

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

interface Articulo {
    title: string;
    description: string;
    sourceLink: string;
    categoryId: number;
    imagesUrl?: string;
}

// Configuración de Firebase
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const EditarArticulo = () => {
    const { id } = useParams();
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [categorias, setCategorias] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageUrls, setImageUrls] = useState<string[]>([]); // 🔹 Ahora se usa esta variable para todas las imágenes

    const router = useRouter();

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/links/detail/${id}`);
                if (!response.ok) {
                    throw new Error("Error al obtener los datos del artículo");
                }
                const data = await response.json();
                setArticulo({
                    title: data.title,
                    description: data.description,
                    sourceLink: data.sourceLink,
                    categoryId: data.categoryId,
                    imagesUrl: data.imagesUrl,
                });

                // 🔹 Convertir las imágenes almacenadas en la BD en un array si existen
                if (data.imagesUrl) {
                    setImageUrls(data.imagesUrl.split(","));
                }
            } catch (error) {
                console.error("Error al cargar el artículo:", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/links/categories/all`);
                const data = await response.json();
                setCategorias(data);
            } catch (error) {
                console.error("Error al cargar categorías:", error);
            }
        };

        if (id) {
            fetchArticulo();
            fetchCategorias();
        }
    }, [id]);

    // **🔹 Función para subir archivos a Firebase **
    const uploadMediaToFirebase = async (files: File[]) => {
        if (files.length === 0) return [];

        const urls: string[] = [];
        for (const file of files) {
            try {
                const storageRef = ref(storage, `gestion-contenido/enlaces-interes/${Date.now()}_${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                urls.push(downloadURL);
            } catch (error) {
                console.error("Error al subir archivo:", error);
            }
        }

        return urls;
    };

    // **🔹 Función para manejar la actualización del artículo **
    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // 🔹 Subir las imágenes nuevas a Firebase
            const newImageUrls = await uploadMediaToFirebase(selectedFiles);

            // 🔹 Actualizar la lista final de imágenes (nuevas + actuales después de eliminar)
            const updatedImagesUrl = [...imageUrls, ...newImageUrls].join(",");

            const response = await fetch(`http://localhost:3001/api/links/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...articulo, imagesUrl: updatedImagesUrl }),
            });

            if (!response.ok) {
                console.error("Error al actualizar el artículo");
            }
        } catch (error) {
            console.error("Error al enviar los datos:", error);
        }

        setOpenSnackbar(true);
        setTimeout(() => {
            router.push(`/gestion-contenido/enlaces-interes/publicados/articulo/${id}`);
        }, 4000);
    };

    // **🔹 Manejar imágenes nuevas y eliminadas **
    const handleImageChange = (newFiles: File[], updatedImageUrls: string[]) => {
        setSelectedFiles(newFiles);
        setImageUrls(updatedImageUrls);
    };

    if (loading) {
        return (
            <div className="flex-center" style={{ height: "100vh", flexDirection: "column", gap: "20px" }}>
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
                    value={articulo.title || ""}
                    onChange={(e) => setArticulo({ ...articulo, title: e.target.value.substring(0, 255) })}
                    inputProps={{ maxLength: 255 }} // 🔹 Limita la entrada a 255 caracteres
                    sx={{ marginBottom: "20px" }}
                />
                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Descripción"
                    value={articulo.description || ""}
                    onChange={(e) => setArticulo({ ...articulo, description: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                    style={{ whiteSpace: "pre-line" }}
                />
                <TextField
                    fullWidth
                    label="Fuente"
                    value={articulo.sourceLink || ""}
                    onChange={(e) => setArticulo({ ...articulo, sourceLink: e.target.value })}
                    sx={{ marginBottom: "20px" }}
                />

                <FormControl variant="outlined" sx={{ marginBottom: "20px" }}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        value={articulo.categoryId || ""}
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

                <div>
                    <ArchivosMultimedia onChange={handleImageChange} existingImages={imageUrls} />
                </div>

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
                            link={`/gestion-contenido/enlaces-interes/publicados/articulo/${id}`}
                            onConfirm={() => router.push(`/gestion-contenido/enlaces-interes/publicados/articulo/${id}`)}
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