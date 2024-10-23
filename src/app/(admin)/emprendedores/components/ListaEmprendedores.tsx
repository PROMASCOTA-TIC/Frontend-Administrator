"use client";
import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import { useForm, Controller } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Button, Typography, Box, Grid2, IconButton, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { ProductosRegistrados } from './ProductosRegistrados'; // Importa el componente
import { themePalette } from "@/config/theme.config";
import { esES } from '@mui/x-data-grid/locales';

interface DateFormValues {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface RowData {
  id: number;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  ruc: string;
  estado: string;
}

const rows: RowData[] = [
  {
    id: 1,
    nombrePropietario: "Juan Pérez",
    email: "juan@example.com",
    telefono: "0991234567",
    nombreComercial: "Comercial JP",
    ruc: "1712345678001",
    estado: "Activo",
  },
  // Agrega más emprendedores según sea necesario
];

export const ListaEmprendedores = () => {
  const { handleSubmit: handleDateSubmit, control: controlDate, watch: watchDate, formState: { errors: dateErrors } } = useForm<DateFormValues>({
    defaultValues: {
      startDate: null,
      endDate: null,
    },
  });

  const [openProductos, setOpenProductos] = React.useState(false); // Estado para el modal
  const [selectedEntrepreneur, setSelectedEntrepreneur] = React.useState<RowData | null>(null); // Estado para el emprendedor seleccionado

  const startDate = watchDate("startDate");

  const onDateSubmit = (data: DateFormValues) => {
    console.log("Filtrado por fechas:", data);
  };

  const handleOpenProductos = (row: RowData) => {
    setSelectedEntrepreneur(row); // Guarda el emprendedor seleccionado
    setOpenProductos(true); // Abre el modal
  };

  const handleCloseProductos = () => {
    setOpenProductos(false); // Cierra el modal
    setSelectedEntrepreneur(null); // Resetea el emprendedor seleccionado
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 40 },
    { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 100 },
    { field: "telefono", headerName: "Teléfono", flex: 1, minWidth: 100 },
    { field: "nombreComercial", headerName: "Nombre comercial", flex: 1.5, minWidth: 120 },
    { field: "ruc", headerName: "RUC", flex: 1, minWidth: 140 },
    { field: "estado", headerName: "Estado", flex: 0.5, minWidth: 80 },
    {
      field: "activar",
      headerName: "Activar",
      flex: 0.5, minWidth: 80,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "green" }}>
          <CheckIcon />
        </IconButton>
      ),
    },
    {
      field: "desactivar",
      headerName: "Desactivar",
      flex: 0.5, minWidth: 88,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }}>
          <CloseIcon />
        </IconButton>
      ),
    },
    {
      field: "productos",
      headerName: "Productos",
      flex: 0.5,
      minWidth: 88,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton
          size="medium"
          sx={{ color: "blue" }}
          onClick={() => handleOpenProductos(params.row)} // Abre el modal al hacer clic
        >
          <VisibilityIcon sx={{color:themePalette.primary}}/>
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", flexDirection: "column", padding: "0 20px", width: "100%" }}>
        <Typography 
        sx={{ marginBottom: "20px", textAlign: "center",
        color:themePalette.primary, fontSize: "36px", fontWeight: "bold"
       }}>
          Lista de Emprendedores
        </Typography>

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

        {/* Modal para mostrar productos */}
        <Dialog open={openProductos} onClose={handleCloseProductos} maxWidth="xl" fullWidth>
  <DialogTitle
    sx={{
      marginBottom: "20px",
      textAlign: "center",
      color: themePalette.primary,
      fontSize: "36px",
      fontWeight: "bold",
      position: "relative",
    }}
  >
    Productos Registrados - {selectedEntrepreneur?.nombreComercial}
    {/* Botón para cerrar */}
    <IconButton
      aria-label="close"
      onClick={handleCloseProductos}
      sx={{
        position: "absolute",
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  <DialogContent>
    <ProductosRegistrados />
   
  </DialogContent>
</Dialog>      
      </Box>
    </LocalizationProvider>
  );
};
