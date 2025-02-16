"use client";

import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import "/src/assets/styles/gestionContenido/general.css";
import "/src/assets/styles/gestionContenido/estilos.css";

interface Articulo {
    id: string;
    categoria: string;
    titulo: string;
    descripcion: string;
    imagenes: string[];
    bibliografia: string;
    autor: string;
}

const EntradaPublireportaje: React.FC = () => {
    const { id } = useParams(); // Obtiene el ID del artículo desde la URL
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/advertorials/detail/${id}`);
                const data = await response.json();
                console.log("Datos del artículo:", data); // Log de verificación

                // Adaptación de las propiedades del backend al formato esperado en el frontend
                setArticulo({
                    id: data.advertorialId, // Propiedad `linkId` del backend
                    categoria: data.category?.name || "Sin categoría", // Nombre de la categoría
                    titulo: data.title || "Título no disponible",
                    descripcion: data.description || "Descripción no disponible",
                    bibliografia: data.sourceLink || "No especificada",
                    autor: data.ownerName || "Desconocido",
                    imagenes: data.imagesUrl
                        ? data.imagesUrl.split(",").map((url: string) => url.trim())
                        : [],
                });
            } catch (error) {
                console.error("Error al obtener los datos del artículo:", error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchArticulo(); // Ejecuta la función solo si el ID está definido
        }
    }, [id]); // El efecto se ejecuta cada vez que cambia el ID

    if (loading) {
        return (
            <div
                className="flex-center"
                style={{
                    height: "100vh", // Ocupa el 100% del alto de la pantalla
                    flexDirection: "column", // Coloca el icono y el texto uno debajo del otro
                    gap: "20px", // Espacio entre el ícono y el texto
                }}
            >
                <CircularProgress style={{ color: "#004040" }} size={60} /> {/* Ícono de carga */}
                <h1 className="h1-bold txtcolor-primary">
                    Cargando resultados...
                </h1>
            </div>
        );
    }

    if (!articulo) {
        return <p>No se encontró el artículo.</p>;
    }

    return (
        <Box sx={{ padding: "34px 55px", gap: "21px" }}>
            <h1 className="h1-bold txtcolor-primary" style={{ padding: '21px 0px' }}>{articulo?.categoria}</h1>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex-column txt-justify" style={{ width: articulo.imagenes.length > 0 ? "80%" : "100%", gap: "21px", paddingRight: "34px" }}>
                    <h2
                        className="h2-semiBold txtcolor-secondary txt-justify"
                        style={{
                            wordBreak: "break-word", // Permite que el texto salte de línea
                            overflowWrap: "break-word", // Rompe la palabra si es necesario
                            whiteSpace: "normal", // Asegura que el texto fluya
                        }}
                    >
                        {articulo?.titulo}
                    </h2>
                    <p
                        className="n-regular"
                        style={{
                            whiteSpace: "pre-line",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}
                    >{articulo?.descripcion}
                    </p>
                    
                    <p className="n-regular"
                        style={{
                            whiteSpace: "pre-line",
                            wordBreak: "break-word",
                            overflowWrap: "break-word",
                        }}
                    >
                        <b>Bibliografía:</b> {articulo?.bibliografia}</p>
                    <p className="n-regular">
                        <b>Compartido por:</b> {articulo?.autor}
                    </p>
                </div>

                {/* 🔹 Solo se muestra si hay imágenes */}
                {articulo.imagenes.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {articulo.imagenes.map((imagen, index) => (
                            <img
                                key={index}
                                src={imagen}
                                className="articulo_imagen"
                                alt={`Imagen ${index + 1} de ${articulo.titulo}`}
                                style={{ width: "200px", borderRadius: "10px" }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Box>
    );
};

export default EntradaPublireportaje;