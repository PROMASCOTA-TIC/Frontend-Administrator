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
}

const EntradaPregunta: React.FC = () => {
    const { id } = useParams(); // Obtiene el ID del artículo desde la URL
    const [articulo, setArticulo] = useState<Articulo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticulo = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/faqs/detail/${id}`);
                const data = await response.json();
                console.log("Datos del artículo:", data); // Log de verificación

                // Adaptación de las propiedades del backend al formato esperado en el frontend
                setArticulo({
                    id: data.faqId, // Propiedad `linkId` del backend
                    categoria: data.category?.name || "Sin categoría", // Nombre de la categoría
                    titulo: data.title || "Título no disponible",
                    descripcion: data.description || "Descripción no disponible",
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
        <Box sx={{ gap: "21px" }}>
            <h1 className="h1-bold txtcolor-primary" style={{ padding: '21px 0px' }}>{articulo?.categoria}</h1>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="flex-column txt-justify" style={{ gap: "21px" }}>
                    <h2 className="h2-semiBold txtcolor-secondary">{articulo?.titulo}</h2>
                    <p className="n-regular" style={{ whiteSpace: "pre-line" }}>{articulo?.descripcion}</p>
                </div>
            </div>
        </Box>
    );
};

export default EntradaPregunta;