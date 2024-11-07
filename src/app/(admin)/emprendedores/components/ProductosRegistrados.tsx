"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Button, Typography, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import {  GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { themePalette } from "@/config/theme.config";
import { esES } from '@mui/x-data-grid/locales';

interface NameFormValues {
  productName: string;
}

interface ProductData {
  id: number;
  nombreProducto: string;
  categoria: string;
  subcategoria: string;
  precio: number;
  cantidad: number;
  imagen: string;
  estado: string;
}

const rows: ProductData[] = [
  {
    id: 1,
    nombreProducto: "Cama para Perros",
    categoria: "Accesorios",
    subcategoria: "Camas",
    precio: 50,
    cantidad: 10,
    imagen: "imagen1.jpg",
    estado: "Activo",
  },
  // Puedes agregar más productos aquí...
];

export const ProductosRegistrados = () => {
  const {
    handleSubmit: handleNameSubmit,
    control: controlName,
    formState: { errors: nameErrors },
  } = useForm<NameFormValues>({
    defaultValues: {
      productName: "",
    },
  });

  const onNameSubmit = (data: NameFormValues) => {
    console.log("Filtrado por nombre de producto:", data);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 50 },
    { field: "nombreProducto", headerName: "Nombre", flex: 1, minWidth: 150 },
    { field: "categoria", headerName: "Categoría", flex: 1, minWidth: 100 },
    { field: "subcategoria", headerName: "Subcategoría", flex: 1, minWidth: 100 },
    { field: "precio", headerName: "Precio", flex: 0.5, minWidth: 100 },
    { field: "cantidad", headerName: "Cantidad", flex: 0.5, minWidth: 100 },
    {
      field: "imagen",
      headerName: "Imagen",
      flex: 0.5,
      minWidth: 150,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.imagen}
          alt="Producto"
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    { field: "estado", headerName: "Estado", flex: 0.5, minWidth: 100 },
    {
      field: "activar",
      headerName: "Activar",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "desactivar",
      headerName: "Desactivar",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }}>
          <CloseIcon />
        </IconButton>
      ),
    },
  ];
  const CustomToolbar = () => {
    return (
        <GridToolbarContainer sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </div>
            <GridToolbarQuickFilter 
                debounceMs={500}
                sx={{ marginLeft: 'auto' }}
            />
        </GridToolbarContainer>
    );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "0 20px", width: "100%" }}>

      {/* Tabla con DataGrid */}
      <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
         <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 25]}
            slots={{
              toolbar: CustomToolbar,
            }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            sx={{
              '& .MuiDataGrid-toolbarContainer': {
                backgroundColor: themePalette.cwhite,
                padding: '0.5rem',
                border: '0px solid',
              },
              '& .MuiDataGrid-columnHeader': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: themePalette.black10,
                fontWeight: 'bold',
              },
            }}
          />
      </Box>
    </Box>
  );
};
