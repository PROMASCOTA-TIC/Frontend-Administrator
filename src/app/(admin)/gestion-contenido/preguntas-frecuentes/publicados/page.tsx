"use client";

import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import PR_Filtro from '@/components/gestionContenido/filtros/PR_Filtro';
import ArticulosSinFoto from '@/components/gestionContenido/ArticulosSinFoto';
import PF_Filtro from '@/components/gestionContenido/filtros/PF_Filtro';

const PF_Categorias = () => {
  const [articulos, setArticulos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ** Función para obtener todos los publireportajes **
  const fetchApprovedFaqs = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/faqs/all');
      const data = await response.json();
      console.log('Datos recibidos:', data); // Log para ver los datos de la API

      // Adaptar los datos para el componente
      const articulosAdaptados = data.map((articulo: any) => ({
        id: articulo.id || articulo.faqId,
        titulo: articulo.title || "Sin título",
        descripcion: articulo.description || "Sin descripción",
      }));

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error('Error al obtener los publireportajes:', error);
      setArticulos([]); // Si hay error, se limpia la lista
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener publireportajes por categoría
  const fetchFaqsByCategory = async (categoryId: string | null) => {
    if (categoryId === "none" || categoryId === null) {
      fetchApprovedFaqs();
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/faqs/categories/${categoryId}/faqs`);
      const data = await response.json();
      console.log(`Publireportajes de la categoría ${categoryId}:`, data);

      const articulosAdaptados = data.map((articulo: any) => ({
        id: articulo.id || articulo.faqId,
        titulo: articulo.title || "Sin título",
        descripcion: articulo.description || "Sin descripción",
      }));

      setArticulos(articulosAdaptados);
    } catch (error) {
      console.error(`Error al obtener preguntas de la categoría ${categoryId}:`, error);
      setArticulos([]);
    }
  };

  // Cargar todos los publireportajes por defecto al abrir la página
  useEffect(() => {
    fetchApprovedFaqs();
  }, []);

  const handleCategoryChange = (categoryId: string | null) => {
    fetchFaqsByCategory(categoryId);
  };

  // Render de carga o error
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
      <PF_Filtro onChangeCategory={handleCategoryChange} defaultCategory="none" />
      <div
        style={{
          height: "435px",   // el alto máximo que desees
          overflowY: "auto",    // scroll en vertical
          overflowX: "hidden",  // si no quieres scroll horizontal
        }}
      >
        <ArticulosSinFoto
          articulos={articulos}
          basePath="/gestion-contenido/preguntas-frecuentes/publicados/articulo"
        />
      </div>
    </div>
  );
};

export default PF_Categorias;