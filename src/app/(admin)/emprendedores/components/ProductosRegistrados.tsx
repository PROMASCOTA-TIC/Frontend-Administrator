"use client";
import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Typography, Box, TextField, Grid2, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import "/src/assets/styles/emprendedores/general.css";
import { themePalette } from "@/config/theme.config";

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
  // Hook form para la búsqueda por nombre
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
    { field: "id", headerName: "ID", width: 50 },
    { field: "nombreProducto", headerName: "Nombre", width: 150 },
    { field: "categoria", headerName: "Categoría", width: 100 },
    { field: "subcategoria", headerName: "Subcategoría", width: 100 },
    { field: "precio", headerName: "Precio", width: 100 },
    { field: "cantidad", headerName: "Cantidad", width: 100 },
    {
      field: "imagen",
      headerName: "Imagen",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <img
          src={params.row.imagen}
          alt="Producto"
          style={{ width: "100%", height: "auto" }}
        />
      ),
    },
    { field: "estado", headerName: "Estado", width: 100 },
    {
      field: "activar",
      headerName: "Activar",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "desactivar",
      headerName: "Desactivar",
      width: 100,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }}>
          <CloseIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
        maxWidth: "100%",
        boxSizing: "border-box",
        minWidth: "300px",
      }}
    >
      {/* Título centrado */}
      <Typography  sx={{ marginBottom: "20px", textAlign: "center",
        color:themePalette.primary, fontSize: "36px", fontWeight: "bold"
       }}>
        Productos registrados
      </Typography>

      {/* Formulario de búsqueda por nombre en el centro */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginBottom: "20px",
          alignItems: "center", // Alinea verticalmente el texto y el botón
        }}
      >
        <Grid2 container justifyContent="center" alignItems="center">
          <Grid2
            size={{ xs: 12, sm: 9, }}
            sx={{ marginRight: "13px",
                width: "100%",
             }} // Añade espacio de 13px entre el input y el botón
          >
            <Controller
              name="productName"
              control={controlName}
              rules={{
                required: "El nombre del producto es obligatorio",
                pattern: {
                  value: /^[A-Za-z\s]+$/, // Solo acepta letras y espacios
                  message: "El nombre solo debe contener letras",
                },
              }}
              render={({ field }) => (
                <>
                  <TextField
                    {...field}
                    label="Nombre del producto"
                    variant="outlined"
                    sx={{ width: "100%",
                        borderRadius: "15px",
                     }}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  {nameErrors.productName && (
                    <Typography color="error" variant="body2">
                      {nameErrors.productName.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </Grid2>

          <Grid2 size={{ xs: 12, sm: 4, md: 2 }}>
            <Button
              type="submit"
              className="buttonFiltrarBuscar"
              sx={{ width: "100%", marginTop: { xs: 2, sm: 0 } }}
              onClick={handleNameSubmit(onNameSubmit)}
            >
              Buscar
            </Button>
          </Grid2>
        </Grid2>
      </Box>

      {/* Tabla con los productos registrados */}
      <Box sx={{ height: 400, width: "82%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 25]}
        />
      </Box>
    </Box>
  );
};
