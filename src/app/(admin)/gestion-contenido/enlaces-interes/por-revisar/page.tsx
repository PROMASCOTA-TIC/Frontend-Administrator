"use client";

import { useEffect, useState } from 'react';
import ArticulosConFoto from '@/components/gestionContenido/ArticulosConFoto';
import { CircularProgress } from '@mui/material';
import EI_Filtro from '@/components/gestionContenido/filtros/EI_Filtro';

const EI_Categorias = () => {
  const [articulos, setArticulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ** Función para obtener todos los enlaces pendientes **
  const fetchPendingLinks = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/links/status/pending');
      const data = await response.json();
      console.log('Datos recibidos:', data); // Log para ver los datos de la API

      // 🔹 Adaptar los datos para el componente
      const articulosAdaptados = data.map((articulo: any) => {
        // 🔹 Obtener la primera imagen de la lista separada por comas
        const imagenesArray = articulo.imagesUrl ? articulo.imagesUrl.split(",").map((url: string) => url.trim()) : [];
        const primeraImagen = imagenesArray.length > 0 ? imagenesArray[0] : null;

        return {
          id: articulo.id || articulo.linkId,
          titulo: articulo.title || "Sin título",
          descripcion: articulo.description || "Sin descripción",
          link: articulo.link || "#",
          imagen: primeraImagen, // Se asigna solo la primera imagen o `null` si no hay
        };
      });

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error('Error al obtener los enlaces pendientes:', error);
      setArticulos([]); // Si hay error, se limpia la lista
    } finally {
      setLoading(false);
    }
  };

  // ** Función para obtener enlaces por categoría **
  const fetchLinksByCategory = async (categoryId: string | null) => {
    if (categoryId === "none" || categoryId === null) {
      fetchPendingLinks();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/links/categories/${categoryId}/links`);
      const data = await response.json();
      console.log(`Enlaces de la categoría ${categoryId}:`, data);

      const articulosAdaptados = data.map((articulo: any) => {
        // 🔹 Obtener la primera imagen de la lista separada por comas
        const imagenesArray = articulo.imagesUrl ? articulo.imagesUrl.split(",").map((url: string) => url.trim()) : [];
        const primeraImagen = imagenesArray.length > 0 ? imagenesArray[0] : null;

        return {
          id: articulo.id || articulo.linkId,
          titulo: articulo.title || "Sin título",
          descripcion: articulo.description || "Sin descripción",
          link: articulo.link || "#",
          imagen: primeraImagen, // Se asigna solo la primera imagen o `null` si no hay
        };
      });

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error(`Error al obtener enlaces de la categoría ${categoryId}:`, error);
      setArticulos([]);
    }
  };

  // ** Cargar todos los enlaces pendientes por defecto al abrir la página **
  useEffect(() => {
    fetchPendingLinks();
  }, []);

  // ** Manejar cambio de categoría **
  const handleCategoryChange = (categoryId: string | null) => {
    fetchLinksByCategory(categoryId);
  };

  // ** Render de carga **
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

  return (
    <div>
      <EI_Filtro onChangeCategory={handleCategoryChange} defaultCategory="none" />
      <div
        style={{
          height: "435px",   // el alto máximo que desees
          overflowY: "auto",    // scroll en vertical
          overflowX: "hidden",  // si no quieres scroll horizontal
        }}
      >
        <ArticulosConFoto
          articulos={articulos}
          basePath="/gestion-contenido/enlaces-interes/por-revisar/articulo"
        />
      </div>
    </div>
  );
};

export default EI_Categorias;