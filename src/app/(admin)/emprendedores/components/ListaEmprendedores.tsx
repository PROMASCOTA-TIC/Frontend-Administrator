"use client";
import * as React from "react";
import axios from "axios";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Button, Typography, Box, IconButton, Dialog, DialogContent, DialogActions, DialogTitle } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarQuickFilter } from "@mui/x-data-grid";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { ProductosRegistrados } from "./ProductosRegistrados";
import { themePalette } from "@/config/theme.config";
import { esES } from "@mui/x-data-grid/locales";

interface RowData {
  id: string;
  nombrePropietario: string;
  email: string;
  telefono: string;
  nombreComercial: string;
  ruc: string;
  estado: string;
}

export const ListaEmprendedores = () => {
  const [rows, setRows] = React.useState<RowData[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [openProductos, setOpenProductos] = React.useState(false);
  const [selectedEntrepreneur, setSelectedEntrepreneur] = React.useState<RowData | null>(null);
  const [openDeactivateDialog, setOpenDeactivateDialog] = React.useState(false); // Estado del modal de desactivación

  // 🔹 Obtener los emprendedores aprobados del backend
  const fetchApprovedEntrepreneurs = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3001/api/users/entrepreneurs/state/APPROVED");
      const data = response.data;

      // 🔹 Formatear los datos para la tabla
      const formattedData = data.map((entrepreneur: any) => ({
        id: entrepreneur.idEntrepreneur,
        nombrePropietario: entrepreneur.name,
        email: entrepreneur.email,
        telefono: entrepreneur.numeroCelular,
        nombreComercial: entrepreneur.nombreEmprendimiento,
        ruc: entrepreneur.ruc,
        estado: entrepreneur.status,
      }));

      setRows(formattedData);
    } catch (error) {
      console.error("Error al obtener emprendedores aprobados:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Cargar los datos al montar el componente
  React.useEffect(() => {
    fetchApprovedEntrepreneurs();
  }, []);

  const handleOpenProductos = (row: RowData) => {
    setSelectedEntrepreneur(row);
    setOpenProductos(true);
  };

  const handleCloseProductos = () => {
    setOpenProductos(false);
    setSelectedEntrepreneur(null);
  };

  // 🔹 Abrir el modal de confirmación de desactivación
  const handleOpenDeactivateDialog = (row: RowData) => {
    setSelectedEntrepreneur(row);
    setOpenDeactivateDialog(true);
  };

  // 🔹 Cerrar el modal de confirmación de desactivación
  const handleCloseDeactivateDialog = () => {
    setOpenDeactivateDialog(false);
    setSelectedEntrepreneur(null);
  };

  // 🔹 Desactivar emprendedor
  const handleDeactivateEntrepreneur = async () => {
    if (!selectedEntrepreneur) return;

    try {
      console.log(`Desactivando emprendedor con ID: ${selectedEntrepreneur.id}`);

      await axios.patch(
        `http://localhost:3001/api/users/entrepreneurs/${selectedEntrepreneur.id}/status-and-commission`,
        { estado: "REJECTED" },
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Eliminar el emprendedor desactivado de la lista sin recargar la página
      setRows((prevRows) => prevRows.filter(row => row.id !== selectedEntrepreneur.id));

      console.log(`Emprendedor con ID ${selectedEntrepreneur.id} ha sido desactivado.`);
      handleCloseDeactivateDialog();
    } catch (error: any) {
      if (error.response) {
        console.error(`Error al desactivar emprendedor ${selectedEntrepreneur.id}:`, error.response.data);
      } else {
        console.error(`Error desconocido al desactivar emprendedor ${selectedEntrepreneur.id}:`, error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 0.5, minWidth: 40 },
    { field: "nombrePropietario", headerName: "Nombre", flex: 1, minWidth: 100 },
    { field: "email", headerName: "Email", flex: 1.5, minWidth: 100 },
    { field: "telefono", headerName: "Teléfono", flex: 1, minWidth: 100 },
    { field: "nombreComercial", headerName: "Nombre comercial", flex: 1.5, minWidth: 120 },
    { field: "ruc", headerName: "RUC", flex: 1, minWidth: 140 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.5,
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => {
        const isActive = params.value === "APPROVED";
        return (
          <Typography
            sx={{
              color: isActive ? "green" : "red",
              fontWeight: "bold",
              fontSize: "14px",
              padding: "5px 10px",
              borderRadius: "5px",
              display: "inline-block",
              textAlign: "center",
              width: "100%",
            }}
          >
            {isActive ? "Activo" : "Inactivo"}
          </Typography>
        );
      },
    },    
    {
      field: "desactivar",
      headerName: "Desactivar",
      flex: 0.5,
      minWidth: 88,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="medium" sx={{ color: "red" }} onClick={() => handleOpenDeactivateDialog(params.row)}>
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
        <IconButton size="medium" sx={{ color: themePalette.primary }} onClick={() => handleOpenProductos(params.row)}>
          <VisibilityIcon />
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
        <Typography sx={{ marginBottom: "20px", textAlign: "center", color: themePalette.primary, fontSize: "36px", fontWeight: "bold" }}>
          Lista de Emprendedores Aprobados
        </Typography>

        <Box sx={{ height: 400, width: "100%", marginTop: "30px" }}>
          <DataGrid
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            rows={rows}
            columns={columns}
            loading={loading}
             initialState={{
                          pagination: {
                            paginationModel: { pageSize: 10 },
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

        <Dialog open={openDeactivateDialog} onClose={handleCloseDeactivateDialog}>
          <DialogTitle sx={{ display: "flex", justifyContent: "center", color: themePalette.primary, fontWeight: "bold" }}>Confirmar Desactivación</DialogTitle>
          <DialogContent>¿Estás seguro de que deseas desactivar este emprendedor?</DialogContent>
          <DialogActions sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Button onClick={handleCloseDeactivateDialog}
            sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}
            >Cancelar</Button>
            <Button onClick={handleDeactivateEntrepreneur} sx={{color:themePalette.cwhite, background:themePalette.primary, textTransform:"none"}}>Aceptar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
